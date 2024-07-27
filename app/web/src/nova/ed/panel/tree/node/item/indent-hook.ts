import { TreeMethods } from "@minoru/react-dnd-treeview";
import { useEffect } from "react";
import { IContent } from "../../../../../../utils/types/general";
import { getMetaById } from "../../../../logic/active/get-meta";
import { IMeta, PG, active } from "../../../../logic/ed-global";
import { scrollTreeActiveItem } from "../../scroll-tree";

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

    if (p.ui.tree.open_all) {
      p.ui.tree.open_all = false;
      local.tree?.openAll();
      p.render();
      return;
    }

    const open = JSON.parse(localStorage.getItem("prasi-tree-open") || "{}");
    p.ui.tree.open = open;

    let shouldOpen = new Set<string>(
      open[active.comp_id || p.page.cur.id] || []
    );

    const cur = getMetaById(p, active.item_id);
    if (cur && cur.parent?.id) {
      const id = cur.parent.id;

      if (id) {
        shouldOpen.add(id);

        let meta: IMeta | undefined = getMetaById(p, id);
        let i = 0;
        while (meta) {
          i++;
          if (i > 5000) {
            console.warn(
              "WARNING: Prasi expand item parent tree exceed 5000 loop, maybe infinite loop?"
            );
            break;
          }
          const id = meta.parent?.id;
          if (id) {
            meta = getMetaById(p, id);

            if (!shouldOpen.has(id)) {
              shouldOpen.add(id);
            } else if ((meta && !meta.parent) || !meta) {
              break;
            }
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
    }
    
    scrollTreeActiveItem();
  }, [p.page.tree, active.comp_id, active.item_id, p.ui.tree.open_all]);
};
