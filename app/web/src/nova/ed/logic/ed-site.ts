import { apiProxy } from "../../../base/load/api/api-proxy";
import { viLoadLegacy } from "../../vi/load/load-legacy";
import { viLoadSnapshot } from "../../vi/load/load-snapshot";
import { apiRef, apiUrl } from "../panel/popup/api/api-utils";
import { ESite, PG } from "./ed-global";

export const loadSite = async (p: PG, site: ESite, note: string) => {
  p.site = site;
  const url = apiUrl(p);
  if (!apiRef[url]) apiRef[url] = apiProxy(url) as any;

  const api = apiRef[url];
  try {
    const res = await api._deploy({
      type: "db-ver",
      id_site: p.site.id,
    });
    if (parseInt(res)) {
      const cur = localStorage.getItem("api-ts-" + p.site.config.api_url);
      if (cur && parseInt(cur) !== parseInt(res)) {
        localStorage.removeItem(`schema-md-${p.site.id}`);
      }

      localStorage.setItem("api-ts-" + p.site.config.api_url, res);
    }
  } catch (e) {
    console.log(e);
  }

  if (!p.script.db && !p.script.api) {
    if (!location.pathname.startsWith("/ed/")) {
      await viLoadLegacy({
        mode: p.mode,
        site: {
          api_url: p.site.config.api_url,
          id: p.site.id,
          api: {
            get() {
              return p.script.api;
            },
            set(val) {
              p.script.api = val;
            },
          },
          db: {
            get() {
              return p.script.db;
            },
            set(val) {
              p.script.db = val;
            },
          },
        },
        render: () => {},
      });
    } else {
      await viLoadSnapshot(p);
    }
  }
};
