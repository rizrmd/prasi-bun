import { NodeRender } from "@minoru/react-dnd-treeview";
import { deepClone, useGlobal, useLocal } from "web-utils";
import { IContent } from "../../../../../utils/types/general";
import { Loading } from "../../../../../utils/ui/loading";
import { getMetaById } from "../../../logic/active/get-meta";
import { EDGlobal, IMeta, PG, active } from "../../../logic/ed-global";
import { text_edit } from "../../main/main-per-item";
import { EdTreeAction } from "./item/action";
import { EdTreeCtxMenu } from "./item/ctx-menu";
import { EdTreeIndent } from "./item/indent";
import { EdTreeName } from "./item/name";
import { treeItemKeyMap } from "./key-map";
import { Tooltip } from "../../../../../utils/ui/tooltip";
import { IItem, MItem } from "../../../../../utils/types/item";

export const nodeRender: NodeRender<IMeta> = (node, prm) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    rightClick: null as null | React.MouseEvent<HTMLDivElement, MouseEvent>,
  });

  if (!node || !node.data) {
    return <></>;
  }
  const item = node.data?.item;
  const isComponent = item.type === "item" && item.component?.id;

  if (p.ui.tree.item_loading.includes(item.id)) {
    return (
      <div className={"relative border-b flex items-stretch  min-h-[26px]"}>
        <Loading backdrop={false} />
      </div>
    );
  }

  if (node.data?.jsx_prop?.is_root) {
    let hide = true;
    const comp = p.comp.loaded[node.data.jsx_prop.comp_id];
    if (comp) {
      const prop_name = node.data?.jsx_prop?.name;
      const cprop = comp.component?.props[prop_name];
      if (cprop && node.data.parent?.instance_id) {
        const meta = getMetaById(p, node.data.parent.instance_id);

        if (meta && prop_name) {
          const props = meta.item.script?.props;

          if (props) {
            const prop = props[prop_name];
            if (
              prop &&
              (prop.visible === true || !prop.hasOwnProperty("visible"))
            ) {
              hide = false;
            } else {
              const prop = meta.item.component?.props[prop_name];

              if (prop && (prop.visible || !prop.hasOwnProperty("visible"))) {
                hide = false;
              }
            }
          } else {
            const prop = meta.item.component?.props[prop_name];

            if (prop && (prop.visible || !prop.hasOwnProperty("visible"))) {
              hide = false;
            }
          }
        }
      }
    }

    if (hide) {
      return <></>;
    }
  }

  let is_hover = false;
  if (active.hover.id === item.id) {
    is_hover = true;
  }

  let is_active = false;
  if (active.item_id === item.id) {
    is_active = true;
  }

  return (
    <Tooltip
      placement="right"
      content={bytesToHumanFileSize(
        JSON.stringify(hydrateItem(p, item)).length
      )}
      delay={0}
    >
      <div
        tabIndex={0}
        className={cx(
          "tree-item",
          `tree-${item.id}`,
          "relative border-b flex items-stretch outline-none min-h-[26px]",
          prm.hasChild && "has-child",
          css`
            &:hover {
              .action-script {
                opacity: 0.6;
              }
            }
          `,
          is_active ? ["bg-blue-100"] : [isComponent && `bg-purple-50`],
          is_hover && "bg-blue-50"
        )}
        onKeyDown={treeItemKeyMap(p, prm, item)}
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
          const drilled = new Set<string>();
          const drill = (mitem: MItem, lv: number) => {
            if (mitem) {
              const json = JSON.stringify(mitem.toJSON());
              if (json && json.length > 5000) {
                const html = mitem.get("html");
                if (html) {
                  mitem.set("html", extractContent(html));
                }
              }

              const comp_id = mitem.get("component")?.get("id");
              if (comp_id && !drilled.has(comp_id)) {
                drilled.add(comp_id);
                const mitem = p.comp.list[comp_id].doc
                  .getMap("map")
                  .get("root");
                if (mitem) {
                  drill(mitem, lv + 1);
                }
              }

              mitem.get("childs")?.forEach((mchild) => {
                drill(mchild, lv + 1);
              });
            }
          };
          if (JSON.stringify(hydrateItem(p, item)).length >= 100000) {
            if (item.component?.id) {
              drilled.add(item.component.id);
              const mitem = p.comp.list[item.component.id].doc
                .getMap("map")
                .get("root");
              if (mitem) {
                drill(mitem, 0);
              }
            } else {
              const meta = getMetaById(p, item.id);
              if (meta && meta.mitem) {
                meta.mitem.doc?.transact(() => {
                  if (meta.mitem) drill(meta.mitem, 0);
                });
              }
            }
          }

          if ((item as IContent).type === "text") {
            text_edit.del_key_id = item.id;
          }
          active.item_id = item.id;
          p.ui.tree.search = "";
          p.render();

          if ((item as IContent).type === "text") {
            setTimeout(() => {
              if (document.activeElement?.tagName === "INPUT") {
                return;
              }
              const el_active = document.querySelector(`.s-${item.id}`) as any;

              if (el_active) {
                setEndOfContenteditable(el_active);
              }
            }, 100);
          }
        }}
        onMouseEnter={() => {
          active.hover.id = item.id;
          p.render();
        }}
      >
        {active.hover.id === item.id && (
          <div
            className={cx("absolute left-0 bottom-0 top-0 w-[4px] bg-blue-300")}
          ></div>
        )}
        {active.item_id === item.id && (
          <div
            className={cx("absolute left-0 bottom-0 top-0 w-[4px] bg-blue-500")}
          ></div>
        )}
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
        {node.data?.mitem && <EdTreeAction node={node} prm={prm} />}
      </div>
    </Tooltip>
  );
};

function setEndOfContenteditable(div: any) {
  let range: any, sel: any;
  if (document.createRange) {
    //Firefox, Chrome, Opera, Safari, IE 9+
    range = document.createRange();
    range.selectNodeContents(div);
    sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

function bytesToHumanFileSize(bytes: number): string {
  const sizes = ["bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 bytes";

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = i === 0 ? bytes : (bytes / Math.pow(1024, i)).toFixed(2);

  return `${size} ${sizes[i]}`;
}

const hydrateItem = (p: PG, item: IItem) => {
  const result = deepClone(item);

  if (result.childs) {
    for (const [k, child] of Object.entries(result.childs)) {
      const meta = getMetaById(p, child.id);
      if (meta && meta.item) {
        result.childs[k as any] = hydrateItem(p, meta.item);
      }
    }
  }

  return result;
};
function extractContent(s: string) {
  var span = document.createElement("span");
  span.innerHTML = s;
  return span.textContent || span.innerText;
}
