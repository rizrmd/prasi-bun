import {
  Tree as DNDTree,
  DndProvider,
  TreeMethods,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { useEffect } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useGlobal, useLocal, waitUntil } from "web-utils";
import { Loading } from "../../../../../utils/ui/loading";
import { Modal } from "../../../../../utils/ui/modal";
import { EDGlobal } from "../../../logic/ed-global";
import { pagePicker, reloadPagePicker } from "./page-reload";
import { PageItem, edPageTreeRender } from "./page-tree";
import { EdFormPage } from "./page-form";

export const EdPagePop = () => {
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
        while (cur) {
          if (typeof cur.id === "string") {
            const parent_id = cur.parent;
            parents.push(cur.id);
            cur = pagePicker.tree.find((e) => e.id === parent_id);
          }
        }
        if (parents.length === 0) {
          local.tree.open("page-root");
        } else {
          local.tree.open(parents);
        }
      }
    });
  }, [p.ui.popup.page.open, p.page.cur.id, pagePicker.site_id]);

  if (!p.ui.popup.page.open) return null;

  if (p.site.id !== pagePicker.site_id) {
    pagePicker.site_id = p.site.id;
    reloadPagePicker(p);
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
          className={cx("absolute inset-[5%] bg-white flex")}
        >
          <div className="relative flex flex-1 items-stretch text-[12px] overflow-auto">
            {pagePicker.status === "loading" && (
              <Loading note="listing-page" backdrop={false} />
            )}

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
                  tree={pagePicker.tree}
                  rootId={"page-root"}
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
