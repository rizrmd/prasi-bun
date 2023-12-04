import { FC } from "react";
import { FMCompDef, FNCompDef } from "../../../../../utils/types/meta-fn";
import { useGlobal, useLocal } from "web-utils";
import { TypedMap } from "yjs-types";
import { createEditScript } from "./edit-script";
import { EDGlobal } from "../../../logic/ed-global";

export const propPopover = {
  name: "",
};

export const EdPropPopover: FC<{ mprop: FMCompDef; name: string }> = ({
  mprop,
  name,
}) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const mmeta = mprop.get("meta");
  const local = useLocal({
    name,
  });

  if (!mmeta) return null;
  const type = mmeta.get("type");
  return (
    <div
      className={cx(
        "flex text-sm flex-col items-stretch space-y-1 py-1 w-[300px]"
      )}
    >
      <div className="px-2 py-1 flex space-x-1">
        {[
          { label: "TXT", type: "text" },
          { label: "OPT", type: "option" },
          { label: "JSX", type: "content-element" },
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
                mmeta.set("type", e.type as any);
              }}
            >
              {e.label}
            </div>
          );
        })}
      </div>
      <div className="border-t border-slate-300 px-2 pt-2 pb-1 flex flex-col items-stretch">
        <div className="uppercase text-xs text-slate-500">Name</div>
        <input
          spellCheck={false}
          type="text"
          className="p-1 outline-none border focus:border-blue-500"
          value={local.name}
          onChange={(e) => {
            local.name = e.currentTarget.value
              .toLowerCase()
              .replace(/\W/gi, "_");
            local.render();
          }}
          onBlur={() => {
            if (local.name !== name) {
              const keys = Object.keys(mprop.parent?.toJSON());
              if ([...keys, ...keywords].includes(local.name)) {
                alert(`Cannot use "${local.name}" as name`);
                local.name = name;
                local.render();
                return;
              }
              mprop.doc?.transact(() => {
                const parent = mprop.parent as TypedMap<
                  Record<string, FMCompDef>
                >;
                parent.set(local.name, parent.get(name)?.clone() as any);
                parent.delete(name);
              });
              propPopover.name = local.name;
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
        <div className="border-t border-slate-300 pl-2 pt-1 flex justify-between items-center">
          <div className="uppercase text-xs label self-stretch flex items-center">
            Visible
          </div>

          <div
            className="m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]"
            onClick={createEditScript(p, "master-visible")}
          >
            EDIT CODE
          </div>
        </div>
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
              onClick={createEditScript(p, "master-gen")}
            >
              EDIT CODE
            </div>
            <div className=" border-l border-slate-300 mr-2 self-stretch"></div>
            <div className="uppercase text-xs label self-stretch flex items-center">
              Visible
            </div>
            <div
              className="m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]"
              onClick={createEditScript(p, "master-visible")}
            >
              EDIT CODE
            </div>
          </div>

          <div className="border-t border-slate-300 pl-2 pt-1 flex justify-between items-center">
            <div className="uppercase text-xs">VALUE</div>
            <div
              className="m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]"
              onClick={createEditScript(p, "master-value")}
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
            {["button", "dropdown"].map((e) => (
              <div
                key={e}
                onClick={() => {
                  const meta = mprop.get("meta");
                  if (meta) {
                    meta.set("option_mode", e as any);
                  }
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
            onClick={createEditScript(p, "master-option")}
          >
            EDIT CODE
          </div>
        </div>
      )}
    </div>
  );
};

const keywords = [
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
];
