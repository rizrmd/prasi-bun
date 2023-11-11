import { useEffect } from "react";
import { useGlobal } from "web-utils";
import { isLocalhost } from "../../../../../utils/ui/is-localhost";
import { Loading } from "../../../../../utils/ui/loading";
import { Modal } from "../../../../../utils/ui/modal";
import { Tooltip } from "../../../../../utils/ui/tooltip";
import { EDGlobal } from "../../../logic/ed-global";

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
              "flex items-center px-2 w-[200px] overflow-ellipsis space-x-1",
              "cursor-pointer"
            )}
          >
            <div className="capitalize flex-1 flex items-center justify-between">
              <div>{p.ui.popup.code.name}</div>
              <div
                dangerouslySetInnerHTML={{
                  __html: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
                }}
              ></div>
            </div>
          </div>

          <div className="flex items-center space-x-1 border-x px-2">
            {p.ui.popup.code.name !== "site" && (
              <div className="hover:bg-blue-100 flex items-center justify-center border w-[20px] h-[20px] flex">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07095 0.650238C6.67391 0.650238 6.32977 0.925096 6.24198 1.31231L6.0039 2.36247C5.6249 2.47269 5.26335 2.62363 4.92436 2.81013L4.01335 2.23585C3.67748 2.02413 3.23978 2.07312 2.95903 2.35386L2.35294 2.95996C2.0722 3.2407 2.0232 3.6784 2.23493 4.01427L2.80942 4.92561C2.62307 5.2645 2.47227 5.62594 2.36216 6.00481L1.31209 6.24287C0.924883 6.33065 0.650024 6.6748 0.650024 7.07183V7.92897C0.650024 8.32601 0.924883 8.67015 1.31209 8.75794L2.36228 8.99603C2.47246 9.375 2.62335 9.73652 2.80979 10.0755L2.2354 10.9867C2.02367 11.3225 2.07267 11.7602 2.35341 12.041L2.95951 12.6471C3.24025 12.9278 3.67795 12.9768 4.01382 12.7651L4.92506 12.1907C5.26384 12.377 5.62516 12.5278 6.0039 12.6379L6.24198 13.6881C6.32977 14.0753 6.67391 14.3502 7.07095 14.3502H7.92809C8.32512 14.3502 8.66927 14.0753 8.75705 13.6881L8.99505 12.6383C9.37411 12.5282 9.73573 12.3773 10.0748 12.1909L10.986 12.7653C11.3218 12.977 11.7595 12.928 12.0403 12.6473L12.6464 12.0412C12.9271 11.7604 12.9761 11.3227 12.7644 10.9869L12.1902 10.076C12.3768 9.73688 12.5278 9.37515 12.638 8.99596L13.6879 8.75794C14.0751 8.67015 14.35 8.32601 14.35 7.92897V7.07183C14.35 6.6748 14.0751 6.33065 13.6879 6.24287L12.6381 6.00488C12.528 5.62578 12.3771 5.26414 12.1906 4.92507L12.7648 4.01407C12.9766 3.6782 12.9276 3.2405 12.6468 2.95975L12.0407 2.35366C11.76 2.07292 11.3223 2.02392 10.9864 2.23565L10.0755 2.80989C9.73622 2.62328 9.37437 2.47229 8.99505 2.36209L8.75705 1.31231C8.66927 0.925096 8.32512 0.650238 7.92809 0.650238H7.07095ZM4.92053 3.81251C5.44724 3.44339 6.05665 3.18424 6.71543 3.06839L7.07095 1.50024H7.92809L8.28355 3.06816C8.94267 3.18387 9.5524 3.44302 10.0794 3.81224L11.4397 2.9547L12.0458 3.56079L11.1882 4.92117C11.5573 5.44798 11.8164 6.0575 11.9321 6.71638L13.5 7.07183V7.92897L11.932 8.28444C11.8162 8.94342 11.557 9.55301 11.1878 10.0798L12.0453 11.4402L11.4392 12.0462L10.0787 11.1886C9.55192 11.5576 8.94241 11.8166 8.28355 11.9323L7.92809 13.5002H7.07095L6.71543 11.932C6.0569 11.8162 5.44772 11.5572 4.92116 11.1883L3.56055 12.046L2.95445 11.4399L3.81213 10.0794C3.4431 9.55266 3.18403 8.94326 3.06825 8.2845L1.50002 7.92897V7.07183L3.06818 6.71632C3.18388 6.05765 3.44283 5.44833 3.81171 4.92165L2.95398 3.561L3.56008 2.95491L4.92053 3.81251ZM9.02496 7.50008C9.02496 8.34226 8.34223 9.02499 7.50005 9.02499C6.65786 9.02499 5.97513 8.34226 5.97513 7.50008C5.97513 6.65789 6.65786 5.97516 7.50005 5.97516C8.34223 5.97516 9.02496 6.65789 9.02496 7.50008ZM9.92496 7.50008C9.92496 8.83932 8.83929 9.92499 7.50005 9.92499C6.1608 9.92499 5.07513 8.83932 5.07513 7.50008C5.07513 6.16084 6.1608 5.07516 7.50005 5.07516C8.83929 5.07516 9.92496 6.16084 9.92496 7.50008Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
                  }}
                ></div>
              </div>
            )}
            <Tooltip
              content="New Project"
              placement="bottom"
              className="hover:bg-blue-100 flex items-center justify-center border w-[20px] h-[20px] flex cursor-pointer"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
                }}
              ></div>
            </Tooltip>
          </div>

          <Tooltip
            content="stdout log"
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
