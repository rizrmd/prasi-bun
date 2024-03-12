import {
  Tree as DNDTree,
  DndProvider,
  TreeMethods,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { useEffect } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useGlobal, useLocal } from "web-utils";
import { fuzzy } from "../../../../../utils/ui/fuzzy";
import { Loading } from "../../../../../utils/ui/loading";
import { Modal } from "../../../../../utils/ui/modal";
import { EDGlobal, active } from "../../../logic/ed-global";
import { EdCompImport } from "./comp-import";
import { compPicker, reloadCompPicker } from "./comp-reload";
import { CompItem, edPageTreeRender } from "./comp-tree";

export const EdPopComp = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    tree: null as TreeMethods | null,
    tab: "Components",
  });
  const TypedTree = DNDTree<CompItem>;
  compPicker.render = local.render;

  useEffect(() => {
    if (!p.ui.popup.comp.open) local.tab = "Components";
  }, [p.ui.popup.comp.open]);

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
        {p.ui.popup.comp.import && <EdCompImport />}
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
                    <div className="flex flex-1 mr-1 justify-end items-stretch">
                      <div
                        className="bg-white text-xs border px-2 mr-1 my-1 flex items-center hover:border-blue-500 hover:bg-blue-50 cursor-pointer"
                        onClick={async () => {
                          const name = prompt("Folder Name:");
                          if (name) {
                            await _db.component_group.create({
                              data: {
                                name,
                                component_site: {
                                  create: {
                                    id_site: p.site.id,
                                    is_owner: true,
                                  },
                                },
                              },
                            });
                            await reloadCompPicker(p);
                          }
                        }}
                      >
                        + Folder
                      </div>
                      <div className="bg-white text-xs border px-2 mr-1 my-1 flex items-center hover:border-blue-500 hover:bg-blue-50 cursor-pointer">
                        + Prasi
                        <span className="font-bold text-slate-600 text-xs">
                          UI
                        </span>
                      </div>
                      <div
                        className="bg-white text-xs border px-2 mr-1 my-1 flex items-center hover:border-blue-500 hover:bg-blue-50 cursor-pointer"
                        onClick={async () => {
                          reloadCompPicker(p);
                          p.render();
                        }}
                        dangerouslySetInnerHTML={{
                          __html: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>`,
                        }}
                      ></div>
                      <div
                        className="bg-white text-xs border px-2 mr-1 my-1 flex items-center hover:border-blue-500 hover:bg-blue-50 cursor-pointer"
                        onClick={() => {
                          p.ui.popup.comp.import = true;
                          p.render();
                        }}
                      >
                        Import Components
                      </div>
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
                          > .container {
                            max-width: 100%;
                          }

                          > .tree-root > .listitem:first-child > div {
                            border-top: 0;
                          }

                          .dropping {
                            background: #efefff;
                          }
                        `,
                        compPicker.search
                          ? css`
                              > .tree-root {
                                display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                position: relative;
                              }
                            `
                          : css`
                              > .tree-root > .listitem > .container {
                                display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                position: relative;
                              }
                            `
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
                                _db.component.update({
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
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
