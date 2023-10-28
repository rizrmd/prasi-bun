import { createAPI, initApi } from "../../../../../utils/script/init-api";
import { PG } from "../../../logic/ed-global";

export const dev = JSON.parse(localStorage.getItem("prasi-dev") || "{}") as {
  enabled: boolean;
  url: string;
  lastURL: { valid: boolean; url: string };
};

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
        return url.toString();
      }
      dev.lastURL.valid = false;
    } catch (e) {
      dev.lastURL.valid = false;
    }
  }

  if (dev.lastURL.valid) return p.site.config.api_url;

  return "";
};

const apiDef = {} as any;

export const checkAPI = async (p: PG) => {
  const url = apiUrl(p);
  if (!url) return "offline";

  try {
    if (!apiDef[url]) {
      await initApi({ api_url: url }, "dev");
      apiDef[url] = createAPI(url);
    }
    const capi = apiDef[url];
    let res = await capi._deploy({
      type: "check",
      id_site: p.site.id,
    });
    if (!res) {
      return { deployable: false, db: "", hasDB: false };
    } else {
      if (res.db && res.now) {
        return { deployable: false, db: res.db, hasDB: true };
      }
    }
  } catch (e) {
    console.error(e);
    return "error";
  }

  return { deployable: false, db: "", hasDB: false };
};
