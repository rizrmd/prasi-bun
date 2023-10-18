import { createRouter } from "radix3";
import { validate } from "uuid";
import { type apiClient } from "web-utils";
import {
  createAPI,
  createDB,
  initApi,
  reloadDBAPI,
} from "../../../utils/script/init-api";
import importModule from "../../editor/tools/dynamic-import";
import { LSite, PG } from "./global";
import { validateLayout } from "./layout";

export const w = window as unknown as {
  basepath: string;
  navigateOverride: (s: string) => string;
  isEditor: boolean;
  isMobile: boolean;
  isLayout: boolean;
  apiHeaders: any;
  isDesktop: boolean;
  exports: any;
  params: any;
  apiClient: typeof apiClient;
  apiurl: string;
  preload: (path: string) => void;

  externalAPI: {
    mode: "dev" | "prod";
    devUrl: string;
    prodUrl: string;
  };
};

export const initLive = async (p: PG, domain_or_siteid: string) => {
  if (p.status === "init") {
    p.status = "loading";

    w.isEditor = false;
    w.isLayout = true;
    w.isMobile = p.mode === "mobile";
    w.isDesktop = p.mode === "desktop";
    w.apiHeaders = {};

    w.navigateOverride = (_href) => {
      if (_href && _href.startsWith("/")) {
        if (w.basepath.length > 1) {
          _href = `${w.basepath}${_href}`;
        }
        if (
          location.hostname === "prasi.app" ||
          location.hostname === "prasi.web.andromedia.co.id" ||
          location.hostname === "localhost" ||
          location.hostname === "127.0.0.1" ||
          location.hostname === "10.0.2.2" // android localhost
        ) {
          if (
            location.pathname.startsWith("/live") &&
            !_href.startsWith("/live")
          ) {
            const patharr = location.pathname.split("/");
            _href = `/live/${patharr[2]}${_href}`;
          }
        }
      }
      return _href;
    };

    /** load site */
    let site = null as null | LSite;
    site = await p.loader.site(
      p,
      validate(domain_or_siteid)
        ? { type: "siteid", id: domain_or_siteid }
        : { type: "domain", domain: domain_or_siteid }
    );

    if (site) {
      /** import site module */
      w.exports = {};

      if (site.cgroup_ids) {
        for (const id of site.cgroup_ids) {
          await importModule(p.loader.npm(p, "site", id));
        }
      }

      await importModule(p.loader.npm(p, "site", site.id));

      p.site.id = site.id;
      p.site.layout = site.layout;
      p.site.js = site.js_compiled || "";
      p.site.responsive = site.responsive as any;

      await validateLayout(p);

      p.site.api_url = await initApi(site.config, "prod");

      w.apiurl = p.site.api_url;

      let pages = await p.loader.pages(p, site.id);

      /** execute site module */
      const exec = (fn: string, scopes: any) => {
        if (p) {
          if (p.site.api_url) {
            scopes["api"] = createAPI(p.site.api_url);
            scopes["db"] = createDB(p.site.api_url);
          }
          scopes.params = w.params;
          scopes.module = {};
          const f = new Function(...Object.keys(scopes), fn);
          const res = f(...Object.values(scopes));
          return res;
        }
        return null;
      };
      const scope = {
        types: {},
        exports: w.exports,
        load: importModule,
        render: p.render,
        module: {
          exports: {} as any,
        },
      };
      exec(p.site.js, scope);
      if (scope.module.exports) {
        for (const [k, v] of Object.entries(scope.module.exports)) {
          w.exports[k] = v;
        }
      }

      /** create router */
      p.pages = {};
      p.route = createRouter({ strictTrailingSlash: false });
      if (pages && pages.length > 0) {
        for (const page of pages) {
          p.pages[page.id] = page;
          p.route.insert(page.url, page);
        }
      }

      p.status = "ready";
      p.render();
    } else {
      p.status = "not-found";
      p.render();
    }
  }
};
