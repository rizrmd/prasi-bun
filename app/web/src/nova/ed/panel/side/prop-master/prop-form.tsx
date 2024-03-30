import { FC, useEffect } from "react";
import { FMCompDef, FNCompDef } from "../../../../../utils/types/meta-fn";
import { useGlobal, useLocal } from "web-utils";
import { TypedMap } from "yjs-types";
import { createEditScript } from "./edit-script";
import { EDGlobal } from "../../../logic/ed-global";
import { createId } from "@paralleldrive/cuid2";
import { IItem, MItem } from "../../../../../utils/types/item";
import { MContent } from "../../../../../utils/types/general";
import { fillID } from "../../../logic/tree/fill-id";

export const propPopover = {
  name: "",
  render: () => {},
};

export const EdPropPopoverForm: FC<{
  mprop: FMCompDef;
  name: string;
  closing: boolean;
}> = ({ mprop, name, closing }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const mmeta = mprop.get("meta");
  const local = useLocal({
    name,
    label: "",
    rename_timeout: null as any,
  });

  if (!mmeta) return null;
  let type = mmeta.get("type") as any;

  useEffect(() => {
    local.label = mprop.get("label") || local.name.replace(/\_/gi, " ");
    local.render();
  }, []);

  const rename = () => {
    const keys = Object.keys(mprop.parent?.toJSON());
    if ([...keys, ...invalidKeyword].includes(local.name)) {
      alert(`Cannot use "${local.name}" as name`);
      local.name = name;
      local.render();
      return;
    }

    mprop.doc?.transact(() => {
      const parent = mprop.parent as TypedMap<Record<string, FMCompDef>>;
      parent.set(local.name, parent.get(name)?.clone() as any);
      parent.delete(name);
    });
    propPopover.name = local.name;
    propPopover.render();
  };

  if (!["text", "option", "content-element"].includes(type)) {
    type = "other";
  }

  return (
    <div
      className={cx(
        "flex text-sm flex-col items-stretch space-y-1 py-1 w-[300px]",
        closing && "hidden"
      )}
    >
      <div className="flex justify-between px-2 py-1">
        <div className="flex space-x-1">
          {[
            { label: "TXT", type: "text" },
            { label: "OPT", type: "option" },
            { label: "JSX", type: "content-element" },
            { label: "OTHER", type: "other" },
          ].map((e) => {
            return (
              <div
                key={e.type}
                className={cx(
                  type === e.type
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100",
                  " px-2 cursor-pointer"
                )}
                onClick={() => {
                  if (e.type === "content-element") {
                    mprop.doc?.transact(() => {
                      mmeta.set("type", e.type as any);
                      if (!mprop.get("content")) {
                        const json = {
                          id: createId(),
                          name: name,
                          type: "item",
                          dim: { w: "full", h: "full" },
                          childs: [],
                          adv: {
                            css: "",
                          },
                        } as IItem;
                        const map = new Y.Map() as MItem;
                        syncronize(map as any, fillID(json));
                        mprop.set("content", map);
                      }
                    });
                  } else if (e.type !== "other") {
                    mmeta.set("type", e.type as any);
                  } else {
                    mmeta.set("type", "button");
                  }
                  propPopover.render();
                }}
              >
                {e.label}
              </div>
            );
          })}
        </div>

        {type === "text" && (
          <div
            className={cx(
              "flex cursor-pointer items-center space-x-1 select-none",
              mprop.get("is_name") && "text-green-500"
            )}
            onClick={() => {
              mprop.doc?.transact(() => {
                (mprop.parent as any)?.forEach((p: any, k: string) => {
                  if (k === name) {
                    p.set("is_name", !p.get("is_name"));
                  } else {
                    p.set("is_name", false);
                  }
                });
              });
            }}
          >
            <span
              className={cx(css`
                width: 17px;
              `)}
            >
              {!mprop.get("is_name") ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 7C5.23858 7 3 9.23858 3 12C3 14.7614 5.23858 17 8 17H16C18.7614 17 21 14.7614 21 12C21 9.23858 18.7614 7 16 7H8ZM8 5H16C19.866 5 23 8.13401 23 12C23 15.866 19.866 19 16 19H8C4.13401 19 1 15.866 1 12C1 8.13401 4.13401 5 8 5ZM8 15C6.34315 15 5 13.6569 5 12C5 10.3431 6.34315 9 8 9C9.65685 9 11 10.3431 11 12C11 13.6569 9.65685 15 8 15Z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5H16C19.866 5 23 8.13401 23 12C23 15.866 19.866 19 16 19H8C4.13401 19 1 15.866 1 12C1 8.13401 4.13401 5 8 5ZM16 15C17.6569 15 19 13.6569 19 12C19 10.3431 17.6569 9 16 9C14.3431 9 13 10.3431 13 12C13 13.6569 14.3431 15 16 15Z"></path>
                </svg>
              )}
            </span>
            <span className="text-xs">As Name</span>
          </div>
        )}
      </div>

      {type === "other" && (
        <div className="border-t border-slate-300 pl-2 pt-1 flex justify-between items-center select-none">
          <div className="uppercase text-xs">PROP MODE</div>

          <div className="flex pr-1">
            {["file", "button"].map((e) => (
              <div
                key={e}
                onClick={() => {
                  mmeta.set("type", e as any);
                  propPopover.render();
                }}
                className={cx(
                  "m-1 px-1 capitalize text-center cursor-pointer  font-mono border border-slate-300 text-[11px]",
                  e === mmeta.get("type") ||
                    (e === "button" && !mmeta.get("type"))
                    ? "bg-blue-500 text-white"
                    : `hover:bg-blue-500 hover:text-white bg-white hover:border-blue-500`
                )}
              >
                {e}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="border-t border-slate-300 px-2 pt-2 pb-1 flex flex-col items-stretch">
        <div className="uppercase text-xs text-slate-500">Name</div>
        <input
          spellCheck={false}
          type="text"
          className="p-1 outline-none border focus:border-blue-500"
          value={local.name}
          autoFocus
          onChange={(e) => {
            local.name = e.currentTarget.value
              .toLowerCase()
              .replace(/\W/gi, "_");

            if (!local.label) {
              local.label = local.name.replace(/\_/gi, " ");
            }

            local.render();
          }}
          onBlur={() => {
            if (local.name !== name) {
              rename();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }
          }}
        />
      </div>

      <div className="border-t border-slate-300 px-2 pt-2 pb-1 flex flex-col items-stretch">
        <div className="uppercase text-xs text-slate-500">Label</div>
        <input
          spellCheck={false}
          type="text"
          className="p-1 outline-none border focus:border-blue-500"
          value={local.label}
          onChange={(e) => {
            local.label = e.currentTarget.value;
            local.render();
          }}
          onBlur={() => {
            mprop.set("label", local.label);
            if (!local.label) {
              local.label = local.name.replace(/\_/gi, " ");
              local.render();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }
          }}
        />
      </div>

      {type === "content-element" && (
        <>
          <div className="border-t border-slate-300 pl-2 pt-1 flex justify-between items-center">
            <div className="uppercase text-xs">TYPINGS</div>
            <div
              className="m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]"
              onClick={createEditScript(p, "typings", mprop, name)}
            >
              EDIT CODE
            </div>
          </div>

          <div className="border-t border-slate-300 pl-2 pt-1 flex justify-between items-center">
            <div className="uppercase text-xs label self-stretch flex items-center">
              Visible
            </div>

            <div
              className="m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]"
              onClick={createEditScript(p, "visible", mprop, name)}
            >
              EDIT CODE
            </div>
          </div>
        </>
      )}

      {type !== "content-element" && (
        <>
          <div
            className={cx(
              "border-t border-slate-300 pl-2 flex justify-between items-center",
              css`
                margin-bottom: -0.25rem !important;

                > .label {
                  padding-top: 0.75rem;
                  padding-bottom: 0.75rem;
                }
              `
            )}
          >
            <div className="uppercase text-xs label self-stretch flex items-center">
              Generator
            </div>
            <div
              className="m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px] flex "
              onClick={createEditScript(p, "gen", mprop, name)}
            >
              EDIT CODE
            </div>
            <div className=" border-l border-slate-300 mr-2 self-stretch"></div>
            <div className="uppercase text-xs label self-stretch flex items-center">
              Visible
            </div>
            <div
              className="m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]"
              onClick={createEditScript(p, "visible", mprop, name)}
            >
              EDIT CODE
            </div>
          </div>

          <div className="border-t border-slate-300 pl-2 pt-1 flex justify-between items-center">
            <div className="uppercase text-xs">TYPINGS</div>
            <div
              className="m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]"
              onClick={createEditScript(p, "typings", mprop, name)}
            >
              EDIT CODE
            </div>
          </div>

          <div className="border-t border-slate-300 pl-2 pt-1 flex justify-between items-center">
            <div className="uppercase text-xs">VALUE</div>
            <div
              className="m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]"
              onClick={createEditScript(p, "value", mprop, name)}
            >
              EDIT CODE
            </div>
          </div>
        </>
      )}

      {type === "option" && (
        <div className="border-t border-slate-300 pl-2 pt-1 flex justify-between items-center select-none">
          <div className="uppercase text-xs">MODE</div>

          <div className="flex pr-1">
            {["button", "dropdown", "checkbox"].map((e) => (
              <div
                key={e}
                onClick={() => {
                  const meta = mprop.get("meta");
                  if (meta) {
                    meta.set("option_mode", e as any);
                  }

                  local.render();
                }}
                className={cx(
                  "m-1 px-1 capitalize text-center cursor-pointer  font-mono border border-slate-300 text-[11px]",
                  e === mmeta.get("option_mode") ||
                    (e === "button" && !mmeta.get("option_mode"))
                    ? "bg-blue-500 text-white"
                    : `hover:bg-blue-500 hover:text-white bg-white hover:border-blue-500`
                )}
              >
                {e}
              </div>
            ))}
          </div>
        </div>
      )}

      {type === "option" && (
        <div className="border-t border-slate-300 pl-2 pt-1 flex justify-between items-center">
          <div className="uppercase text-xs">OPTIONS</div>

          <div
            className="m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]"
            onClick={createEditScript(p, "option", mprop, name)}
          >
            EDIT CODE
          </div>
        </div>
      )}
    </div>
  );
};

export const invalidKeyword = [
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "let",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "super",
  "switch",
  "static",
  "this",
  "throw",
  "try",
  "true",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
  "key",
];
