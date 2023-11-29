import {
  Tree as DNDTree,
  DndProvider,
  TreeMethods,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from "react";
import { deepClone, useGlobal, useLocal } from "web-utils";
import { Loading } from "../../../../../utils/ui/loading";
import { Modal } from "../../../../../utils/ui/modal";
import { EDGlobal, active } from "../../../logic/ed-global";
import { compPicker, reloadCompPicker } from "./comp-reload";
import { CompItem, edPageTreeRender } from "./comp-tree";
import { EdCompPreview } from "./comp-preview";
import { fuzzy } from "../../../../../utils/ui/fuzzy";

export const EdPopComp = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    tree: null as TreeMethods | null,
    tab: "Components",
  });
  const TypedTree = DNDTree<CompItem>;
  compPicker.render = local.render;

  useEffect(() => {
    local.tree?.openAll();
  }, [p.ui.popup.comp.open, compPicker.site_id, local.tab]);

  if (!p.ui.popup.comp.open) return null;

  if (!compPicker.active_id && active.item_id) {
    compPicker.active_id = active.item_id;
  }

  if (p.site.id !== compPicker.site_id) {
    compPicker.site_id = p.site.id;
    reloadCompPicker(p);
  }

  let tree = compPicker.tree;
  if (local.tab === "Trash") {
    tree = compPicker.trash;
  }

  if (compPicker.search) {
    tree = fuzzy(tree, "text", compPicker.search);
    tree.forEach((e) => (e.parent = "comp-root"));
    tree = tree.filter((e) => e.data?.type === "component");
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
        fade={false}
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
          <div className="relative flex flex-1 items-stretch text-[14px] overflow-auto">
            {compPicker.status === "loading" && (
              <Loading note="listing-comp" backdrop={false} />
            )}
            {compPicker.status !== "loading" && (
              <>
                <div className="flex flex-1 flex-col">
                  <div className="flex h-[30px] border-b items-stretch mb-2 bg-slate-100">
                    <div className="flex items-end pl-1 space-x-1">
                      {["Components", "Trash"].map((e) => {
                        return (
                          <div
                            key={e}
                            className={cx(
                              "border cursor-pointer  -mb-[1px] px-2  hover:text-blue-500 hover:border-blue-500 hover:border-b-transparent select-none",
                              local.tab === e &&
                              "bg-white border-b-transparent",
                              local.tab !== e &&
                              "text-slate-400 border-b-slate-200 border-transparent bg-transparent"
                            )}
                            onClick={() => {
                              local.tab = e;
                              p.render();
                            }}
                          >
                            {e}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-1 mr-1 justify-end">
                      <input
                        type="search"
                        placeholder="Search"
                        spellCheck={false}
                        className="my-1 bg-transparent bg-white border outline-none px-1 focus:border-blue-500 focus:w-[300px] transition-all"
                        value={compPicker.search}
                        onChange={(e) => {
                          compPicker.search = e.currentTarget.value;
                          p.render();
                        }}
                      />
                    </div>
                  </div>
                  <div className="relative flex-1 overflow-auto flex">
                    <div
                      className={cx(
                        "absolute inset-0",
                        css`
                          > .tree-root > .listitem:first-child > div {
                            border-top: 0;
                          }

                          .dropping {
                            background: #efefff;
                          }
                        `,
                        compPicker.search ? css`
                        > .tree-root {
                          display: flex;
                          flex-direction: row;
                          flex-wrap: wrap;
                          position: relative;
                        }` : css`
                        > .tree-root > .listitem > .container {
                          display: flex;
                          flex-direction: row;
                          flex-wrap: wrap;
                          position: relative;
                        }`
                      )}
                    >
                      {compPicker.ref && compPicker.status === "ready" && (
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
                            tree={tree}
                            initialOpen={true}
                            rootId={"comp-root"}
                            onDrop={async (newTree, opt) => {
                              compPicker.tree = newTree;
                              p.render();

                              if (
                                typeof opt.dragSourceId === "string" &&
                                typeof opt.dropTargetId === "string"
                              ) {
                                db.component.update({
                                  where: {
                                    id: opt.dragSourceId,
                                  },
                                  data: {
                                    id_component_group: opt.dropTargetId,
                                  },
                                });
                              }
                            }}
                            dragPreviewRender={() => <></>}
                            canDrag={() => true}
                            canDrop={(tree, opt) => {
                              if (opt.dropTarget?.data?.type === "component")
                                return false;
                              if (opt.dropTargetId === "comp-root")
                                return false;
                              return true;
                            }}
                            classes={{
                              root: "tree-root flex-1",
                              listItem: "listitem",
                              container: "container",
                              dropTarget: "dropping",
                            }}
                            render={edPageTreeRender}
                          />
                        </DndProvider>
                      )}
                    </div>
                  </div>
                </div>
                <EdCompPreview />
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
