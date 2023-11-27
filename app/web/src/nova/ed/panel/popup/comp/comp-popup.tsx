import {
  Tree as DNDTree,
  DndProvider,
  TreeMethods,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { useEffect } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useGlobal, useLocal } from "web-utils";
import { Loading } from "../../../../../utils/ui/loading";
import { Modal } from "../../../../../utils/ui/modal";
import { EDGlobal } from "../../../logic/ed-global";
import { compPicker, reloadCompPicker } from "./comp-reload";
import { CompItem, edPageTreeRender } from "./comp-tree";

export const EdPopComp = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    tree: null as TreeMethods | null,
  });
  const TypedTree = DNDTree<CompItem>;
  compPicker.render = local.render;

  useEffect(() => {
    local.tree?.openAll();
  }, [p.ui.popup.comp.open, compPicker.site_id]);

  if (!p.ui.popup.comp.open) return null;

  if (p.site.id !== compPicker.site_id) {
    compPicker.site_id = p.site.id;
    reloadCompPicker(p);
  }

  return (
    <>
      <Modal
        open
        onOpenChange={(open) => {
          if (!open) {
            p.ui.popup.comp.open = null;
            p.render();
          }
        }}
      >
        <div
          id="comp-picker"
          ref={(ref) => {
            if (ref) {
              compPicker.ref = ref;
            }
          }}
          className={cx("absolute inset-[5%] bg-white flex")}
        >
          <div className="relative flex flex-1 items-stretch text-[12px] overflow-auto">
            {compPicker.status === "loading" && (
              <Loading note="listing-comp" backdrop={false} />
            )}

            {compPicker.ref && (
              <DndProvider
                backend={HTML5Backend}
                options={getBackendOptions({
                  html5: {
                    rootElement: compPicker.ref,
                  },
                })}
              >
                <TypedTree
                  ref={(ref) => {
                    if (local.tree !== ref) {
                      local.tree = ref;
                    }
                  }}
                  tree={compPicker.tree}
                  rootId={"comp-root"}
                  onDrop={() => {}}
                  dragPreviewRender={() => <></>}
                  canDrag={() => true}
                  classes={{ root: "flex-1" }}
                  render={edPageTreeRender}
                />
              </DndProvider>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
