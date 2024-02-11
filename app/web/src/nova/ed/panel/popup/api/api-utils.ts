import { apiProxy } from "../../../../../base/load/api/api-proxy";
import { w } from "../../../../../utils/types/general";
import { PG } from "../../../logic/ed-global";

export const apiRef = {} as Record<string, any>;

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
    if (!apiRef[url]) apiRef[url] = apiProxy(url) as any;

    const capi = apiRef[url];

    if (!capi) {
      console.error(`Cannot initialize API for ${url}.`, w.prasiApi[url]);
    } else {
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
            deploy: {
              now: res.now,
              current: res.current,
              deploys: res.deploys,
            },
          };
        }
      }
    }
  } catch (e) {
    console.error(e);
    return "error";
  }

  return { deployable: false, db: "", hasDB: false, domains: [] };
};
