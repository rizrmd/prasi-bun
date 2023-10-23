import { NodeRender } from "@minoru/react-dnd-treeview";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal, EdMeta, active } from "../../../logic/ed-global";
import { EdTreeAction } from "./item/action";
import { EdTreeCtxMenu } from "./item/ctx-menu";
import { EdTreeIndent } from "./item/indent";
import { EdTreeName } from "./item/name";

export const nodeRender: NodeRender<EdMeta> = (node, prm) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    rightClick: null as null | React.MouseEvent<HTMLDivElement, MouseEvent>,
  });
  if (!node || !node.data) return <></>;
  const item = node.data?.item;
  const isComponent = item.type === "item" && item.component?.id;

  return (
    <div
      className={cx(
        item.id,
        "relative border-b flex items-stretch  min-h-[26px]",
        active.item_id === item.id
          ? ["bg-blue-100"]
          : ["hover:bg-blue-50", isComponent && `bg-purple-50`]
      )}
      onContextMenu={(event) => {
        event.preventDefault();
        local.rightClick = event;
        local.render();
      }}
      onClick={() => {
        active.item_id = item.id;
        p.render();
      }}
    >
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
