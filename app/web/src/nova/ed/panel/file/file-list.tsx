import {
  Tree as DNDTree,
  MultiBackend,
  NodeModel,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { FC, useCallback, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal, PG } from "../../logic/ed-global";
import { FEntry } from "./type";
import { Menu, MenuItem } from "../../../../utils/ui/context-menu";

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

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.shiftKey || e.ctrlKey || e.metaKey) {
      local.multi = true;
      local.render();
    }

    if (e.altKey) {
      local.inverse = true;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
      f.selected.clear();
      for (const item of tree) {
        if (item.data) f.selected.add(item.data.name);
      }
      local.render();
    }
  }, []);
  const onKeyUp = useCallback(() => {
    local.multi = false;
    local.inverse = false;
    local.render();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const tree: NodeModel<FEntry>[] = (f.entry[f.path] || [])
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
          <MenuItem
            label={"Rename"}
            disabled={f.selected.size === 0}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
          <MenuItem
            label={"Delete"}
            disabled={f.selected.size === 0}
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();

              if (confirm("Delete this file ?")) {
                await p.script.api._raw(`/_file${f.path}?del`);
              }
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
              f.selected.clear();
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
                  local.multi = false;
                  setTimeout(() => {
                    local.square.started = false;
                    local.render();
                  });
                };
                window.addEventListener("pointerup", local.square.up);
              }
            }

            local.render();
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
            local.render();
          }
        }}
        onPointerUp={() => {
          sq.item_drag = false;
          if (!sq.disabled && sq.started) {
            sq.started = false;
          }
          local.render();
        }}
      >
        <div
          ref={(el) => {
            if (el) {
              if (el) local.square.el = el;
            }
          }}
          className={cx(
            "bg-blue-200 border border-blue-500 absolute z-10 bg-opacity-30 transition-opacity pointer-events-none",
            css`
              left: ${sq.box.x}px;
              top: ${sq.box.y}px;
              width: ${sq.box.w}px;
              height: ${sq.box.h}px;
            `,
            sq.started ? "opacity-100" : "opacity-0"
          )}
        ></div>

        <div
          className={cx(
            "absolute inset-0 flex flex-wrap items-start content-start",
            css`
              ul {
                display: flex;
                flex: 1;
                flex-wrap: wrap;
              }
            `
          )}
          onPointerDown={() => {
            if (!sq.disabled) {
              f.selected.clear();
              local.render();
            }
          }}
        >
          {/* <div className="absolute left-0 top-0 z-100 bg-white">
            {JSON.stringify([...f.selected])}
            {JSON.stringify(sq.item_drag)}
          </div> */}
          <DndProvider backend={MultiBackend} options={getBackendOptions()}>
            <Tree
              tree={tree}
              dragPreviewRender={() => <></>}
              rootId=""
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
                            sq.start.y = el.scrollTop + e.clientY - container.y;
                            sq.box = { x: 0, y: 0, w: 0, h: 0 };
                            local.render();
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
                local.render();
              }}
              onDragEnd={() => {
                sq.item_drag = false;
                local.render();
              }}
            />
          </DndProvider>
        </div>
      </div>
    </>
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
        "flex items-stretch flex-col p-1 border-2 select-none",
        css`
          width: 100px;
          height: 100%;
        `,
        f.selected.has(e.name)
          ? "bg-blue-100  border-blue-600"
          : "border-transparent"
      )}
      onPointerDown={(ev) => {
        if (f.selected.has(e.name)) {
          local.square.disabled = true;
          local.render();
          return;
        }
        if (!local.square.item_drag) {
          ev.stopPropagation();
          ev.preventDefault();
          onSquare(ev);
        }
        if (!local.square.started && f.selected.size <= 1) {
          local.square.disabled = true;
          f.selected.clear();
          f.selected.add(e.name);
          local.render();
        }
      }}
      onPointerUp={(ev) => {
        local.square.item_drag = false;
        if (local.square.disabled) {
          ev.stopPropagation();
          local.square.disabled = false;
          local.render();
        } else {
          setTimeout(() => {
            if (
              local.square.box.w < 10 &&
              local.square.box.h < 10 &&
              !f.selected.has(e.name)
            ) {
              f.selected.clear();
              f.selected.add(e.name);
              local.render();
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
          f.selected.has(e.name) && "border-blue-300"
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
                src={p.script.api._url(`/_img/${f.path}/${e.name}?w=100`)}
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

const isImage = (ext: string) => {
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
