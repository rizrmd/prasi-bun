import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useGlobal, waitUntil } from "web-utils";
import { apiProxy } from "../../../../base/load/api/api-proxy";
import { Modal } from "../../../../utils/ui/modal";
import { EDGlobal } from "../../logic/ed-global";
import { EdFileList } from "./file-list";
import { EdFileTop } from "./file-top";
import { EdFileTree, reloadFileTree } from "./file-tree";
import { uploadFile } from "./file-upload";
import { FEntry } from "./type";
import { EdFilePreview } from "./file-preview";
import { w } from "../../../../utils/types/general";

export const EdFileBrowser = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const f = p.ui.popup.file;
  useEffect(() => {
    (async () => {
      if (!p.script.api && p.site.config?.api_url) {
        p.script.api = apiProxy(p.site.config.api_url);
        p.render();
      }

      if (!p.script.api) return () => {};

      p.script.api._raw(`/_file/?dir`).then((e: FEntry[]) => {
        if (Array.isArray(e)) {
          f.entry = { "/": e };

          if (f.open) {
            reloadFileTree(p);
          }
          f.enabled = true;
          if (!f.action) {
            f.action = {
              label: "Insert as <img>",
              submit: () => {},
            };
          }
          p.render();
        }
      });
    })();
  }, [p.site]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => uploadFile(p, files),
    noClick: true,
  });

  if (!f.enabled) return null;

  return (
    <>
      <div
        className="items-center flex px-2 cursor-pointer border border-transparent hover:bg-slate-200 transition-all hover:border-black"
        onClick={() => {
          f.open = true;
          p.render();
          reloadFileTree(p);
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
        open={f.open}
        onOpenChange={(open) => {
          if (!open) {
            f.open = false;
            p.render();
          }
        }}
      >
        <div className={cx("bg-white select-none fixed inset-[50px] flex")}>
          <PanelGroup direction="horizontal" className="text-sm">
            <Panel
              defaultSize={parseInt(
                localStorage.getItem("panel-file-left") || "18"
              )}
              minSize={8}
              order={1}
              className="border-r"
              onResize={(e) => {
                localStorage.setItem("panel-file-left", e + "");
              }}
              onContextMenu={(e) => {
                e.preventDefault();
              }}
            >
              <EdFileTree />
            </Panel>
            <PanelResizeHandle />
            <Panel order={2}>
              <div className="flex-1 flex h-full flex-col">
                <EdFileTop />
                <PanelGroup direction="horizontal">
                  <Panel order={1}>
                    {f.upload.started ? (
                      <div className="flex flex-col items-center justify-center flex-1 h-full">
                        <div
                          className={cx(
                            "flex flex-col items-stretch min-w-[30%]"
                          )}
                        >
                          <div className="border-b pb-2">
                            Uploading {Object.keys(f.upload.progress).length}{" "}
                            files
                          </div>
                          {Object.entries(f.upload.progress).map(
                            ([name, progress]) => {
                              return (
                                <div
                                  className="flex justify-between border-b p-1"
                                  key={name}
                                >
                                  <div>{name}</div>
                                  <div>{Math.round(progress * 100)}%</div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    ) : (
                      <div
                        className={cx(
                          "flex-1 flex h-full outline-none relative"
                        )}
                        {...getRootProps()}
                      >
                        <EdFileList />
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
                      </div>
                    )}
                  </Panel>
                  {f.preview && (
                    <>
                      <PanelResizeHandle
                        className={cx(
                          "border-r",
                          css`
                            width: 5px;
                          `
                        )}
                      />
                      <Panel
                        order={2}
                        onResize={(e) => {
                          localStorage.setItem("panel-file-right", e + "");
                        }}
                        defaultSize={parseInt(
                          localStorage.getItem("panel-file-right") || "18"
                        )}
                        className="flex items-center justify-center"
                        minSize={12}
                      >
                        <EdFilePreview />
                      </Panel>
                    </>
                  )}
                </PanelGroup>
              </div>
            </Panel>
          </PanelGroup>
        </div>
      </Modal>
    </>
  );
};
