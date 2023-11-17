import { useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { isLocalhost } from "../../../../../utils/ui/is-localhost";
import { Loading } from "../../../../../utils/ui/loading";
import { Modal } from "../../../../../utils/ui/modal";
import { Tooltip } from "../../../../../utils/ui/tooltip";
import { EDGlobal } from "../../../logic/ed-global";
import { Popover } from "../../../../../utils/ui/popover";
import { iconChevronDown, iconGear, iconLoading, iconLog } from "./icons";
import { CodeNameList } from "./name-list";

export const EdPopCode = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({ namePicker: false });

  useEffect(() => {
    (async () => {
      if (!p.ui.popup.code.init) {
        const id_code = await p.sync.activity("site", {
          action: p.ui.popup.code.open ? "open" : "close",
          id: p.site.id,
          type: "code",
          name: p.ui.popup.code.name,
        });

        if (id_code) {
          p.ui.popup.code.id = id_code;
          p.render();
        }
      }
      p.ui.popup.code.init = true;
    })();
  }, [p.ui.popup.code.open]);

  const vscode_url = isLocalhost()
    ? "http://localhost:3000?"
    : "https://code.web.andromedia.co.id?tkn=prasi&";

  return (
    <Modal
      fade={false}
      open={p.ui.popup.code.open}
      onOpenChange={(open) => {
        if (!open) {
          p.ui.popup.code.open = false;
          p.render();
        }
      }}
    >
      <div className={cx("bg-white select-none fixed inset-[50px] bottom-0")}>
        <div className="relative w-full h-full flex flex-col">
          <div className="border-b flex h-[40px] items-stretch">
            <Popover
              placement="bottom"
              offset={0}
              arrow={false}
              backdrop={false}
              content={<CodeNameList />}
              popoverClassName="bg-white shadow-md"
              className={cx(
                "flex items-center px-2 w-[200px] hover:bg-blue-50  space-x-1",
                "cursor-pointer justify-between"
              )}
              open={local.namePicker}
              onOpenChange={(open) => {
                local.namePicker = open;
                local.render();
              }}
            >
              <div className="capitalize overflow-ellipsis flex-1 flex items-center">
                {p.ui.popup.code.name}
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: iconChevronDown,
                }}
              ></div>
            </Popover>

            {p.ui.popup.code.name !== "site" && (
              <div className="hover:bg-blue-100 flex items-center justify-center border w-[20px] h-[20px] flex">
                <div
                  dangerouslySetInnerHTML={{
                    __html: iconGear,
                  }}
                ></div>
              </div>
            )}
            <Tooltip
              content="stdout log"
              delay={0}
              placement="bottom"
              className="flex items-stretch relative border-l"
              onClick={() => {
                p.ui.popup.code.show_log = !p.ui.popup.code.show_log;
                p.render();
              }}
            >
              {p.ui.popup.code.show_log && (
                <div className="absolute bottom-[-4px] left-0 right-[1px] h-[5px] bg-white"></div>
              )}
              <div
                className={cx(
                  "border-r flex text-center items-center hover:bg-blue-50 cursor-pointer px-2 transition-all",
                  p.ui.popup.code.loading
                    ? "border-b-2 border-b-orange-400"
                    : "border-b-2 border-b-transparent"
                )}
                dangerouslySetInnerHTML={{
                  __html: p.ui.popup.code.loading ? iconLog : iconLoading,
                }}
              ></div>
            </Tooltip>
          </div>
          {p.ui.popup.code.show_log && (
            <div className="h-[150px] overflow-auto font-mono p-2 text-xs whitespace-pre-wrap border-b">
              <div>{p.ui.popup.code.log || "stdout is empty..."}</div>
            </div>
          )}

          {!p.ui.popup.code.open || !p.ui.popup.code.id ? (
            <div className="flex flex-1 relative">
              <Loading backdrop={false} />
            </div>
          ) : (
            <iframe
              className="flex flex-1"
              src={`${vscode_url}folder=/site/code/${p.ui.popup.code.id}`}
            ></iframe>
          )}
          {local.namePicker && (
            <div
              className="absolute inset-0"
              onClick={() => {
                local.namePicker = false;
                local.render();
              }}
            ></div>
          )}
        </div>
      </div>
    </Modal>
  );
};
