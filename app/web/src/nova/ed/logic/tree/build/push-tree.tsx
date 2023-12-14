import { NodeModel } from "@minoru/react-dnd-treeview";
import { IMeta, PG } from "../../ed-global";

export const pushTreeNode = (
  p: PG,
  meta: IMeta,
  metas: Record<string, IMeta>,
  tree: NodeModel<IMeta>[]
) => {
  if (meta.parent?.id === "root") {
    p.page.doc
      ?.getMap("map")
      .get("root")
      ?.get("childs")
      ?.forEach((mitem) => {
        if (mitem.get("id") === meta.item.id) {
          meta.mitem = mitem;
        }
      });
  } else {
    const parent = metas[meta.parent?.id || ""];
    if (parent && parent.mitem) {
      parent.mitem.get("childs")?.forEach((mitem) => {
        if (mitem.get("id") === meta.item.id) {
          meta.mitem = mitem;
        }
      });
    }
  }

  if (tree.find((t) => t.id === meta.item.id)) {
    console.log(meta.item.id, meta.item.name);
  } else {
    if (!meta.parent?.comp_id) {
      tree.push({
        id: meta.item.id,
        parent: meta.parent?.id || "root",
        text: meta.item.name,
        data: meta,
      });
    } else if (meta.jsx_prop) {
      tree.push({
        id: meta.item.id,
        parent: meta.parent?.instance_id || "root",
        text: meta.item.name,
        data: meta,
      });
    }
  }
};
