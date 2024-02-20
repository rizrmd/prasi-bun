import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useGlobal, useLocal } from "web-utils";
import { apiProxy } from "../../../../base/load/api/api-proxy";
import { Modal } from "../../../../utils/ui/modal";
import { EDGlobal } from "../../logic/ed-global";
import { EdFileTree } from "./file-tree";
import { FEntry } from "./type";

export const EdFileBrowser = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    entry: {} as Record<string, FEntry[]>,
  });

  useEffect(() => {
    if (!p.script.api && p.site.config?.api_url) {
      p.script.api = apiProxy(p.site.config.api_url);
      p.render();
    }

    p.script.api._raw(`/_file/?dir`).then((e: FEntry[]) => {
      if (Array.isArray(e)) {
        local.entry = { "/": e };
        p.ui.popup.file.enabled = true;
        p.render();
      }
    });
  }, []);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  if (!p.ui.popup.file.enabled) return null;

  return (
    <>
      <div
        className="items-center flex px-2 cursor-pointer border border-transparent hover:bg-slate-200 transition-all hover:border-black"
        onClick={() => {
          p.ui.popup.file.open = true;
          p.render();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M20 10a1 1 0 001-1V6a1 1 0 00-1-1h-2.5a1 1 0 01-.8-.4l-.9-1.2A1 1 0 0015 3h-2a1 1 0 00-1 1v5a1 1 0 001 1zM20 21a1 1 0 001-1v-3a1 1 0 00-1-1h-2.9a1 1 0 01-.88-.55l-.42-.85a1 1 0 00-.92-.6H13a1 1 0 00-1 1v5a1 1 0 001 1zM3 5a2 2 0 002 2h3"></path>
          <path d="M3 3v13a2 2 0 002 2h3"></path>
        </svg>{" "}
        <div className="pl-1">Files</div>
      </div>

      <Modal
        fade={false}
        open={p.ui.popup.file.open}
        onOpenChange={(open) => {
          if (!open) {
            p.ui.popup.file.open = false;
            p.render();
          }
        }}
      >
        <div
          {...getRootProps()}
          className={cx(
            "bg-white select-none fixed inset-[50px] flex",
            css`
              outline: none;
            `
          )}
        >
          <input {...getInputProps()} />
          {isDragActive && (
            <div className="absolute inset-0 flex items-center justify-center flex-col bg-blue-50 border-4 border-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="lucide lucide-upload"
                viewBox="0 0 24 24"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                <path d="M17 8L12 3 7 8"></path>
                <path d="M12 3L12 15"></path>
              </svg>
              <div>Drag Here to Upload</div>
            </div>
          )}

          <div className="flex flex-1 items-stretch">
            <div className="flex min-w-[200px] border-r">
              <EdFileTree entry={local.entry} />
            </div>
            <div>Moko</div>
          </div>
        </div>
      </Modal>
    </>
  );
};
