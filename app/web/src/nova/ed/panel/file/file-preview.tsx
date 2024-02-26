import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../logic/ed-global";
import { isImage } from "./file-list";
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
            href={p.script.api._url(
              `/_file${
                f.path.startsWith("/") ? f.path : `/${f.path}`
              }/${first?.name}`
            )}
            target="_blank"
          >
            {!local.no_image ? (
              <>
                {isImage(ext) ? (
                  <img
                    draggable={false}
                    className="absolute inset-0 w-full h-full"
                    src={p.script.api._url(
                      `/_img${
                        f.path.startsWith("/") ? f.path : `/${f.path}`
                      }/${first?.name}?w=500&f=jpg`
                    )}
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
            <div>{first?.name}</div>
            <div>{fileSize(first?.size || 0)}</div>
          </div>
          <input
            type="text"
            className="p-2 border-b flex justify-between"
            value={p.script.api._url(
              `/_file${
                f.path.startsWith("/") ? f.path : `/${f.path}`
              }/${first?.name}`,
              false
            )}
            readOnly
            onFocus={(e) => {
              e.currentTarget.select();
            }}
          />
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
