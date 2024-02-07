import { createRouter } from "radix3";
import { apiProxy } from "../../../base/load/api/api-proxy";
import { dbProxy } from "../../../base/load/db/db-proxy";
import { IRoot } from "../../../utils/types/root";
import { genMeta } from "../../vi/meta/meta";
import { IMeta } from "../../vi/utils/types";
import { base } from "./base";
import { decompressBlob } from "./util";

export const initBaseRoute = async () => {
  const raw = await (await fetch(base.url`_prasi/route`)).blob();
  const router = createRouter<{ id: string; url: string }>();
  try {
    const res = JSON.parse(await (await decompressBlob(raw)).text()) as {
      site: any;
      urls: {
        id: string;
        url: string;
      }[];
      layout: any;
    };

    if (res && res.site && res.urls) {
      if (res.layout) {
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
      }
    }
  } catch (e) {}

  return router;
};

const injectSiteScript = () => {
  return new Promise<void>((done) => {
    const d = document;
    const script = d.createElement("script");
    script.onload = async () => {
      done();
    };
    const url = base.site.api_url;

    if (!localStorage.getItem("api-ts-" + url)) {
      localStorage.setItem("api-ts-" + url, Date.now().toString());
    }

    const ts = localStorage.getItem("api-ts-" + url);

    script.src = `${url}/_prasi/load.js?url=${url}&v3&ts=${ts}`;

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
