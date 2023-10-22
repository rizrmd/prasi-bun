import { Tree as DNDTree, TreeMethods } from "@minoru/react-dnd-treeview";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal, EdMeta } from "../../logic/ed-global";
import { indentHook } from "./node/item/indent-hook";
import { nodeOnDrop } from "./node/on-drop";
import { nodeRender } from "./node/render";

export const EdTreeBody = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({ tree: null as TreeMethods | null });
  const TypedTree = DNDTree<EdMeta>;

  indentHook(p, local);

  return (
    <TypedTree
      tree={p.page.tree}
      rootId={"root"}
      insertDroppableFirst={false}
      classes={{
        container: "flex flex-col",
        dropTarget: "drop-target",
        placeholder: "placeholder",
        draggingSource: css`
          opacity: 0.3;
          cursor: not-allowed;
        `,
      }}
      ref={(el) => {
        local.tree = el;
      }}
      sort={false}
      render={nodeRender}
      onDrop={nodeOnDrop}
    />
  );
};
