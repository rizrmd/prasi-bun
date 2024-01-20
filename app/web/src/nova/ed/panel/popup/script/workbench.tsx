import { useGlobal, useLocal } from "web-utils";
import { IItem } from "../../../../../utils/types/item";
import { EDGlobal, active } from "../../../logic/ed-global";
import { EdScriptMonaco } from "./monaco";
import { EdScriptSnippet } from "./snippet";
import { useEffect } from "react";
import { Loading } from "../../../../../utils/ui/loading";

export const EdScriptWorkbench = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({ active_id: "" });

  useEffect(() => {
    if (!local.active_id) {
      local.active_id = active.item_id;
      local.render();
    } else {
      setTimeout(() => {
        local.active_id = active.item_id;
        local.render();
      }, 200);
    }
  }, [active.item_id]);

  const scriptNav = {
    canNext: active.script_nav.idx < active.script_nav.list.length - 1,
    canBack: active.script_nav.list.length > 0,
  };

  return (
    <div className="flex flex-1 items-stretch">
      <div className="flex flex-1 flex-col ">
        <div className="flex border-b items-stretch">
          <div className="border-r px-2 flex items-center">
            <div
              className={cx(
                scriptNav.canBack
                  ? "cursor-pointer hover:text-blue-400"
                  : "text-slate-200"
              )}
              onClick={() => {
                if (scriptNav.canBack) {
                  active.script_nav.idx = active.script_nav.idx - 1;
                  const item = active.script_nav.list[active.script_nav.idx];

                  if (item) {
                    active.item_id = item.item_id;
                    active.comp_id = item.comp_id || "";
                    active.instance = {
                      item_id: item.instance?.item_id || "",
                      comp_id: item.instance?.comp_id || "",
                    };
                    p.render();
                  }
                }
              }}
            >
              <ChevronLeft />
            </div>
            <div
              className={cx(
                scriptNav.canNext
                  ? "cursor-pointer hover:text-blue-400"
                  : "text-slate-200"
              )}
              onClick={() => {
                if (scriptNav.canNext) {
                  active.script_nav.idx = active.script_nav.idx + 1;
                  const item = active.script_nav.list[active.script_nav.idx];

                  if (item) {
                    active.item_id = item.item_id;
                    active.comp_id = item.comp_id || "";
                    active.instance = {
                      item_id: item.instance?.item_id || "",
                      comp_id: item.instance?.comp_id || "",
                    };
                    p.render();
                  }
                }
              }}
            >
              <ChevronRight />
            </div>
          </div>
          {p.ui.popup.script.type === "prop-master" && <CompTitleMaster />}
          {p.ui.popup.script.type === "prop-instance" && <CompTitleInstance />}
          {p.ui.popup.script.type === "item" && (
            <>
              <div className="flex p-2 space-x-1">
                {[
                  { type: "js", color: "#e9522c" },
                  { type: "css", color: "#188228" },
                  { type: "html", color: "#2c3e83" },
                ].map((e) => {
                  return (
                    <div
                      key={e.type}
                      className={cx(
                        css`
                          color: ${e.color};
                          border: 1px solid ${e.color};
                        `,
                        "uppercase text-white text-[12px] cursor-pointer flex items-center justify-center transition-all hover:opacity-100 w-[40px] text-center",
                        p.ui.popup.script.mode === e.type
                          ? css`
                              background: ${e.color};
                              color: white;
                            `
                          : "opacity-30"
                      )}
                      onClick={() => {
                        p.ui.popup.script.mode = e.type as any;
                        p.render();
                      }}
                    >
                      {e.type}
                    </div>
                  );
                })}
              </div>
              {p.ui.popup.script.mode === "js" &&
                p.ui.popup.script.type === "item" && <EdScriptSnippet />}
            </>
          )}
        </div>
        <div className="relative flex flex-1">
          {local.active_id === active.item_id ? (
            <EdScriptMonaco />
          ) : (
            <Loading backdrop={false} note={"opening script"} />
          )}
        </div>
      </div>
    </div>
  );
};

const CompTitleInstance = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  let item = null as unknown as IItem;

  if (active.comp_id) {
    const comp = p.comp.list[active.comp_id];
    if (comp && comp.meta) {
      item = comp.meta[active.item_id].item;
    }
  } else {
    item = p.page.meta[active.item_id].item;
  }

  if (item && item.component?.id) {
    const props = item.component.props;
    return (
      <div className="flex text-xs p-2 space-x-1 items-center">
        <div className="bg-blue-700 text-white text-[11px] px-1 mr-1">
          INSTANCE
        </div>
        <div>{item.name}</div>
        <ArrowRight />
        <div>{p.ui.popup.script.prop_name}</div>
        <ArrowRight />
        <div>{p.ui.popup.script.prop_kind}</div>
      </div>
    );
  }
  return <></>;
};

const CompTitleMaster = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  const item = p.comp.list[active.comp_id].doc
    .getMap("map")
    .get("root")
    ?.toJSON() as IItem;

  if (item && item.component?.id) {
    const props = item.component.props;
    return (
      <div className="flex text-xs p-2 space-x-1 items-center">
        <div className="bg-purple-700 text-white text-[11px] px-1 mr-1">
          MASTER
        </div>
        <div>{item.name}</div>
        <ArrowRight />
        <div>{p.ui.popup.script.prop_name}</div>
        <ArrowRight />
        <div>{p.ui.popup.script.prop_kind}</div>
      </div>
    );
  }
  return <></>;
};

const ArrowRight = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={"22"}
    height={"22"}
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M6.158 3.135a.5.5 0 01.707.023l3.75 4a.5.5 0 010 .684l-3.75 4a.5.5 0 11-.73-.684L9.566 7.5l-3.43-3.658a.5.5 0 01.023-.707z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const ChevronLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14 18l-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6L14 18z"
    ></path>
  </svg>
);
