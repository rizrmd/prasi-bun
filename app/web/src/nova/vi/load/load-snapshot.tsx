import { compress, decompress } from "wasm-gzip";
import { apiProxy } from "../../../base/load/api/api-proxy";
import { loadApiProxyDef } from "../../../base/load/api/api-proxy-def";
import { dbProxy } from "../../../base/load/db/db-proxy";
import { w } from "../../../utils/types/general";
import { PG } from "../../ed/logic/ed-global";
import { treeRebuild } from "../../ed/logic/tree/build";
import { simpleHash } from "../utils/simple-hash";
import { loadCode } from "../../ed/logic/code-loader";

const encoder = new TextEncoder();
export const viLoadSnapshot = async (p: PG) => {
  let api_url = p.site.config.api_url;

  try {
    const apiURL = new URL(api_url);
    if (api_url && apiURL.hostname) {
      await loadApiProxyDef(api_url, true);

      if (!p.script.db) p.script.db = dbProxy(api_url);
      if (!p.script.api) p.script.api = apiProxy(api_url);
    }
  } catch (e: any) {
    if (e && !e.message.toLowerCase().includes("invalid url")) {
      console.error("Failed to load API [Snapshot]:", api_url);
    } else {
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

  await loadCode(p, p.site_tstamp);
};
