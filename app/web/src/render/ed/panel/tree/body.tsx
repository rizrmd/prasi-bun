import {
  Tree as DNDTree,
  DragPreviewRender,
  NodeModel,
  PlaceholderRender,
  TreeMethods,
} from "@minoru/react-dnd-treeview";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal, EdMeta } from "../../logic/ed-global";
import { indentHook } from "./node/item/indent-hook";
import { canDrop, nodeOnDrop } from "./node/on-drop";
import { nodeRender } from "./node/render";
import { FC } from "react";
import { DEPTH_WIDTH } from "./node/item/indent";
import { doTreeSearch } from "./search";

export const EdTreeBody = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({ tree: null as TreeMethods | null });
  const TypedTree = DNDTree<EdMeta>;

  indentHook(p, local);

  let tree: NodeModel<EdMeta>[] = [];
  if (p.ui.tree.search) {
    tree = doTreeSearch(p);
  } else {
    tree = p.page.tree;
  }

  if (p.page.tree.length === 0) return <div>No Item </div>;
  return (
    <TypedTree
      tree={tree}
      rootId={"root"}
      insertDroppableFirst={false}
      classes={treeClasses}
      ref={(el) => {
        local.tree = el;
      }}
      sort={false}
      dropTargetOffset={10}
      render={nodeRender}
      onDrop={nodeOnDrop}
      canDrop={(_, args) => {
        return canDrop(p, args);
      }}
      dragPreviewRender={DragPreview}
      placeholderRender={(node, params) => (
        <Placeholder node={node} params={params} />
      )}
    />
  );
};

const treeClasses = {
  container: "flex flex-col",
  dropTarget: "drop-target",
  placeholder: "placeholder",
  draggingSource: css`
    opacity: 0.3;
    cursor: not-allowed;
  `,
};

export const DragPreview: DragPreviewRender<EdMeta> = (props) => {
  const item = props.item;

  return (
    <div
      className={cx("bg-blue-500 text-white px-4 py-[2px] text-sm inline-grid")}
    >
      <div>{item.text}</div>
    </div>
  );
};

export const Placeholder: FC<{
  node: Parameters<PlaceholderRender<EdMeta>>[0];
  params: Parameters<PlaceholderRender<EdMeta>>[1];
}> = ({ params }) => {
  return (
    <div
      className={cx(
        "flex items-center bg-blue-50",
        css`
          height: 10px;
          z-index: 99;
          position: absolute;
          left: ${(params.depth + 1) * DEPTH_WIDTH - 3}px;
          transform: translateY(-50%);
          right: 0px;
        `
      )}
    >
      <div
        className={cx(
          "flex-1",
          css`
            background-color: #1b73e8;
            height: 2px;
          `
        )}
      ></div>
    </div>
  );
};
