import {
  Tree as DNDTree,
  MultiBackend,
  NodeModel,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { FC, useRef } from "react";
import { DndProvider } from "react-dnd";
import { useGlobal, useLocal } from "web-utils";
import { Menu, MenuItem } from "../../../../utils/ui/context-menu";
import { EDGlobal, PG } from "../../logic/ed-global";
import { FEntry } from "./type";

const Tree = DNDTree<FEntry>;

export const EdFileTree: FC<{}> = ({}) => {
  const p = useGlobal(EDGlobal, "EDITOR");

  if (!p.ui.popup.file.expanded[p.site.id]) {
    p.ui.popup.file.expanded[p.site.id] = [];
  }

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={p.ui.popup.file.tree}
        dragPreviewRender={() => <></>}
        rootId=""
        initialOpen={[...(p.ui.popup.file.expanded[p.site.id] || []), "/"]}
        canDrop={(newTree, opt) => {
          const source = opt.dragSource?.data;
          if (source) {
            if (source.type === "file") {
              if (opt.dropTargetId !== p.ui.popup.file.path) {
                return true;
              }
            }
          } else {
            const to = opt.dropTargetId + "";
            const from = opt.dragSourceId + "";

            if (to.startsWith(from)) return false;

            const from_arr = from.split("/").filter((e) => e);
            const to_arr = to.split("/").filter((e) => e);
            if (
              from_arr.slice(0, from_arr.length - 1).join("/") ===
              to_arr.join("/")
            )
              return false;

            return true;
          }
          return false;
        }}
        onDrop={async (newTree, { dropTargetId, dragSourceId, dragSource }) => {
          if (dragSource) {
            if (dragSource.data?.type === "file") {
              const f = p.ui.popup.file;
              const path = f.path;

              for (const file of f.selected) {
                const from = path + (path.endsWith("/") ? "" : "/") + file;
                await p.script.api._raw(`/_file${from}?move=${dropTargetId}`);
                f.selected.delete(file);
                p.render();
              }
            } else {
              await p.script.api._raw(
                `/_file${dragSourceId}?move=${dropTargetId}`
              );
            }
            await reloadFileTree(p);
          }
        }}
        render={(
          node,
          { depth, isOpen, onToggle, hasChild, isDragging, isDropTarget }
        ) => <TreeItem node={node} depth={depth} isDropTarget={isDropTarget} />}
      ></Tree>
    </DndProvider>
  );
};

const TreeItem: FC<{
  node: NodeModel<FEntry>;
  depth: number;
  isDropTarget: boolean;
}> = ({ node, depth, isDropTarget }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const path = node.id + "";
  const f = p.ui.popup.file;
  const local = useLocal({ renaming: node.text });
  const expanded = f.expanded[p.site.id]?.includes(path);

  return (
    <div
      className={cx(
        "flex items-center space-x-1 flex-nowrap hover:bg-blue-50 py-[2px]",
        isDropTarget && "bg-blue-500 text-white",
        css`
          padding-left: ${depth * 10 + 10}px;
        `,
        f.path === path && "border-r-2 bg-blue-100 border-r-blue-700"
      )}
      onClick={() => {
        f.selected.clear();
        f.path = path;
        p.render();
        if (!f.expanded[p.site.id].includes(path) || !f.entry[path]) {
          toggleDir(p, path, true);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!expanded) {
          toggleDir(p, path);
        }
        f.tree_ctx_path = path;
        f.tree_ctx_menu_event = e;
        p.render();
      }}
    >
      {f.tree_ctx_menu_event && (
        <Menu
          mouseEvent={f.tree_ctx_menu_event}
          onClose={() => {
            setTimeout(() => {
              f.tree_ctx_path = "";
              f.tree_ctx_menu_event = null;
              p.render();
            }, 100);
          }}
        >
          <MenuItem
            label={"New Folder"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              f.tree_ctx_menu_event = null;
              p.render();
              setTimeout(() => {
                f.tree.push({
                  id: f.tree_ctx_path + "/new_folder",
                  parent: f.tree_ctx_path,
                  text: "new_folder",
                  data: {
                    name: "new_folder",
                    type: "dir",
                    size: 0,
                  },
                });
                f.expanded[p.site.id]?.push(f.tree_ctx_path);
                p.render();
                f.path = f.tree_ctx_path + "/new_folder";
                f.tree_renaming = f.tree_ctx_path + "/new_folder";
                f.tree_ctx_path = "";
                p.render();
              });
            }}
          />
          <MenuItem
            label={"Rename"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              f.path = f.tree_ctx_path;
              f.tree_renaming = f.tree_ctx_path;
              p.render();
            }}
          />
          <MenuItem
            label={"Delete"}
            disabled={
              !(
                f.entry[f.tree_ctx_path] &&
                f.entry[f.tree_ctx_path]?.length === 0
              )
            }
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();

              if (
                !(
                  f.entry[f.tree_ctx_path] &&
                  f.entry[f.tree_ctx_path]?.length === 0
                )
              ) {
                alert("Can only delete empty folder!");
              } else {
                await p.script.api._raw(`/_file${f.tree_ctx_path}?del`);
                await reloadFileTree(p);
              }
            }}
          />
        </Menu>
      )}
      <div
        onClick={(e) => {
          e.stopPropagation();
          toggleDir(p, path);
        }}
      >
        {expanded || path === "/" ? <FolderOpen /> : <Folder />}
      </div>
      {f.tree_renaming === path ? (
        <input
          type="text"
          spellCheck={false}
          value={local.renaming}
          autoFocus
          onChange={(e) => {
            local.renaming = e.currentTarget.value.replace(/\W/gi, "_");
            local.render();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }
          }}
          onFocus={(e) => {
            e.currentTarget.select();
          }}
          onBlur={async () => {
            if (local.renaming !== node.text) {
              node.text = local.renaming;
              const res = await p.script.api._raw(
                `/_file${f.tree_renaming}?rename=${local.renaming}`
              );

              if (res && res.newname) {
                f.path = res.newname;
              }
              await reloadFileTree(p);
            }
            f.tree_renaming = "";
            p.render();
          }}
          className="flex-1 border border-blue-500 outline-none"
        />
      ) : (
        <div className="flex-1 text-ellipsis truncate">{node.text}</div>
      )}
    </div>
  );
};

