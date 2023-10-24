import { NodeRender } from "@minoru/react-dnd-treeview";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal, EdMeta, active } from "../../../logic/ed-global";
import { EdTreeAction } from "./item/action";
import { EdTreeCtxMenu } from "./item/ctx-menu";
import { EdTreeIndent } from "./item/indent";
import { EdTreeName } from "./item/name";
import { Loading } from "../../../../../utils/ui/loading";
import { edActionDelete } from "./item/action/del";

export const nodeRender: NodeRender<EdMeta> = (node, prm) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    rightClick: null as null | React.MouseEvent<HTMLDivElement, MouseEvent>,
  });
  if (!node || !node.data) return <></>;
  const item = node.data?.item;
  const isComponent = item.type === "item" && item.component?.id;

  if (p.ui.tree.item_loading.includes(item.id)) {
    return (
      <div className={"relative border-b flex items-stretch  min-h-[26px]"}>
        <Loading backdrop={false} />
      </div>
    );
  }

  return (
    <div
      tabIndex={0}
      className={cx(
        "tree-item",
        `tree-${item.id}`,
        "relative border-b flex items-stretch outline-none min-h-[26px]",
        prm.hasChild && "has-child",
        css`
          &:focus {
            .focus {
              display: flex;
            }
          }
        `,
        active.item_id === item.id
          ? ["bg-blue-100"]
          : ["hover:bg-blue-50", isComponent && `bg-purple-50`]
      )}
      onKeyDown={(e) => {
        p.ui.prevent_indent_hook = true;
        if (e.key === "ArrowLeft") {
          if (prm.isOpen) {
            prm.onToggle();
            return;
          }
          const up =
            e.currentTarget.parentElement?.parentElement?.parentElement;
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
              while (next) {
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
            const up =
              e.currentTarget.parentElement?.parentElement?.parentElement;

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
          p.page.meta[item.id].parent_item.mitem
            ?.get("childs")
            ?.forEach((e) => {
              if (e.get("id") === item.id) {
                found = document.querySelector(`.tree-${last}`);
              }
              if (!found) {
                last = e.get("id");
              }
            });

          if (!found) {
            last = p.page.meta[item.id].parent_item.mitem?.get("id") || "";
            found = document.querySelector(`.tree-${last}`);
          }

          edActionDelete(p, item);

          if (found) {
            found.focus();
          }
          return;
        }

        if (e.key.length === 1) {
          p.ui.tree.search_ref?.focus();
        }
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        local.rightClick = event;
        local.render();
      }}
      onFocus={(e) => {
        active.item_id = item.id;
        p.render();
      }}
      onClick={() => {
        active.item_id = item.id;
        p.ui.tree.search = "";
        p.render();
      }}
    >
      <div className="focus hidden absolute left-0 bottom-0 top-0 w-[4px] bg-blue-500"></div>
      {local.rightClick && (
        <EdTreeCtxMenu
          node={node}
          prm={prm}
          event={local.rightClick}
          onClose={() => {
            local.rightClick = null;
            local.render();
          }}
        />
      )}
      <EdTreeIndent node={node} prm={prm} />
      <EdTreeName node={node} prm={prm} />
      <EdTreeAction node={node} prm={prm} />
    </div>
  );
};
