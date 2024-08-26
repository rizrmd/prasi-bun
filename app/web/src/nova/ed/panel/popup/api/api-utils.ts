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
    | "syncing"
    | "restarting",
};

export const apiUrl = (p: PG) => {
  return p.site?.config?.api_url || "";
};

export const checkAPI = async (url: string, id_site: string) => {
  if (!url) return "offline";

  try {
    if (!apiRef[url]) apiRef[url] = apiProxy(url) as any;

    const capi = apiRef[url];

    if (!capi) {
      console.error(`Cannot initialize API for ${url}.`, w.prasiApi[url]);
    } else {
      let res = await capi._deploy({
        type: "check",
        id_site,
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
