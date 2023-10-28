import { createAPI, initApi } from "../../../../../utils/script/init-api";
import { PG } from "../../../logic/ed-global";

export const dev = JSON.parse(localStorage.getItem("prasi-dev") || "{}") as {
  enabled: boolean;
  url: string;
  lastURL: { valid: boolean; url: string };
};

export const server = {
  status: "ready" as
    | "ready"
    | "deploying"
    | "saving"
    | "pulling"
    | "restarting",
};

export const apiRef = {} as any;

export const apiUrl = function (p: PG): string {
  if (dev.enabled) {
    return dev.url;
  }

  if (!dev.lastURL) {
    dev.lastURL = { valid: false, url: "" };
  }

  if (!dev.lastURL.valid || dev.lastURL.url !== p.site.config.api_url) {
    try {
      const url = new URL(p.site.config.api_url);
      if (url && url.hostname && url.protocol.startsWith("http")) {
        dev.lastURL.valid = true;
        return p.site.config.api_url;
      }
      dev.lastURL.valid = false;
    } catch (e) {
      dev.lastURL.valid = false;
    }
  }

  if (dev.lastURL.valid) return p.site.config.api_url;

  return "";
};

export const checkAPI = async (p: PG) => {
  const url = apiUrl(p);
  if (!url) return "offline";

  try {
    if (!apiRef[url]) {
      await initApi({ api_url: url }, "dev");
      apiRef[url] = createAPI(url);
    }
    const capi = apiRef[url];
    let res = await capi._deploy({
      type: "check",
      id_site: p.site.id,
    });
    if (!res) {
      return { deployable: false, db: "", hasDB: false, domains: [] };
    } else {
      if (res.db && res.now) {
        return {
          deployable: true,
          db: res.db,
          hasDB: true,
          domains: res.domains as string[],
        };
      }
    }
  } catch (e) {
    console.error(e);
    return "error";
  }

  return { deployable: false, db: "", hasDB: false, domains: [] };
};