const size = 14;

const FolderOpen = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeWidth="2"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M6 14l1.5-2.9A2 2 0 019.24 10H20a2 2 0 011.94 2.5l-1.54 6a2 2 0 01-1.95 1.5H4a2 2 0 01-2-2V5a2 2 0 012-2h3.9a2 2 0 011.69.9l.81 1.2a2 2 0 001.67.9H18a2 2 0 012 2v2"></path>
  </svg>
);

export const Folder = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    strokeWidth="2"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M20 20a2 2 0 002-2V8a2 2 0 00-2-2h-7.9a2 2 0 01-1.69-.9L9.6 3.9A2 2 0 007.93 3H4a2 2 0 00-2 2v13a2 2 0 002 2z"></path>
  </svg>
);

const toggleDir = (p: PG, path: string, forceExpand?: boolean) => {
  if (path === "/") return;
  let expanded = p.ui.popup.file.expanded[p.site.id];

  if (expanded) {
    if (expanded.includes(path) && !forceExpand) {
      p.ui.popup.file.expanded[p.site.id] = expanded.filter((e) => e !== path);
      refreshTree(p);
    } else {
      p.ui.popup.file.expanded[p.site.id] = [...expanded, path];
    }
  }

  localStorage.setItem(
    "panel-file-expanded",
    JSON.stringify(p.ui.popup.file.expanded)
  );
  reloadFileTree(p);
};

export const reloadFileTree = async (p: PG) => {
  const exp = p.ui.popup.file.expanded[p.site.id];

  const e = await p.script.api._raw(`/_file/?dir`);
  if (Array.isArray(e)) {
    p.ui.popup.file.entry = { "/": e };
  }

  if (exp) {
    const promises: Promise<any>[] = [];
    const added = new Set<string>();
    const fetched = new Set<string>();
    for (const e of exp.sort((a, b) => a.length - b.length)) {
      if (e) {
        if (!p.ui.popup.file.entry[e]) {
          let exists = false;

          if (e.split("/").length <= 2) {
            added.add(e);
            exists = true;
          } else {
            for (const a of added) {
              if (e.startsWith(a)) {
                exists = true;
                break;
              }
            }
          }

          if (exists) {
            const url = `/_file${e}/?dir`;
            if (!fetched.has(url)) {
              fetched.add(url);
              promises.push(
                p.script.api._raw(url).then((fe: FEntry[]) => {
                  if (Array.isArray(fe)) {
                    p.ui.popup.file.entry[e] = fe;
                  } else {
                    p.ui.popup.file.expanded[p.site.id] = exp.filter(
                      (item) => item !== e
                    );
                  }
                })
              );
            }
          }
        }
      }
    }
    await Promise.all(promises);
    localStorage.setItem(
      "panel-file-expanded",
      JSON.stringify(p.ui.popup.file.expanded)
    );
  }

  const f = p.ui.popup.file;
  if (!f.entry[f.path]) {
    p.script.api._raw(`/_file${f.path}/?dir`).then((fe: FEntry[]) => {
      if (Array.isArray(fe)) {
        f.entry[f.path] = fe;
        p.render();
      }
    });
  }

  refreshTree(p);
};

const refreshTree = (p: PG) => {
  const exp = p.ui.popup.file.expanded[p.site.id];
  for (const [k, v] of Object.entries(p.ui.popup.file.entry)) {
    if (
      p.ui.popup.file.entry[k] &&
      !exp.includes(k) &&
      k !== "/" &&
      k !== p.ui.popup.file.path
    ) {
      delete p.ui.popup.file.entry[k];
    }
  }

  const tree: NodeModel<FEntry>[] = p.ui.popup.file.tree;
  tree.length = 0;
  tree.push({ id: "/", text: "/", parent: "" });
  const added = new Set<string>(["/"]);
  for (const [path, entries] of Object.entries(p.ui.popup.file.entry)) {
    const arr = path.split("/");
    for (const e of entries) {
      let id = path + (path.endsWith("/") ? "" : "/") + e.name;
      if (!id.startsWith("/")) id = "/" + id;

      if (e.type === "dir" && !added.has(id)) {
        tree.push({
          id,
          text: e.name,
          parent: path || "/",
        });
      }
    }
  }
  p.ui.popup.file.tree = tree.sort(
    (a, b) => (a.id + "").length - (b.id + "").length
  );
  p.render();
};
