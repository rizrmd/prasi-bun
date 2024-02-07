import { compress, decompress } from "wasm-gzip";
import { loadApiProxyDef } from "../../../base/load/api/api-proxy-def";
import { PG } from "../../ed/logic/ed-global";
import { evalCJS } from "../../ed/logic/ed-sync";
import { treeRebuild } from "../../ed/logic/tree/build";
import { w } from "../../../utils/types/general";
import { dbProxy } from "../../../base/load/db/db-proxy";
import { apiProxy } from "../../../base/load/api/api-proxy";

const encoder = new TextEncoder();
export const viLoadSnapshot = async (p: PG) => {
  let api_url = p.site.config.api_url;

  try {
    const apiURL = new URL(api_url);
    if (api_url && apiURL.hostname) {
      await loadApiProxyDef(api_url, true);

      const api = w.prasiApi[api_url];
      if (api && api.apiTypes && api.prismaTypes) {
        const zip = JSON.stringify({
          api: api.apiTypes,
          prisma: api.prismaTypes,
        });
        const hash = hashCode(zip);
        const res = await p.sync?.code.action({
          type: "check-typings",
          site_id: p.site.id,
          hash,
        });
        if (res?.type === "check-typings" && !res.hash) {
          const body = Buffer.from(compress(encoder.encode(zip)));
          p.sync?.code.action({
            type: "push-typings",
            site_id: p.site.id,
            body,
            hash,
          });
        }
      }
    }
  } catch (e) {
    console.warn("Failed to load API:", api_url);
  }

  if (p.site.code.snapshot) {
    for (const [name, build] of Object.entries(p.site.code.snapshot)) {
      const doc = new Y.Doc();
      Y.applyUpdate(doc, decompress(build.bin));

      p.code[name] = { doc: doc as any };
      const code = p.code[name].doc;
      if (code) {
        const src = code.getMap("map").get("files")?.get("index.js");
        console.log(src);
        applyEnv(p, src);
        treeRebuild(p);
        p.render();
        code.on("update", (e, origin) => {
          const src = code.getMap("map").get("files")?.get("index.js");
          applyEnv(p, src);
          treeRebuild(p);
          p.render();
        });
      }
    }
  }
};

export const applyEnv = (p: PG, src?: string) => {
  if (src) {
    const w = window as any;

    if (p.site.config.api_url) {
      w.db = dbProxy(p.site.config.api_url);
      w.api = apiProxy(p.site.config.api_url);
    }

    const module = evalCJS(src);
    p.global_prop = Object.keys(module);
    if (typeof module === "object") {
      for (const [k, v] of Object.entries(module)) {
        w[k] = v;
      }
    }
  }
};

const hashCode = function (s: string) {
  var h = 0,
    l = s.length,
    i = 0;
  if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
  return h;
};
