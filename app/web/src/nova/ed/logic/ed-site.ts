import { viLoadLegacy } from "../../vi/load/load-legacy";
import { viLoadSnapshot } from "../../vi/load/load-snapshot";
import { ESite, PG } from "./ed-global";

export const loadSite = async (p: PG, site: ESite, note: string) => {
  p.site = site;

  p.mode = "desktop";
  if (p.site.responsive === "mobile-only") {
    p.mode = "mobile";
  } else if (p.site.responsive === "desktop-only") {
    p.mode = "desktop";
  }

  if (!p.script.db && !p.script.api) {
    if (p.site.code.mode === "old") {
      await viLoadLegacy({
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
