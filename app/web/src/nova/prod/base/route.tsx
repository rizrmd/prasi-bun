import trim from "lodash.trim";
import { createRouter } from "radix3";
import { apiProxy } from "../../../base/load/api/api-proxy";
import { dbProxy } from "../../../base/load/db/db-proxy";
import { IRoot } from "../../../utils/types/root";
import { genMeta } from "../../vi/meta/meta";
import { IMeta } from "../../vi/utils/types";
import { base } from "./base";
import { scanComponent } from "./component";

const cached = { route: null as any, promise: null as any };

const getRoute = () => {
  if (cached.promise) return cached.promise;
  cached.promise = new Promise<{
    site: any;
    urls: {
      id: string;
      url: string;
    }[];
    layout: any;
  }>(async (done) => {
    if (cached.route) done(cached.route);

    const res = await fetch(base.url`_prasi/route`);
    if (!res.headers.get("content-encoding")) {
      fetch(base.url`_prasi/compress/only-gz`);
    }
    cached.route = await res.json();

    done(cached.route);
  });
};

export const initBaseRoute = async () => {
  const router = createRouter<{ id: string; url: string }>();
  const pages = [] as { id: string; url: string }[];
  try {
    const res = await getRoute();

    if (res && res.site && res.urls) {
      if (res.layout) {
        base.layout.id = res.layout.id;
        base.layout.root = res.layout.root;
        base.layout.meta = {};
        if (base.layout.root) {
          await scanComponent(base.layout.root.childs);
          rebuildMeta(base.layout.meta, base.layout.root);
        }
      }

      base.site = res.site;

      base.site.code = { mode: "vsc" };
      await injectSiteScript();

      base.site.api = apiProxy(base.site.api_url);
      base.site.db = dbProxy(base.site.api_url);

      const w = window as any;
      w.serverurl = base.site.api_url;
      w.db = base.site.db;
      w.api = base.site.api;

      for (const item of res.urls) {
        router.insert(item.url, item);
        pages.push(item);
      }
    }
  } catch (e) {}

  return { router, pages };
};

const injectSiteScript = () => {
  return new Promise<void>((done) => {
    const d = document;
    const script = d.createElement("script");
    script.onload = async () => {
      done();
    };
    let base_url = base.site.api_url;

    if (base_url === "*") {
      base_url = `${location.protocol}//${location.host}`;
      base.site.api_url = base_url;
    }
    base_url = trim(base_url, "/");

    if (!localStorage.getItem("api-ts-" + base_url)) {
      localStorage.setItem("api-ts-" + base_url, Date.now().toString());
    }

    const cur = new URL(location.href);
    cur.pathname = "";
    if (
      !base_url ||
      (!["prasi.avolut.com"].includes(cur.hostname) && cur.port !== "4550")
    ) {
      cur.hash = "";
      let cur_url = trim(cur.toString(), "/");
      script.src = `${cur_url}/_prasi/load.js?url=${cur_url}&v3`;

      base.site.api_url = `${cur.protocol}//${cur.host}`;
    } else {
      script.src = `${base_url}/_prasi/load.js?url=${base_url}&v3`;
    }

    script.onerror = () => {
      done();
    };

    if (!document.querySelector(`script[src="${script.src}"]`)) {
      d.body.appendChild(script);
    } else {
      done();
    }
  });
};

export const rebuildMeta = (meta: Record<string, IMeta>, root: IRoot) => {
  for (const item of root.childs) {
    genMeta(
      {
        set_meta: true,
        comps: base.comp.list,
        meta,
        mode: "page",
      },
      { item }
    );
  }
};
