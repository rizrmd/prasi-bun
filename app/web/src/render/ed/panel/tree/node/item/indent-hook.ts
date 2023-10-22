import { TreeMethods } from "@minoru/react-dnd-treeview";
import { useEffect } from "react";
import { PG } from "../../../../logic/ed-global";

export const indentHook = (
  p: PG,
  local: { tree: null | TreeMethods; render: () => void }
) => {
  useEffect(() => {
    const open = JSON.parse(localStorage.getItem("prasi-tree-open") || "{}");
    p.ui.tree.open = open;
    if (open[p.page.cur.id] && local.tree) {
      local.tree.open(open[p.page.cur.id]);
      local.render();
    }
  }, [p.page.tree]);
};
