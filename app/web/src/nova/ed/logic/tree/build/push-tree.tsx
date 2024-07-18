import { NodeModel } from "@minoru/react-dnd-treeview";
import { IMeta, PG } from "../../ed-global";
import { MItem } from "../../../../../utils/types/item";
import { createId } from "@paralleldrive/cuid2";

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
        if (mitem && mitem.get && mitem.get("id") === meta.item.id) {
          meta.mitem = mitem;
        }
      });

      parent.mitem
        .get("component")
        ?.get("props")
        ?.forEach((v, k) => {
          if (typeof v === "object") {
            if ((v as any)?.get("meta")?.get("type") === "content-element") {
              const mitem = (v as any)?.get("content") as MItem;
              if (mitem && meta.item.id === mitem.get("id")) {
                meta.mitem = mitem;
              }
            }
          }
        });
    }
  }

  if (!meta.item || !meta.item.id) {
    console.error("Emptry Tree Item ", meta);
    return null;
  }

  if (tree.find((t) => t.id === meta.item.id)) {
    console.error("Double Tree Item: ", meta.item.id, meta.item.name);
    meta.mitem?.set("id", createId());
  } else {
    if (!meta.parent?.comp_id) {
      tree.push({
        id: meta.item.id,
        parent: meta.parent?.id || "root",
        text: meta.item.name,
        data: meta,
      });
    } else {
      if (meta.jsx_prop) {
        if (meta.jsx_prop.is_root) {
          if (meta.jsx_prop.name !== "child") {
            tree.push({
              id: meta.item.id,
              parent: meta.parent?.instance_id || "root",
              text: meta.jsx_prop.name,
              data: meta,
            });
          }
        } else {
          if (meta.jsx_prop.name === "child" && meta.parent.instance_id) {
            const comp_meta = metas[meta.parent.instance_id] as IMeta;
            const child_id =
              comp_meta.item.component?.props?.child?.content?.id;
            if (child_id && comp_meta.mitem) {
              const child_meta = metas[child_id];
              if (child_meta.item.childs.find((e) => meta.item.id === e.id)) {
                tree.push({
                  id: meta.item.id,
                  parent: meta.parent?.instance_id || "root",
                  text: meta.item.name,
                  data: meta,
                });
              }
            }
          }
          if (meta.parent.id !== meta.parent.instance_id) {
            tree.push({
              id: meta.item.id,
              parent: meta.parent?.id || "root",
              text: meta.item.name,
              data: meta,
            });
          }
        }
      }
    }
  }
};
