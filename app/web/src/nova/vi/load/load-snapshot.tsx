import { decompress } from "wasm-gzip";
import { loadApiProxyDef } from "../../../base/load/api/api-proxy-def";
import { PG } from "../../ed/logic/ed-global";
import { evalCJS } from "../../ed/logic/ed-sync";
import { treeRebuild } from "../../ed/logic/tree/build";

const decoder = new TextDecoder();

export const viLoadSnapshot = async (p: PG) => {
  let api_url = p.site.config.api_url;

  try {
    const apiURL = new URL(api_url);
    if (api_url && apiURL.hostname) {
      try {
        await loadApiProxyDef(api_url, true);
      } catch (e) {
        console.warn("Failed to load API:", api_url);
      }
    }
  } catch (e) {}

  if (p.site.code.snapshot) {
    for (const [name, build] of Object.entries(p.site.code.snapshot)) {
      const doc = new Y.Doc();
      Y.applyUpdate(doc, decompress(build.bin));

      p.code[name] = { doc: doc as any };
      const code = p.code[name].doc;
      if (code) {
        const src = code.getMap("map").get("files")?.get("index.js");
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
    const module = evalCJS(src);
    p.global_prop = Object.keys(module);
    if (typeof module === "object") {
      for (const [k, v] of Object.entries(module)) {
        w[k] = v;
      }
    }
  }
};
