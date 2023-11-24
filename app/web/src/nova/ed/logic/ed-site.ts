import { ESite, PG } from "./ed-global";
import { reloadPage } from "./ed-route";

export const loadSite = async (p: PG, site: ESite) => {
  const old_layout_id = p.site.layout.id;
  const layout_changed = p.site.layout.id !== site.layout.id;
  p.site = site;
  if (layout_changed) {
    const old_layout = p.page.list[old_layout_id];

    if (old_layout && old_layout.on_update) {
      old_layout.doc.off("update", old_layout.on_update);
    }

    if (site.layout.id) {
      await reloadPage(p, site.layout.id, "load-layout");
    }
  }
};
