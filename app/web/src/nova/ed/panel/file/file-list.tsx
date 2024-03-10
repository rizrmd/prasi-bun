import {
  Tree as DNDTree,
  MultiBackend,
  NodeModel,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { FC, useCallback, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { useGlobal, useLocal } from "web-utils";
import { Menu, MenuItem } from "../../../../utils/ui/context-menu";
import { EDGlobal, PG } from "../../logic/ed-global";
import { FEntry } from "./type";
import { Folder, reloadFileTree } from "./file-tree";

const Tree = DNDTree<FEntry>;

export const EdFileList = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const f = p.ui.popup.file;
  const local = useLocal({
    multi: false,
    inverse: false,
    els: {} as Record<string, HTMLDivElement>,
    square: {
      el: null as null | HTMLDivElement,
      started: false,
      disabled: false,
      item_drag: false,
      start: { x: 0, y: 0 },
      cur: { x: 0, y: 0 },
      box: { x: 0, y: 0, w: 0, h: 0 },
      up: null as any,
    },
    container: null as null | HTMLDivElement,
  });

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        local.multi = true;
        p.render();
      }

      if (e.altKey) {
        local.inverse = true;
        local.multi = true;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
        if (document.activeElement?.tagName.toLowerCase() !== "input") {
          f.selected.clear();
          const tree = f.entry[f.path];
          if (tree) {
            for (const item of tree) {
              if (item.name) f.selected.add(item.name);
            }
          }
          p.render();
        }
      }
    },
    [f.entry[f.path]]
  );

  const onKeyUp = useCallback(() => {
    local.multi = false;
    local.inverse = false;
    p.render();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const folder_tree: NodeModel<FEntry>[] = (f.entry[f.path] || [])
    .filter((e) => e.type === "dir")
    .map((e) => {
      return { id: e.name, parent: "", text: e.name, data: e };
    });

  const file_tree: NodeModel<FEntry>[] = (f.entry[f.path] || [])
    .filter((e) => e.type === "file")
    .map((e) => {
      return { id: e.name, parent: "", text: e.name, data: e };
    });

  const sq = local.square;
  return (
    <>
      {f.file_ctx_menu_event && (
        <Menu
          mouseEvent={f.file_ctx_menu_event}
          onClose={() => {
            setTimeout(() => {
              f.file_ctx_menu_event = null;
              p.render();
            }, 100);
          }}
        >
          {f.selected.size === 0 && (
            <MenuItem
              label={"New Folder"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                f.file_ctx_menu_event = null;
                p.render();
                setTimeout(async () => {
                  const new_folder = prompt("New Folder:");
                  if (new_folder) {
                    await p.script.api._raw(
                      `/_file/${join(
                        f.path,
                        "new_folder"
                      )}?rename=${new_folder}`
                    );

                    await reloadFileTree(p);
                  }
                }, 100);
              }}
            />
          )}
          <MenuItem
            label={"Rename"}
            disabled={f.selected.size !== 1}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              f.file_ctx_menu_event = null;
              p.render();
              setTimeout(async () => {
                const selected = [...f.selected];
                const rename_to = prompt("Rename to:", selected[0]);

                if (rename_to) {
                  await p.script.api._raw(
                    `/_file${join(f.path, selected[0])}?rename=${rename_to}`
                  );

                  reloadFileTree(p);
                }
              }, 100);
            }}
          />
          <MenuItem
            label={"Delete"}
            disabled={f.selected.size === 0}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              f.file_ctx_menu_event = null;
              p.render();
              setTimeout(async () => {
                const selected = [...f.selected].map((e) =>
                  f.path.endsWith("/") ? e : "/" + e
                );
                if (f.selected.size === 1) {
                  if (confirm("Delete this file ?")) {
                    await p.script.api._raw(
                      `/_file${join(f.path, selected[0])}?del`
                    );
                  }
                } else {
                  if (confirm(`Delete ${f.selected.size} files?`)) {
                    for (const s of selected) {
                      await p.script.api._raw(`/_file${join(f.path, s)}?del`);
                    }
                  }
                }
                reloadFileTree(p);
              }, 100);
            }}
          />
        </Menu>
      )}
      <div
        ref={(el) => {
          if (el) local.container = el;
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          f.file_ctx_menu_event = e;
          p.render();
        }}
        className="flex-1 select-none relative overflow-y-auto"
        onPointerMove={(e) => {
          const el = e.currentTarget;
          if (sq.started) {
            const box = el.getBoundingClientRect();
            sq.cur.x = e.clientX - box.x;
            sq.cur.y = e.clientY + el.scrollTop - box.y;

            if (sq.start.x < sq.cur.x) {
              sq.box.x = sq.start.x;
              sq.box.w = sq.cur.x - sq.start.x;
            } else {
              sq.box.x = sq.cur.x;
              sq.box.w = sq.start.x - sq.cur.x;
            }

            if (sq.start.y < sq.cur.y) {
              sq.box.y = sq.start.y;
              sq.box.h = sq.cur.y + -sq.start.y;
            } else {
              sq.box.y = sq.cur.y;
              sq.box.h = sq.start.y - sq.cur.y;
            }

            if (sq.cur.y - el.scrollTop > box.height * 0.8) {
              el.scrollTop += 5;
            } else if (sq.cur.y - el.scrollTop < 50) {
              el.scrollTop -= 5;
            }

            if (sq.el && sq.box.w > 5 && sq.box.h > 5) {
              if (!local.multi) {
                f.selected.clear();
              }
              for (const [name, el] of Object.entries(local.els)) {
                if (overlaps(sq.el, el)) {
                  if (!local.inverse) {
                    if (!f.selected.has(name)) f.selected.add(name);
                  } else {
                    if (f.selected.has(name)) f.selected.delete(name);
                  }
                }
              }

              if (!local.square.up) {
                local.square.up = () => {
                  window.removeEventListener("pointerup", local.square.up);
                  local.square.up = null;
                  setTimeout(() => {
                    local.square.started = false;
                    p.render();
                  });
                };
                window.addEventListener("pointerup", local.square.up);
              }
            }

            p.render();
          }
        }}
        onPointerDown={(e) => {
          if (!sq.disabled) {
            const el = e.currentTarget;
            const box = el.getBoundingClientRect();
            sq.started = true;
            sq.start.x = e.clientX - box.x;
            sq.start.y = el.scrollTop + e.clientY - box.y;
            sq.box = { x: 0, y: 0, w: 0, h: 0 };
            p.render();
          }
        }}
        onPointerUp={() => {
          sq.item_drag = false;
          if (!sq.disabled && sq.started) {
            sq.started = false;
          }
          p.render();
        }}
      >
        <div
          ref={(el) => {
            if (el) {
              if (el) local.square.el = el;
            }
          }}
          className={cx(
            "border absolute z-10 bg-opacity-30 transition-opacity pointer-events-none",
            css`
              left: ${sq.box.x}px;
              top: ${sq.box.y}px;
              width: ${sq.box.w}px;
              height: ${sq.box.h}px;
            `,
            sq.started ? "opacity-100" : "opacity-0",
            local.inverse
              ? "bg-orange-200 border-orange-500"
              : "bg-blue-200  border-blue-500"
          )}
        ></div>

        <div
          className={cx(
            "absolute inset-0 flex flex-col",
            css`
              ul {
                display: flex;
                flex: 1;
                flex-wrap: wrap;

                li {
                  margin-left: 5px;
                  margin-top: 5px;
                }
              }
            `
          )}
          onPointerDown={() => {
            if (!sq.disabled && !local.multi) {
              f.selected.clear();
              p.render();
            }
          }}
        >
          <div className="flex flex-wrap items-start content-start">
            <DndProvider backend={MultiBackend} options={getBackendOptions()}>
              <Tree
                tree={folder_tree}
                dragPreviewRender={() => <></>}
                rootId=""
                sort={false}
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
                onDrop={async (
                  newTree,
                  { dropTargetId, dragSourceId, dragSource }
                ) => {
                  if (dragSource) {
                    if (dragSource.data?.type === "file") {
                      const f = p.ui.popup.file;
                      const path = f.path;

                      for (const file of f.selected) {
                        const from =
                          path + (path.endsWith("/") ? "" : "/") + file;
                        await p.script.api._raw(
                          `/_file${from}?move=${dropTargetId}`
                        );
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
                render={(node, { isDropTarget }) => {
                  if (node.data) {
                    return (
                      <DirItem
                        p={p}
                        e={node.data}
                        local={local}
                        isDropTarget={isDropTarget}
                        onSquare={(e) => {
                          e.stopPropagation();
                          if (!sq.disabled) {
                            const el = e.currentTarget;
                            const container =
                              local.container?.getBoundingClientRect();
                            if (container) {
                              sq.started = true;
                              sq.start.x = e.clientX - container.x;
                              sq.start.y =
                                el.scrollTop + e.clientY - container.y;
                              sq.box = { x: 0, y: 0, w: 0, h: 0 };
                              p.render();
                            }
                          }
                        }}
                      />
                    );
                  }
                  return <></>;
                }}
                onDragStart={() => {
                  sq.started = false;
                  p.render();
                }}
                onDragEnd={() => {
                  sq.item_drag = false;
                  p.render();
                }}
              />
            </DndProvider>
          </div>
          <div className="flex flex-wrap items-start content-start">
            <DndProvider backend={MultiBackend} options={getBackendOptions()}>
              <Tree
                tree={file_tree}
                dragPreviewRender={() => <></>}
                rootId=""
                sort={false}
                onDrop={() => {}}
                render={(node, {}) => {
                  if (node.data) {
                    return (
                      <FileItem
                        p={p}
                        e={node.data}
                        local={local}
                        onSquare={(e) => {
                          e.stopPropagation();
                          if (!sq.disabled) {
                            const el = e.currentTarget;
                            const container =
                              local.container?.getBoundingClientRect();
                            if (container) {
                              sq.started = true;
                              sq.start.x = e.clientX - container.x;
                              sq.start.y =
                                el.scrollTop + e.clientY - container.y;
                              sq.box = { x: 0, y: 0, w: 0, h: 0 };
                              p.render();
                            }
                          }
                        }}
                      />
                    );
                  }
                  return <></>;
                }}
                onDragStart={() => {
                  sq.started = false;
                  p.render();
                }}
                onDragEnd={() => {
                  sq.item_drag = false;
                  p.render();
                }}
              />
            </DndProvider>
          </div>
        </div>
      </div>
    </>
  );
};

const DirItem: FC<{
  p: PG;
  e: FEntry;
  isDropTarget: boolean;
  local: {
    multi: boolean;
    render: () => void;
    square: {
      started: boolean;
      disabled: boolean;
      item_drag: boolean;
      box: any;
    };
    els: Record<string, HTMLDivElement>;
  };
  onSquare: (e: any) => void;
}> = ({ e, local, p, isDropTarget }) => {
  const f = p.ui.popup.file;
  useEffect(() => {
    return () => {
      if (local.els[e.name]) {
        delete local.els[e.name];
      }
    };
  }, []);

  return (
    <div
      key={e.name}
      ref={(el) => {
        if (el) local.els[e.name] = el;
      }}
      className={cx(
        "flex border py-[3px] px-2 select-none items-center cursor-pointer hover:bg-blue-100 hover:border-blue-600",
        isDropTarget && "bg-blue-500 text-white",
        css`
          width: 150px;
        `
      )}
      onPointerDown={(ev) => {
        f.selected.clear();
        f.path = f.path + (!f.path.endsWith("/") ? "/" : "") + e.name;
        reloadFileTree(p);
      }}
      onPointerUp={(ev) => {
        local.square.item_drag = false;
        if (local.square.disabled) {
          ev.stopPropagation();
          local.square.disabled = false;
          p.render();
        } else {
          setTimeout(() => {
            if (
              local.square.box.w < 10 &&
              local.square.box.h < 10 &&
              !f.selected.has(e.name)
            ) {
              if (!local.multi) {
                f.selected.clear();
              }
              f.selected.add(e.name);
              p.render();
            }
          });
        }
      }}
    >
      <Folder />
      <div className="pl-1">{e.name}</div>
    </div>
  );
};

const FileItem: FC<{
  p: PG;
  e: FEntry;
  local: {
    multi: boolean;
    render: () => void;
    square: {
      started: boolean;
      disabled: boolean;
      item_drag: boolean;
      box: any;
    };
    els: Record<string, HTMLDivElement>;
  };
  onSquare: (e: any) => void;
}> = ({ e, local, p, onSquare }) => {
  const f = p.ui.popup.file;
  const ext = e.name.split(".").pop() || "";
  const item = useLocal({ no_image: false });

  useEffect(() => {
    return () => {
      if (local.els[e.name]) {
        delete local.els[e.name];
      }
    };
  }, []);

  return (
    <div
      key={e.name}
      ref={(el) => {
        if (el) local.els[e.name] = el;
      }}
      className={cx(
        "flex items-stretch flex-col p-1 border select-none",
        css`
          width: 100px;
          height: 100%;
        `,
        f.selected.has(e.name) ? "bg-blue-100  border-blue-600" : ""
      )}
      onPointerDown={(ev) => {
        if (f.selected.has(e.name)) {
          local.square.disabled = true;
          p.render();
          return;
        }
        if (!local.square.item_drag) {
          ev.stopPropagation();
          ev.preventDefault();
          onSquare(ev);
        }
        if (!local.square.started && f.selected.size <= 1) {
          local.square.disabled = true;
          if (!local.multi) {
            f.selected.clear();
          }
          f.selected.add(e.name);
          p.render();
        }
      }}
      onPointerUp={(ev) => {
        local.square.item_drag = false;
        if (local.square.disabled) {
          ev.stopPropagation();
          local.square.disabled = false;
          p.render();
        } else {
          setTimeout(() => {
            if (
              local.square.box.w < 10 &&
              local.square.box.h < 10 &&
              !f.selected.has(e.name)
            ) {
              if (!local.multi) {
                f.selected.clear();
              }
              f.selected.add(e.name);
              p.render();
            }
          });
        }
      }}
    >
      <div
        className={cx(
          "flex items-center justify-center flex-1 border bg-white",
          css`
            min-height: 80px;
          `,
          f.selected.has(e.name) ? "border-blue-300" : "border-transparent"
        )}
        onPointerDown={() => {
          local.square.item_drag = true;
          item.render();
        }}
      >
        {!item.no_image ? (
          <>
            {isImage(ext) ? (
              <img
                draggable={false}
                src={p.script.api._url(
                  `/_img${f.path.startsWith("/") ? f.path : `/${f.path}`}/${
                    e.name
                  }?w=100`
                )}
                alt={e.name + " thumbnail (100px)"}
                onError={() => {
                  item.no_image = true;
                  item.render();
                }}
              />
            ) : (
              <div className="uppercase font-bold text-lg text-slate-300">
                {ext}
              </div>
            )}
          </>
        ) : (
          <div className="uppercase font-bold text-lg text-slate-300">
            NO IMG
          </div>
        )}
      </div>
      <div className="px-1 mt-2 text-ellipsis overflow-ellipsis whitespace-break-spaces break-words">
        {e.name.length > 25 ? e.name.substring(0, 25) + "..." : e.name}
      </div>
    </div>
  );
};

export const isImage = (ext: string) => {
  if (["gif", "jpeg", "jpg", "png", "svg", "webp"].includes(ext)) return true;
};
function overlaps(a: HTMLDivElement, b: HTMLDivElement) {
  const rect1 = a.getBoundingClientRect();
  const rect2 = b.getBoundingClientRect();
  const isInHoriztonalBounds =
    rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
  const isInVerticalBounds =
    rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
  const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
  return isOverlapping;
}

export const reloadFileList = async (p: PG) => {
  const f = p.ui.popup.file;
  const res = await p.script.api._raw(`/_file${f.path}?dir`);

  f.entry[f.path] = res;
  p.render();
};

export const join = (...arg: string[]) => {
  let arr: string[] = [];

  for (const s of arg) {
    s.split("/").forEach((e) => {
      arr.push(e);
    });
  }
  arr = arr.filter((e) => e);

  return "/" + arg.join("/");
};
