import { IMeta, PG } from "../../ed-global";

export const pushTreeNode = (p: PG, meta: IMeta) => {
  if (!meta.parent?.comp_id) {
    p.page.tree.push({
      id: meta.item.id,
      parent: meta.parent?.id || "root",
      text: meta.item.name,
      data: meta,
    });
  } else if (meta.jsx_prop) {
    p.page.tree.push({
      id: meta.item.id,
      parent: meta.parent?.instance_id || "root",
      text: meta.item.name,
      data: meta,
    });
  }
};
