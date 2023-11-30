import { NodeRender } from "@minoru/react-dnd-treeview";
import { useGlobal, useLocal } from "web-utils";
import { Loading } from "../../../../../utils/ui/loading";
import { EDGlobal, EdMeta, active } from "../../../logic/ed-global";
import { EdTreeAction } from "./item/action";
import { EdTreeCtxMenu } from "./item/ctx-menu";
import { EdTreeIndent } from "./item/indent";
import { EdTreeName } from "./item/name";
import { treeItemKeyMap } from "./key-map";
import { useEffect } from "react";
import { getMetaById } from "../../../logic/tree/build";

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
      ref={(el) => {
        if (el) {
        }
      }}
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
        active.item_id === item.id
          ? ["bg-blue-100"]
          : [isComponent && `bg-purple-50`],
        active.hover_id === item.id && "bg-blue-50"
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
        active.item_id = item.id;
        p.ui.tree.search = "";
        p.render();
        p.page.render();
      }}
      onMouseOver={() => {
        active.hover_id = item.id;
        p.render();
        p.page.render();
      }}
    >
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
      <EdTreeAction node={node} prm={prm} />
    </div>
  );
};
