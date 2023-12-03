import { TreeMethods } from "@minoru/react-dnd-treeview";
import { useEffect } from "react";
import { EdMeta, PG, active } from "../../../../logic/ed-global";
import { getMetaById } from "../../../../logic/tree/build";

export const expandTreeHook = (
  p: PG,
  local: { tree: null | TreeMethods; render: () => void }
) => {
  useEffect(() => {
    p.ui.tree.rename_id = "";
    if (p.ui.prevent_indent_hook) {
      p.ui.prevent_indent_hook = false;
      return;
    }
    const open = JSON.parse(localStorage.getItem("prasi-tree-open") || "{}");
    p.ui.tree.open = open;

    let shouldOpen = new Set<string>(
      open[active.comp_id || p.page.cur.id] || []
    );

    const cur = getMetaById(p, active.item_id);
    if (cur && cur.parent_item) {
      const id = cur.parent_item.mitem?.get("id");
      if (id) {
        let meta: EdMeta | undefined = getMetaById(p, id);
        while (meta) {
          const id = cur.parent_item.mitem?.get("id");
          if (id && !shouldOpen.has(id)) {
            shouldOpen.add(id);
            meta = getMetaById(p, id);
          } else {
            break;
          }
        }
      }
    }

    if (active.comp_id) {
      const pcomp = p.comp.list[active.comp_id];
      if (pcomp) {
        const root = pcomp.tree.find((e) => e.parent === "root");
        if (root && typeof root.id === "string") shouldOpen.add(root.id);
      }
    }

    if (shouldOpen.size > 0 && local.tree) {
      local.tree.open([...shouldOpen]);
      local.render();
      if (active.item_id) {
        const meta = getMetaById(p, active.item_id);
        if (meta && meta.item.type !== "text") {
          setTimeout(() => {
            const el = document.getElementsByClassName(active.item_id);
            if (el.length > 0) {
              el[0].scrollIntoView({ behavior: "instant", block: "center" });
            }
          });
        }
      }
    }
  }, [p.page.tree, active.comp_id, active.item_id]);
};
