import { scrollTreeActiveItem } from "../../panel/tree/scroll-tree";
import { IMeta, PG, active } from "../ed-global";
import { getMetaById } from "./get-meta";

export const activateMeta = (p: PG, _meta: IMeta) => {
  scrollTreeActiveItem();

  let meta = _meta;
  let parent_comp_id = meta.parent?.comp_id;

  if (!active.comp_id && meta.parent?.comp_id) {
    const meta_keys = Object.keys(meta);
    if (
      (!meta_keys.includes("jsx_prop") ||
        (meta_keys.includes("jsx_prop") && meta.jsx_prop?.is_root)) &&
      meta.parent.instance_id
    ) {
      const comp = getMetaById(p, meta.parent.instance_id);
      if (comp) meta = comp;
    }
  }

  if (
    active.comp_id &&
    meta.item.component?.id === active.comp_id &&
    meta.item.originalId
  ) {
    parent_comp_id = active.comp_id;
    active.item_id = meta.item.originalId;
    return;
  }

  if (meta.parent && parent_comp_id && !!p.ui.comp_editable) {
    if (active.comp_id) {
      if (active.comp_id === parent_comp_id) {
        if (meta.item.originalId) {
          if (meta.item.component?.id && parent_comp_id === active.comp_id) {
            const cmeta = p.comp.list[active.comp_id].meta;
            for (const val of Object.values(cmeta)) {
              if (
                val.item.originalId &&
                val.item.originalId === meta.item.originalId
              ) {
                if (active.item_id !== val.item.id) {
                  active.item_id = val.item.id;
                } else {
                  active.instance.comp_id = active.comp_id;
                  active.instance.item_id = active.item_id;
                  active.comp_id = meta.item.component.id;
                  active.item_id = val.item.originalId;
                }
              }
            }
          } else if (meta.item.originalId !== active.item_id) {
            active.item_id = meta.item.originalId;
          }
        }
      } else {
        if (
          meta.item.component?.id === active.comp_id &&
          meta.item.originalId
        ) {
          active.item_id = meta.item.originalId;
        } else if (meta.parent.instance_id) {
          const pmeta = p.page.meta[meta.parent.instance_id];

          if (pmeta.parent?.comp_id === active.comp_id) {
            const cmeta = p.comp.list[active.comp_id].meta;

            for (const val of Object.values(cmeta)) {
              if (
                val.item.originalId &&
                val.item.originalId === pmeta.item.originalId
              ) {
                if (active.item_id !== val.item.id) {
                  active.item_id = val.item.id;
                } else if (pmeta.item.component) {
                  active.instance.comp_id = active.comp_id;
                  active.instance.item_id = active.item_id;
                  active.comp_id = pmeta.item.component?.id;
                  active.item_id = val.item.originalId;
                }
              }
            }
          } else {
            active.comp_id = parent_comp_id;
            active.item_id = meta.parent.id;
          }
        }
      }
    } else {
      if (meta.parent.instance_id) {
        let parent = meta.parent;

        if (
          parent.comp_id &&
          parent.instance_id &&
          p.page.meta[parent.instance_id] &&
          !p.page.meta[parent.instance_id].mitem
        ) {
          while (parent.comp_id && parent.instance_id) {
            const par = p.page.meta[parent.instance_id];
            if (par) {
              if (par.mitem) {
                if (active.item_id !== par.item.id) {
                  active.item_id = par.item.id;
                } else {
                  active.instance.comp_id = active.comp_id;
                  active.instance.item_id = active.item_id;
                  active.comp_id = parent.comp_id;
                  const root_id = p.comp.list[parent.comp_id]?.tree.find(
                    (e) => e.parent === "root"
                  )?.id as string;
                  if (root_id) {
                    active.item_id = root_id;
                  }
                }
                break;
              }
              parent = par.parent as any;
            } else break;
          }
        } else {
          const meta_parent = p.page.meta[parent.id];
          if (active.item_id !== meta.parent.instance_id && !meta.jsx_prop) {
            active.item_id = meta.parent.instance_id;
          } else if (parent.comp_id && meta.item.originalId) {
            active.instance.comp_id = active.comp_id;
            active.instance.item_id = active.item_id;
            active.comp_id = parent.comp_id;
            active.item_id = meta.item.originalId;
          } else if (meta.jsx_prop?.is_root && meta_parent.item.component?.id) {
            active.item_id = meta_parent.item.id;
          } else {
            active.item_id = meta.item.id;
          }
        }
      }
    }
  } else {
    if (active.comp_id) {
      if (!parent_comp_id) {
        active.comp_id = "";
      } else if (meta.item.originalId) {
        active.item_id = meta.item.originalId;
      }
    } else {
      active.item_id = meta.item.id;
    }
  }
};
