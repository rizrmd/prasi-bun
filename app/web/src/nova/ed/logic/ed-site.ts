import { viLoadLegacy } from "../../vi/load/load-legacy";
import { viLoadSnapshot } from "../../vi/load/load-snapshot";
import { ESite, PG } from "./ed-global";

export const loadSite = async (p: PG, site: ESite, note: string) => {
  p.site = site;

  

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
