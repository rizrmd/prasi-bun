import {
  Tree as DNDTree,
  DndProvider,
  NodeModel,
  TreeMethods,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { useEffect } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { deepClone, useGlobal, useLocal, waitUntil } from "web-utils";
import { Loading } from "../../../../../utils/ui/loading";
import { Modal } from "../../../../../utils/ui/modal";
import { EDGlobal, active } from "../../../logic/ed-global";
import {
  pagePicker,
  pagePickerRootItem,
  reloadPagePicker,
} from "./page-reload";
import { PageItem, edPageTreeRender } from "./page-tree";
import { EdFormPage } from "./page-form";
import { fuzzy } from "../../../../../utils/ui/fuzzy";

export const EdPopPage = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    tree: null as TreeMethods | null,
  });
  const TypedTree = DNDTree<PageItem>;
  pagePicker.render = local.render;

  useEffect(() => {
    waitUntil(() => local.tree).then(() => {
      if (local.tree) {
        const parents: string[] = [];
        let cur = pagePicker.tree.find((e) => e.id === p.page.cur.id);

        if (pagePicker.rename_id) {
          let cur = pagePicker.tree.find((e) => e.id === pagePicker.rename_id);
          while (cur) {
            if (typeof cur.id === "string") {
              if (parents.includes(cur.id)) {
                continue;
              }
              const parent_id = cur.parent;
              parents.push(cur.id);
              cur = pagePicker.tree.find((e) => e.id === parent_id);
            }
          }
        } else {
          while (cur) {
            if (typeof cur.id === "string") {
              if (parents.includes(cur.id)) {
                continue;
              }
              const parent_id = cur.parent;
              parents.push(cur.id);
              cur = pagePicker.tree.find((e) => e.id === parent_id);
            }
          }
        }

        if (parents.length <= 1) {
          local.tree.open("page-root");
        } else {
          local.tree.open(parents);
        }
      }
    });
  }, [
    p.ui.popup.page.open,
    p.page.cur.id,
    pagePicker.site_id,
    pagePicker.rename_id,
  ]);

  if (!p.ui.popup.page.open) return null;

  if (p.site.id !== pagePicker.site_id) {
    pagePicker.site_id = p.site.id;
    reloadPagePicker(p);
  }

  let filtered = pagePicker.tree;
  if (pagePicker.search) {
    const result = fuzzy(
      deepClone(pagePicker.tree),
      { pk: "id", search: ["text", "data.url"] as any },
      pagePicker.search
    );

    if (!result.find((e) => e.id === "root")) {
      filtered = [...result, pagePickerRootItem];
    } else {
      filtered = result;
    }
    filtered.map((e) => {
      if (e.id !== "root") e.parent = "root";
    });
  }

  return (
    <>
      <Modal
        open
        onOpenChange={(open) => {
          if (!open) {
            p.ui.popup.page.open = null;
            p.render();
          }
        }}
      >
        <div
          id="page-picker"
          ref={(ref) => {
            if (ref) {
              pagePicker.ref = ref;
            }
          }}
          className={cx(
            "absolute inset-[5%] bg-white flex",
            css`
              .dropping {
                background: #efefff;
              }
            `
          )}
        >
          <div className="relative flex flex-1 items-stretch text-[14px] overflow-auto">
            {pagePicker.status === "loading" ? (
              <Loading note="listing-page" backdrop={false} />
            ) : (
              <>
                {pagePicker.ref && (
                  <DndProvider
                    backend={HTML5Backend}
                    options={getBackendOptions({
                      html5: {
                        rootElement: pagePicker.ref,
                      },
                    })}
                  >
                    <TypedTree
                      ref={(ref) => {
                        if (local.tree !== ref) {
                          local.tree = ref;
                        }
                      }}
                      tree={filtered}
                      rootId={"page-root"}
                      onDrop={async (newTree: NodeModel<PageItem>[], opt) => {
                        pagePicker.tree = newTree;
                        p.render();

                        if (!opt.dragSource?.droppable) {
                          await db.page.update({
                            where: {
                              id: opt.dragSourceId as string,
                            },
                            data: {
                              id_folder: (opt.dropTargetId === "root" ||
                              !opt.dropTargetId
                                ? null
                                : opt.dropTargetId) as string,
                            },
                            select: { id: true },
                          });
                        } else {
                          await db.page_folder.update({
                            where: {
                              id: opt.dragSourceId as string,
                            },
                            data: {
                              parent_id: (opt.dropTargetId === "ROOT" ||
                              !opt.dropTargetId
                                ? null
                                : opt.dropTargetId) as string,
                            },
                            select: {
                              id: true,
                            },
                          });
                        }
                        reloadPagePicker(p);
                      }}
                      dragPreviewRender={() => <></>}
                      canDrag={() => true}
                      canDrop={(tree, opt) => {
                        if (opt.dropTarget?.data?.type === "page") return false;
                        if (opt.dropTargetId === "page-root") return false;
                        return true;
                      }}
                      classes={{ root: "flex-1", dropTarget: "dropping" }}
                      render={edPageTreeRender}
                    />
                  </DndProvider>
                )}
              </>
            )}
          </div>
        </div>

        {p.ui.popup.page.form && (
          <EdFormPage
            page={p.ui.popup.page.form}
            onClose={() => {
              p.ui.popup.page.form = null;
              p.render();
            }}
            onSave={async (page, isNew) => {
              p.ui.popup.page.form = null;

              if (isNew) {
                p.render();
                await reloadPagePicker(p);
                active.comp_id = "";
                active.item_id = "";
                navigate(`/ed/${p.site.id}/${page.id}`);
              } else {
                const found = pagePicker.tree.find(
                  (e) => e.id === page.id && e.data?.type === "page"
                );
                if (found) {
                  for (const [k, v] of Object.entries(found.data || {})) {
                    if (page[k]) {
                      (found.data as any)[k] = page[k];
                    }
                  }
                  found.text = page.name;
                }

                p.render();
              }
            }}
          />
        )}
      </Modal>
    </>
  );
};
