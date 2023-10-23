import { TreeMethods } from "@minoru/react-dnd-treeview";
import { useEffect } from "react";
import { PG, active } from "../../../../logic/ed-global";

export const indentHook = (
  p: PG,
  local: { tree: null | TreeMethods; render: () => void }
) => {
  useEffect(() => {
    const open = JSON.parse(localStorage.getItem("prasi-tree-open") || "{}");
    p.ui.tree.open = open;

    let shouldOpen = open[p.page.cur.id] || [];

    let meta = p.page.meta[active.item_id];
    while (meta) {
      if (meta.item.id) shouldOpen.push(meta.item.id);
      meta = p.page.meta[meta.parent_item.id];
    }

    if (shouldOpen.length > 0 && local.tree) {
      local.tree.open(shouldOpen);
      local.render();
      if (active.item_id) {
        setTimeout(() => {
          const el = document.getElementsByClassName(active.item_id);
          if (el.length > 0) {
            el[0].scrollIntoView({ behavior: "instant", block: "center" });
          }
        });
      }
    }
  }, [p.page.tree, active.item_id]);
};
