import get from "lodash.get";
import { apiProxy } from "../../../base/load/api/api-proxy";
import { dbProxy } from "../../../base/load/db/db-proxy";
import { jscript } from "../../../utils/script/jscript";
import { devLoader } from "../../live/dev-loader";
import { LSite } from "../../live/logic/global";
import { validateLayout } from "../../live/logic/layout";
import importModule from "../tools/dynamic-import";
import { EditorGlobal, PG } from "./global";

export const w = window as unknown as {
  basepath: string;
  navigateOverride: (s: string) => string;
  isEditor: boolean;
  isMobile: boolean;
  isLayout: boolean;
  isDesktop: boolean;
  apiHeaders: any;
  exports: any;
  apiurl: string;
  preload: (path: string) => void;

  externalAPI: {
    mode: "dev" | "prod";
    devUrl: string;
    prodUrl: string;
  };
  blankGlobal: typeof EditorGlobal;
};

export const initEditor = async (p: PG, site_id: string) => {
  w.isEditor = true;
  if (typeof w.isLayout === "undefined") {
    w.isLayout = false;
  }
  w.isMobile = p.mode === "mobile";
  w.isDesktop = p.mode === "desktop";
  w.apiHeaders = {};
  w.preload = () => {};

  w.navigateOverride = (_href) => {
    if (_href.startsWith("/ed")) return _href;
    return "";
  };

  if (!jscript.pending) {
    jscript.init(p.render);
  }

  if (!p.item) {
    location.reload();
    return;
  }

  p.item.active = localStorage.getItem("prasi-item-active-id") || "";
  p.item.activeOriginalId = localStorage.getItem("prasi-item-active-oid") || "";
  const comp: any = {
    id: localStorage.getItem("prasi-comp-active-id"),
    instance_id: localStorage.getItem("prasi-comp-instance-id"),
    last: localStorage.getItem("prasi-comp-active-last"),
    props: localStorage.getItem("prasi-comp-active-props"),
  };
  if (comp.last) {
    comp.last = JSON.parse(comp.last);
  }
  if (comp.props) {
    comp.props = JSON.parse(comp.props);
  }
  if (comp.id) {
    p.comp = comp;
  }

  let site = null as any;
  try {
    site = JSON.parse(localStorage.getItem(`prasi-site-${site_id}`) || "");
  } catch (e) {}

  const querySite = async () => {
    const site = await devLoader.site(p as any, {
      type: "siteid",
      id: site_id,
    });

    localStorage.setItem(`prasi-site-${site_id}`, JSON.stringify(site));
    return site;
  };

  const processSite = async (site: LSite) => {
    if (!site || (site && !site.id)) return;
    if (!w.exports) {
      w.exports = {};
    }
    if (site.cgroup_ids) {
      for (const id of site.cgroup_ids) {
        await importModule(`${serverurl}/npm/site/${id}/site.js`);
      }
    }

    await importModule(`${serverurl}/npm/site/${site.id}/site.js`);
    p.lsite = site;
    p.site.id = site.id;
    p.site.js = site.js || "";
    p.site.js_compiled = site.js_compiled || "";
    p.site.name = site.name;
    p.site.domain = site.domain;
    p.site.responsive = site.responsive as any;
    p.site.layout = site.layout;
    p.site.layout_id = site.layout_id;

    await validateLayout(p);

    w.externalAPI = {
      mode: (localStorage.getItem(`prasi-ext-api-mode-${p.site.id}`) ||
        "prod") as any,
      devUrl: localStorage.getItem(`prasi-ext-dev-url-${p.site.id}`) || "",
      prodUrl: localStorage.getItem(`prasi-ext-prod-url-${p.site.id}`) || "",
    };

    p.site.api_url = site.config.api_url;

    if (w.externalAPI.prodUrl !== p.site.api_url) {
      w.externalAPI.prodUrl = p.site.api_url;
      localStorage.setItem(`prasi-ext-prod-url-${p.site.id}`, p.site.api_url);
    }
    if (w.externalAPI.mode === "dev" && w.externalAPI.devUrl) {
      p.site.api_url = w.externalAPI.devUrl;
    }

    w.apiurl = p.site.api_url;
    _api.site_dts(p.site.id).then((e: any) => {
      p.site_dts = e || "";
      p.render();
    });
    const configLocal: any = get(site, "config.prasi");
    if (configLocal) {
      p.site.api_prasi.db = configLocal.dburl ? configLocal.dburl : "";
      p.site.api_prasi.port = configLocal.port ? configLocal.port : "";
    }
    execSiteJS(p);
  };

  if (!site || (site && !site.id)) {
    const site = await querySite();
    if (site) {
      await processSite(site);
    }
  } else {
    await processSite(site);
    querySite();
  }

  p.status = "ready";
  p.render();
};

export const execSiteJS = (p: PG) => {
  if (p && p.site.api_url) {
    p.script.siteTypes = {};
    const scope: any = {
      types: p.script.siteTypes,
      exports: window.exports,
      load: importModule,
      render: p.render,
      module: {
        exports: {} as any,
      },
    };

    const fn = p.site.js_compiled;
    scope["api"] = apiProxy(p.site.api_url);
    scope["db"] = dbProxy(p.site.api_url);
    const f = new Function(...Object.keys(scope), fn);
    try {
      const res = f(...Object.values(scope));

      for (const [k, v] of Object.entries(scope.module.exports)) {
        w.exports[k] = v;
      }

      return res;
    } catch (e) {
      console.warn(e);
    }
  }
  return null;
};
