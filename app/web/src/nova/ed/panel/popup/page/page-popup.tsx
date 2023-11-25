import { Tree as DNDTree, DndProvider, MultiBackend, getBackendOptions } from "@minoru/react-dnd-treeview";
import { useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { Loading } from "../../../../../utils/ui/loading";
import { Modal } from "../../../../../utils/ui/modal";
import { EDGlobal } from "../../../logic/ed-global";
import { pagePicker, reloadPagePicker } from "./page-reload";
import { PageItem, edPageTreeRender } from "./page-tree";

export const EdPagePop = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({});
  const TypedTree = DNDTree<PageItem>;
  pagePicker.render = local.render;

  useEffect(() => {
    p.ui.popup.page.open = () => {};

    (async () => {
      if (pagePicker.status === "ready") {
        reloadPagePicker(p);
      }
    })();
  }, [p.site.id]);

  if (!p.ui.popup.page.open) return null;

  return (
    <>
      {pagePicker.status === "loading" && <Loading note="listing-page" />}
      <Modal
        open
        onOpenChange={(open) => {
          if (!open) {
            p.ui.popup.page.open = null;
            p.render();
          }
        }}
      >
        <div className="absolute inset-[5%] bg-white flex">
          <div className="relative flex flex-1">
            <DndProvider backend={MultiBackend} options={getBackendOptions()}>
              <TypedTree
                tree={pagePicker.tree}
                rootId={"root"}
                onDrop={() => {}}
                render={edPageTreeRender}
              />
            </DndProvider>
          </div>
        </div>
      </Modal>
    </>
  );
};
