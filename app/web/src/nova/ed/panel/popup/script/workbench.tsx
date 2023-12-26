import { useGlobal } from "web-utils";
import { IItem } from "../../../../../utils/types/item";
import { EDGlobal, active } from "../../../logic/ed-global";
import { EdScriptMonaco } from "./monaco";
import { EdScriptSnippet } from "./snippet";

export const EdScriptWorkbench = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  return (
    <div className="flex flex-1 items-stretch">
      <div className="flex flex-1 flex-col ">
        <div className="flex border-b">
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
          <EdScriptMonaco />
        </div>
      </div>
    </div>
  );
};

const CompTitleInstance = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  const item = p.page.meta[active.item_id].item as IItem;

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
