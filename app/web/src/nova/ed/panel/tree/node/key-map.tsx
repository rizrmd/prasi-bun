import { RenderParams } from "@minoru/react-dnd-treeview";
import { KeyboardEvent } from "react";
import { IContent } from "../../../../../utils/types/general";
import { PG, active } from "../../../logic/ed-global";
import { edActionDelete } from "./item/action/del";
import { getMetaById } from "../../../logic/active/get-meta";

export const treeItemKeyMap = (p: PG, prm: RenderParams, item: IContent) => {
  return (e: KeyboardEvent) => {
    p.ui.prevent_indent_hook = true;
    if (e.key === "ArrowLeft") {
      if (prm.isOpen) {
        prm.onToggle();
        return;
      }
      const up = e.currentTarget.parentElement?.parentElement?.parentElement;
      if (up) {
        const c = up.children[0] as HTMLInputElement;
        if (c) c.focus();
      }
      return;
    }
    if (e.key === "ArrowRight") {
      if (prm.hasChild) {
        if (!prm.isOpen) {
          prm.onToggle();
        }

        const target = e.currentTarget;
        setTimeout(() => {
          let next = target.nextElementSibling;
          if (next) {
            if (next.children[0].children[0].childElementCount > 1) {
              const c = next.children[0].children[0] as HTMLInputElement;
              c.focus();
            }
          }
        });
      } else {
        let up = e.currentTarget.parentElement;
        while (up) {
          if (up.nextElementSibling) {
            break;
          }
          up = up.parentElement;
        }

        if (up) {
          let next = up.nextElementSibling;
          while (next && next.children[0]) {
            if (next.children[0].classList.contains("has-child")) {
              const c = next.children[0] as HTMLInputElement;
              if (c) {
                c.focus();
                break;
              }
            }
            if (next.nextElementSibling) {
              next = next.nextElementSibling;
            } else {
              (next as HTMLInputElement).focus();
              break;
            }
          }
        }
      }
      return;
    }

    if (e.key === "ArrowDown") {
      const child = e.currentTarget.nextElementSibling;
      if (child) {
        const c = child.children[0]?.children[0] as HTMLInputElement;
        if (c) c.focus();
        return;
      }
      let up = e.currentTarget.parentElement;
      while (up) {
        if (up.nextElementSibling) {
          break;
        }
        up = up.parentElement;
      }

      if (up) {
        const next = up.nextElementSibling;
        if (next) {
          const c = next.children[0] as HTMLInputElement;
          if (c) c.focus();
        }
      }
      return;
    }

    if (e.key === "ArrowUp") {
      let down = e.currentTarget.parentElement?.previousElementSibling;
      if (down) {
        if (down.childElementCount === 2) {
          while (down) {
            if (down.childElementCount === 2) {
              down = down.children[1].lastElementChild;
            } else {
              if (down.nextElementSibling) {
                down = down.nextElementSibling;
              } else break;
            }
          }
        }
        if (down) {
          (down.children[0] as HTMLInputElement).focus();
          return;
        }
      } else {
        const up = e.currentTarget.parentElement?.parentElement?.parentElement;

        if (up) {
          if (!up.classList.contains("absolute")) {
            const c = up.children[0] as HTMLInputElement;
            if (c) {
              c.focus();
              return;
            }
          }
        }
      }

      p.ui.tree.search_ref?.focus();
      return;
    }

    if (e.key === "Enter") {
      if (p.ui.tree.search) {
        p.ui.tree.search = "";
        p.ui.prevent_indent_hook = false;
        active.item_id = "";
        p.render();
        setTimeout(() => {
          active.item_id = item.id;
          p.render();
          setTimeout(() => {
            const f = document.querySelector(
              `.tree-${item.id}`
            ) as HTMLInputElement;
            if (f) {
              f.focus();
            }
          });
        });
      } else {
        p.ui.tree.rename_id = item.id;
        p.render();
      }
      return;
    }

    if (e.key === "Backspace" || e.key === "Delete") {
      let last = "";
      let found = null as HTMLInputElement | null;

      if (
        item.type === "item" &&
        item.component?.id === active.comp_id &&
        active.comp_id
      ) {
        return;
      }

      const meta = getMetaById(p, item.id);
      const pmeta = active.comp_id
        ? p.comp.list[active.comp_id].meta
        : p.page.meta;
      if (meta && meta.parent?.id) {
        const parent = pmeta[meta.parent.id];
        parent?.mitem?.get("childs")?.forEach((e) => {
          if (e.get("id") === item.id) {
            found = document.querySelector(`.tree-${last}`);
          }
          if (!found) {
            last = e.get("id");
          }
        });

        if (!found) {
          last = meta.parent.id;
          found = document.querySelector(`.tree-${last}`);
        }
      }

      edActionDelete(p, item);

      if (found) {
        found.focus();
      }
      return;
    }

    if (e.key.length === 1 && !e.altKey && !e.metaKey && !e.shiftKey) {
      const meta = getMetaById(p, item.id);
      if (meta && (meta.item as IContent).type === "text") {
        setTimeout(() => {
          const vtext = document.querySelector(
            `.v-text-${item.id}`
          ) as HTMLInputElement;
          if (vtext) {
            vtext.focus();
          }
        });
      } else {
        p.ui.tree.search_ref?.focus();
      }
    }
  };
};
