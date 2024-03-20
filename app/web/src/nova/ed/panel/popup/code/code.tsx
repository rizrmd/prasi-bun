import { useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { isLocalhost } from "../../../../../utils/ui/is-localhost";
import { Loading } from "../../../../../utils/ui/loading";
import { Modal } from "../../../../../utils/ui/modal";
import { Tooltip } from "../../../../../utils/ui/tooltip";
import { EDGlobal } from "../../../logic/ed-global";
import {
  iconDownload,
  iconNewTab,
  iconScrollOff,
  iconScrollOn,
  iconUpload,
} from "./icons";

export const code = {
  mode: "" as "" | "old" | "new",
};

export const EdPopCode = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  useEffect(() => {
    (async () => {
      if (code.mode === "new") {
        p.ui.popup.code.init = true;
      }
    })();
  }, [p.ui.popup.code.open]);

  useEffect(() => {
    if (code.mode === "" && p.site.id) {
      if (localStorage.vsc_opened === "yes") {
        localStorage.removeItem("vsc_opened");
        p.ui.popup.code.open = true;
      }

      p.render();
    }
  }, [p.site.id]);

  if (p.ui.popup.code.startup_status === "init" && p.sync?.code.action) {
    p.ui.popup.code.startup_status = "loading";
    p.sync.code
      .action({ type: "startup-check", site_id: p.site.id })
      .then((res) => {
        if (res) {
          if (res.type === "startup-check") {
            p.ui.popup.code.startup_status = res.status;
            p.render();
          }
        }
      });
  }

  return (
    <Modal
      fade={false}
      open={p.ui.popup.code.open}
      onOpenChange={(open) => {
        localStorage.removeItem("vsc_opened");

        if (!open) {
          p.ui.popup.code.startup_status = "init";
          p.ui.popup.code.open = false;
          p.render();
        }
      }}
    >
      <div
        className={cx("bg-white select-none fixed inset-[50px] bottom-0 flex")}
      >
        <CodeBody />
      </div>
    </Modal>
  );
};

const CodeBody = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    namePicker: false,
    codeAssign: false,
  });

  const vscode_url = isLocalhost()
    ? "http://localhost:3000?"
    : "https://prasi-vsc.avolut.com/?tkn=prasi&";

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="border-b flex justify-between h-[40px] items-stretch">
        <div className="flex items-stretch">
          {p.ui.popup.code.startup_status !== "disabled" && (
            <Tooltip
              content={`Startup Script: ${p.ui.popup.code.startup_status}`}
              className={cx("flex items-stretch relative border-r ")}
              delay={0}
              placement="bottom"
            >
              {["loading", "init"].includes(p.ui.popup.code.startup_status) ? (
                <div
                  className={cx(
                    "flex text-center items-center hover:bg-blue-50 cursor-pointer px-2 transition-all"
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-hourglass"
                  >
                    <path d="M5 22h14" />
                    <path d="M5 2h14" />
                    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
                    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
                  </svg>
                </div>
              ) : (
                <div
                  className={cx(
                    "flex text-center items-center hover:bg-blue-50 cursor-pointer px-2 transition-all",
                    p.ui.popup.code.startup_status === "running"
                      ? "border-b-2 border-b-green-700 bg-green-50"
                      : "border-b-2 border-b-transparent"
                  )}
                  dangerouslySetInnerHTML={{
                    __html: p.ui.popup.code.startup_status
                      ? iconScrollOn
                      : iconScrollOff,
                  }}
                  onClick={() => {
                    if (
                      p.ui.popup.code.startup_status === "stopped" &&
                      p.sync
                    ) {
                      p.ui.popup.code.startup_status = "loading";
                      p.render();
                      p.sync.code
                        .action({ type: "startup-run", site_id: p.site.id })
                        .then(() => {
                          p.sync?.code
                            .action({
                              type: "startup-check",
                              site_id: p.site.id,
                            })
                            .then((res) => {
                              if (res) {
                                if (res.type === "startup-check") {
                                  p.ui.popup.code.startup_status = res.status;
                                  p.render();
                                }
                              }
                            });
                        });
                    } else {
                      p.ui.popup.code.startup_status = "loading";
                      p.render();
                      p.sync?.code
                        .action({ type: "startup-stop", site_id: p.site.id })
                        .then(() => {
                          p.sync?.code
                            .action({
                              type: "startup-check",
                              site_id: p.site.id,
                            })
                            .then((res) => {
                              if (res) {
                                if (res.type === "startup-check") {
                                  p.ui.popup.code.startup_status = res.status;
                                  p.render();
                                }
                              }
                            });
                        });
                    }
                  }}
                ></div>
              )}
            </Tooltip>
          )}

          <Tooltip
            content={`Upload zip, will overwrite files.`}
            className={cx(
              "flex items-stretch relative cursor-pointer hover:bg-blue-50 "
            )}
            delay={0}
            placement="bottom"
          >
            <input
              type="file"
              className="w-full h-full absolute inset-0 opacity-0 cursor-pointer text-[0px]"
            ></input>
            <div
              className={cx(
                "border-r flex text-center items-center cursor-pointer px-2 transition-all pointer-events-none"
              )}
              dangerouslySetInnerHTML={{
                __html: iconUpload,
              }}
            ></div>
          </Tooltip>

          <Tooltip
            content={`Download zip, excluding node_modules.`}
            className={cx(
              "flex items-stretch relative cursor-pointer hover:bg-blue-50 "
            )}
            delay={0}
            placement="bottom"
          >
            <div
              className={cx(
                "border-r flex text-center items-center cursor-pointer px-2 transition-all cursor-pointer"
              )}
              dangerouslySetInnerHTML={{
                __html: iconDownload,
              }}
            ></div>
          </Tooltip>

          <Tooltip
            content="Open in new tab"
            delay={0}
            placement="bottom"
            className={cx("flex items-stretch relative")}
            onClick={() => {
              window.open(`${vscode_url}folder=/site/${p.site.id}/site/src`);
            }}
          >
            <div
              className={cx(
                "border-r flex text-center items-center hover:bg-blue-50 cursor-pointer px-2 transition-all",
                "border-b-2 border-b-transparent"
              )}
              dangerouslySetInnerHTML={{ __html: iconNewTab }}
            ></div>
          </Tooltip>
        </div>
      </div>
      {p.ui.popup.code.show_log && (
        <div className="h-[150px] overflow-auto font-mono p-2 text-xs whitespace-pre-wrap border-b">
          <div>{p.ui.popup.code.log || "stdout is empty..."}</div>
        </div>
      )}

      <div className="flex flex-1 relative">
        {!p.ui.popup.code.open ? (
          <Loading backdrop={false} />
        ) : (
          <>
            <iframe
              className="flex flex-1 absolute inset-0 w-full h-full z-10"
              src={`${vscode_url}folder=/site/${p.site.id}/site/src`}
            ></iframe>
            <div className="flex flex-1 absolute inset-0 z-0 items-center justify-center">
              Loading VSCode...
            </div>
          </>
        )}
      </div>

      {(local.namePicker || local.codeAssign) && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => {
            local.namePicker = false;
            local.codeAssign = false;
            local.render();
          }}
        ></div>
      )}
    </div>
  );
};
