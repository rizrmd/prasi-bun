import { compress, decompress } from "wasm-gzip";
import { apiProxy } from "../../../base/load/api/api-proxy";
import { loadApiProxyDef } from "../../../base/load/api/api-proxy-def";
import { dbProxy } from "../../../base/load/db/db-proxy";
import { w } from "../../../utils/types/general";
import { PG } from "../../ed/logic/ed-global";
import { treeRebuild } from "../../ed/logic/tree/build";
import { simpleHash } from "../utils/simple-hash";

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

        const hash = simpleHash(zip);
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

      if (!p.script.db) p.script.db = dbProxy(api_url);
      if (!p.script.api) p.script.api = apiProxy(api_url);
    }
  } catch (e: any) {
    if (e && !e.message.toLowerCase().includes("invalid url")) {
      console.warn("Failed to load API [Snapshot]:", api_url);
    } else {
      // console.error(e);
    }
  }

  await applyEnv(p);
};

export const applyEnv = async (p: PG) => {
  const w = window as any;

  if (p.site.config.api_url) {
    w.db = dbProxy(p.site.config.api_url);
    w.api = apiProxy(p.site.config.api_url);
  }

  const url = `/prod/${p.site.id}/_prasi/code/index.js?ts=${p.site.code_ts}`;
  const fn = new Function("callback", `import("${url}").then(callback)`);
 
  try {
    await new Promise<void>((resolve) => {
      fn((exports: any) => {
        p.site_exports = {};
        for (const [k, v] of Object.entries(exports)) {
          p.site_exports[k] = v;
          w[k] = v;
        }
        resolve();
      });
    });
  } catch (e) {
    console.log("Failed to load site code", e);
  }
};
