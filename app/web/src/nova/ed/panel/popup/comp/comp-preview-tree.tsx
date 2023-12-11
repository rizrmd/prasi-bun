import {
  Tree as DNDTree,
  DndProvider,
  NodeModel,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { FC, useEffect } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { EDGlobal, IMeta } from "../../../logic/ed-global";
import { compPicker } from "./comp-reload";
import { nodeRender } from "../../tree/node/render";
import { useGlobal, useLocal } from "web-utils";

export const EdCompPreviewTree: FC<{ tree: NodeModel<IMeta>[] }> = ({
  tree,
}) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({ ref: null as any });
  const TypedTree = DNDTree<IMeta>;

  useEffect(() => {
    if (local.ref) local.ref.openAll();
  }, [p.ui.popup.comp.preview_id]);

  return (
    <div
      className="flex flex-col min-w-[200px] overflow-auto relative border-r"
      ref={(ref) => {
        if (!compPicker.preview_ref) {
          setTimeout(p.render, 100);
        }
        if (ref) compPicker.preview_ref = ref;
      }}
    >
      <div className="absolute inset-0">
        {compPicker.preview_ref && (
          <DndProvider
            backend={HTML5Backend}
            options={getBackendOptions({
              html5: {
                rootElement: compPicker.preview_ref,
              },
            })}
          >
            <TypedTree
              tree={tree}
              ref={(ref) => {
                if (ref) local.ref = ref;
              }}
              initialOpen={true}
              rootId={"root"}
              onDrop={() => {}}
              dragPreviewRender={() => <></>}
              canDrag={() => false}
              classes={{
                root: "tree-root flex-1 text-xs",
                listItem: "listitem",
                container: "container",
              }}
              render={nodeRender}
            />
          </DndProvider>
        )}
      </div>
    </div>
  );
};
