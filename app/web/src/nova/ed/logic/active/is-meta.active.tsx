import { getCompMeta } from "../comp/comp-meta";
import { IMeta, PG, active } from "../ed-global";

export const isMetaActive = (p: PG, meta: IMeta) => {
  if (!meta.item) return false;
  
  let is_active: boolean = active.item_id === meta.item.id;
  if (active.comp_id) {
    if (meta.parent?.comp_id === active.comp_id) {
      const active_meta = getCompMeta(p, active.item_id, "is_active");
      if (active_meta) {
        if (active_meta.item.originalId === meta.item.originalId) {
          is_active = true;
        } else if (active_meta.item.id === meta.item.originalId) {
          is_active = true;
        }
      }
    } else {
      is_active = active.item_id === meta.item.originalId;
    }
  }
  return is_active;
};
