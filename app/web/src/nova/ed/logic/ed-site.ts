import { viLoadLegacy } from "../../vi/load/load-legacy";
import { ESite, PG } from "./ed-global";
import { reloadPage } from "./ed-route";

export const loadSite = async (p: PG, site: ESite, note: string) => {
  console.log("note", note);
  const old_layout_id = p.site.layout.id;
  const layout_changed = p.site.layout.id !== site.layout.id;
  p.site = site;

  if (layout_changed) {
    const old_layout = p.page.list[old_layout_id];

    if (old_layout && old_layout.on_update) {
      old_layout.doc.off("update", old_layout.on_update);
    }

    if (!p.script.db && !p.script.api) {
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
    }

    if (site.layout.id) {
      await reloadPage(p, site.layout.id, "load-layout");
    }
  }
};
