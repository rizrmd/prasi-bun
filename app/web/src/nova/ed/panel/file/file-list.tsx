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

const Tree = DNDTree<FEntry>;

export const EdFileList = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const f = p.ui.popup.file;
  const list = f.entry[f.path] || [];
  const local = useLocal({
    multi: false,
    square: {
      started: false,
      start: { x: 0, y: 0 },
      cur: { x: 0, y: 0 },
      box: { x: 0, y: 0, w: 0, h: 0 },
    },
  });

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.shiftKey || e.ctrlKey || e.metaKey) {
      local.multi = true;
      local.render();
    }
  }, []);
  const onKeyUp = useCallback(() => {
    local.multi = false;
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
    <div
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

          local.render();
        }
      }}
      onPointerDown={(e) => {
        const el = e.currentTarget;
        const box = el.getBoundingClientRect();
        sq.started = true;
        sq.start.x = e.clientX - box.x;
        sq.start.y = el.scrollTop + e.clientY - box.y;
        sq.box = { x: 0, y: 0, w: 0, h: 0 };
        local.render();
      }}
      onPointerUp={() => {
        sq.started = false;
        local.render();
      }}
    >
      <div
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
        onClick={() => {
          f.selected.clear();
          local.render();
        }}
      >
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
          <Tree
            tree={tree}
            dragPreviewRender={() => <></>}
            rootId=""
            onDrop={() => {}}
            render={(node, {}) => {
              if (node.data) {
                return <FileItem p={p} e={node.data} local={local} />;
              }
              return <></>;
            }}
            onDragStart={() => {
              local.square.started = false;
              local.render();
            }}
          />
        </DndProvider>
      </div>
    </div>
  );
};

const FileItem: FC<{
  p: PG;
  e: FEntry;
  local: { multi: boolean; render: () => void };
}> = ({ e, local, p }) => {
  const f = p.ui.popup.file;
  const ext = e.name.split(".").pop() || "";
  const item = useLocal({ no_image: false });
  return (
    <div
      key={e.name}
      className={cx(
        "flex items-stretch flex-col p-1 m-2 border-2",
        css`
          width: 100px;
        `,
        f.selected.has(e.name)
          ? "bg-blue-100  border-blue-600"
          : "border-transparent"
      )}
      onClick={(ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        if (!local.multi) {
          f.selected.clear();
        }
        if (!f.selected.has(e.name)) {
          f.selected.add(e.name);
        } else {
          f.selected.delete(e.name);
        }
        local.render();
      }}
    >
      <div
        className={cx(
          "flex items-center justify-center flex-1 border",
          css`
            min-height: 80px;
          `
        )}
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
