import { get, set } from "idb-keyval";
import { createRouter } from "radix3";
import { apiProxy } from "../../../base/load/api/api-proxy";
import { dbProxy } from "../../../base/load/db/db-proxy";
import { IRoot } from "../../../utils/types/root";
import { genMeta } from "../../vi/meta/meta";
import { IMeta } from "../../vi/utils/types";
import { base } from "./base";
import { prodCache } from "./cache";

const getRoute = () => {
  return new Promise<{
    site: any;
    urls: {
      id: string;
      url: string;
    }[];
    layout: any;
  }>(async (done) => {
    let is_done = false;
    const route_cache = await get("route", prodCache);
    if (route_cache) {
      done(route_cache);
      is_done = true;
    }

    let res = await (await fetch(base.url`_prasi/route`)).json();
    await set("route", res, prodCache);
    if (!is_done) {
      done(res);
    }
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
          rebuildMeta(base.layout.meta, base.layout.root);
        }
      }

      base.site = res.site;
      base.site.code = { mode: "new" };
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
    try {
      new URL(base_url);
    } catch (e) {
      if (location.hostname === "localhost") {
        base_url = `http://localhost:4550`;
      } else {
        base_url = `https://prasi.avolut.com`;
      }
    }

    if (!localStorage.getItem("api-ts-" + base_url)) {
      localStorage.setItem("api-ts-" + base_url, Date.now().toString());
    }

    const ts = localStorage.getItem("api-ts-" + base_url);

    script.src = `${base_url}/_prasi/load.js?url=${base_url}&v3&ts=${ts}`;

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
        comps: base.comp.list,
        meta,
        mode: "page",
      },
      { item }
    );
  }
};
