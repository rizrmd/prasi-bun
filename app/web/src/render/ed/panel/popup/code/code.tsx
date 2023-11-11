import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { Modal } from "../../../../../utils/ui/modal";
import { useEffect } from "react";
import { isLocalhost } from "../../../../../utils/ui/is-localhost";
import { Loading } from "../../../../../utils/ui/loading";
import { Tooltip } from "../../../../../utils/ui/tooltip";
import { Popover } from "../../../../../utils/ui/popover";

export const EdPopCode = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

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
          console.clear();
          p.ui.popup.code.open = false;
          p.render();
        }
      }}
    >
      <div
        className={cx(
          "bg-white select-none fixed inset-[50px] bottom-0 flex flex-col inset-0"
        )}
      >
        <div className="border-b flex h-[40px] items-stretch">
          <div
            className={cx(
              "border-r flex items-center px-2 w-[200px] overflow-ellipsis space-x-1",
              "cursor-pointer"
            )}
          >
            <div className="capitalize flex-1">{p.ui.popup.code.name}</div>
            <div className="flex items-center space-x-1">
              <div className="hover:bg-blue-100 flex items-center justify-center border w-[20px] h-[20px] flex">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
                  }}
                ></div>
              </div>
              <div className="hover:bg-blue-100 flex items-center justify-center border w-[20px] h-[20px] flex">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <Tooltip
            content="Stdout Log"
            delay={0}
            placement="bottom"
            className="flex items-stretch relative"
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
                __html: p.ui.popup.code.loading
                  ? `<svg version="1.1" id="L2"  width="15" height="15"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><circle fill="none" stroke="currentColor" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/><line fill="none" stroke-linecap="round" stroke="currentColor" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5"><animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 50" to="360 50 50" repeatCount="indefinite"/></line><line fill="none" stroke-linecap="round" stroke="currentColor" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74"><animateTransform attributeName="transform" dur="15s" type="rotate" from="0 50 50" to="360 50 50" repeatCount="indefinite"/></line></svg>`
                  : `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H7.5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
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
      </div>
    </Modal>
  );
};
