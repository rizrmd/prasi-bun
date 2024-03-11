import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../logic/ed-global";
import { isImage, join } from "./file-list";
import { reloadFileTree } from "./file-tree";
import { FEntry } from "./type";

export const EdFilePreview = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const f = p.ui.popup.file;
  const local = useLocal({ no_image: false });
  const file_by_ext: Record<string, string[]> = {};
  let ext = "";
  let first = undefined as FEntry | undefined;
  const tree = f.entry[f.path];
  for (const file of f.selected) {
    if (!tree) break;
    const node = tree.find((e) => e.name === file);

    if (node) {
      if (node.type === "file") {
        const f_ext = file.split(".").pop() || "";
        if (f_ext) {
          if (!ext) {
            ext = f_ext;
            first = f.entry[f.path]?.find((e) => e.name === file);
          }
          if (!file_by_ext[f_ext]) file_by_ext[f_ext] = [];

          file_by_ext[f_ext].push(file);
        }
      } else {
        if (!file_by_ext["folder"]) {
          file_by_ext["folder"] = [];
        }
        file_by_ext["folder"].push(file);
      }
    }
  }

  const fname = first?.name || "";
  const dname =
    f.path.startsWith("/") || !f.path.trim() ? f.path : `/${f.path}`;
  const pathname = `/_file${dname}${dname === "/" ? fname : `/${fname}`}`;

  return (
    <>
      {f.selected.size === 0 && (
        <div className="flex flex-1 flex-col items-center">
          Select File
          <br />
          to Preview
        </div>
      )}
      {f.selected.size === 1 && (
        <div className="flex flex-col items-stretch justify-start flex-1 h-full">
          <a
            className={cx(
              "border-b flex items-center justify-center relative overflow-auto",
              css`
                height: 50%;
                img {
                  object-fit: cover;
                  object-position: center top;
                }
              `
            )}
            href={p.script.api._url(pathname)}
            target="_blank"
          >
            {!local.no_image ? (
              <>
                {isImage(ext) ? (
                  <img
                    draggable={false}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    src={p.script.api._url(pathname + '?w=500')}
                    alt={" thumbnail (500px)"}
                    onError={() => {
                      local.no_image = true;
                      local.render();
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
          </a>
          <div className="p-2 border-b flex justify-between">
            <div
              className="cursor-pointer hover:text-blue-500 hover:underline"
              onClick={() => {
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
            >
              {first?.name}
            </div>
            <div>{fileSize(first?.size || 0)}</div>
          </div>
          <label className="flex items-stretch border-b">
            <div className="flex items-center border-r px-1">Code</div>
            <input
              type="text"
              className="p-2 flex justify-between font-mono text-xs flex-1"
              value={`siteurl("${pathname}")`}
              readOnly
              onFocus={(e) => {
                e.currentTarget.select();
              }}
            />
          </label>

          {f.picker.on_pick && (
            <div className="flex items-center justify-center p-3">
              {!f.picker.multi && f.selected.size === 1 && (
                <div
                  className="bg-blue-600 rounded-sm text-white px-4 py-2 cursor-pointer"
                  onClick={() => {
                    if (typeof f.picker.on_pick === "function") {
                      f.picker.on_pick(pathname);
                      f.open = false;
                      f.picker.on_pick = false;
                      p.render();
                    }
                  }}
                >
                  Select File
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {f.selected.size > 1 && (
        <div className="flex flex-col items-stretch flex-1">
          <div className="pl-1">{f.selected.size} files selected:</div>
          <div className="flex flex-col border-t">
            {Object.entries(file_by_ext).map(([ext, file]) => {
              return (
                <div className="flex items-stretch border-b px-3" key={ext}>
                  <div className="min-w-[60px] border-r uppercase font-bold text-xs text-slate-600 flex items-center">
                    {ext}
                  </div>
                  <div className="flex-1 pl-1 items-center">
                    {file.length} file{file.length <= 1 ? "" : "s"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

function fileSize(bytes: number): string {
  const sizes = ["bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 bytes";

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = i === 0 ? bytes : (bytes / Math.pow(1024, i)).toFixed(2);

  return `${size} ${sizes[i]}`;
}
