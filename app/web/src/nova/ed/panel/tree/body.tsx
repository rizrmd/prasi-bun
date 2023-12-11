import {
  Tree as DNDTree,
  DragPreviewRender,
  NodeModel,
  PlaceholderRender,
  TreeMethods,
} from "@minoru/react-dnd-treeview";
import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal, IMeta, active } from "../../logic/ed-global";
import { DEPTH_WIDTH } from "./node/item/indent";
import { expandTreeHook } from "./node/item/indent-hook";
import { canDrop, nodeOnDrop } from "./node/on-drop";
import { nodeRender } from "./node/render";
import { doTreeSearch } from "./search";

export const EdTreeBody = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({ tree: null as TreeMethods | null, comp_id: "" });
  const TypedTree = DNDTree<IMeta>;

  active.hover.renderTree = local.render;

  expandTreeHook(p, local);

  if (active.comp_id && local.comp_id !== active.comp_id) {
    local.comp_id = active.comp_id;
    const ref = p.comp.list[active.comp_id];
    if (ref) {
      p.comp.tree = ref.tree;
    }
  }

  let tree: NodeModel<IMeta>[] = [];
  if (p.ui.tree.search) {
    tree = doTreeSearch(p);
  } else {
    if (!!active.comp_id) {
      tree = p.comp.tree;
    } else {
      tree = p.page.tree;
    }
  }

  if (tree.length === 0)
    return (
      <div className="flex py-[100px] select-none justify-center flex-1">
        <div className="flex flex-col items-center">
          <img
            draggable={false}
            src="/img/empty.png"
            className={css`
              width: 50px;
            `}
          />
          <div className="mt-[20px] text-[12px]">— No Item —</div>
          {active.comp_id && (
            <div
              className="flex items-center border border-slate-500 bg-white rounded-sm text-[10px] px-[2px] cursor-pointer hover:bg-purple-100 hover:border-purple-600 mt-5"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                if (active.comp_id) {
                  active.comp_id = active.instance.comp_id || "";
                  active.item_id = active.instance.item_id || "";
                  active.instance.comp_id = "";
                  active.instance.item_id = "";
                  p.render();
                }
              }}
            >
              Close Component
            </div>
          )}
        </div>
      </div>
    );

  return (
    <>
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
        onDrop={(tree, options) => nodeOnDrop(p, tree, options)}
        canDrop={(_, args) => {
          if (!args.dragSource?.data?.item) return false;
          return canDrop(p, args);
        }}
        dragPreviewRender={DragPreview}
        placeholderRender={(node, params) => (
          <Placeholder node={node} params={params} />
        )}
      />
    </>
  );
};

const treeClasses = {
  container: "flex flex-col flex-1",
  dropTarget: "drop-target",
  placeholder: "placeholder",
  draggingSource: css`
    opacity: 0.3;
    cursor: not-allowed;
  `,
};

export const DragPreview: DragPreviewRender<IMeta> = (props) => {
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
  node: Parameters<PlaceholderRender<IMeta>>[0];
  params: Parameters<PlaceholderRender<IMeta>>[1];
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
