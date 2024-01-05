import Downshift from "downshift";
import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { apiProxy } from "../../../../../base/load/api/api-proxy";
import { dbProxy } from "../../../../../base/load/db/db-proxy";
import { FMCompDef, FNCompDef } from "../../../../../utils/types/meta-fn";
import { EDGlobal } from "../../../logic/ed-global";
import { EdPropLabel } from "./prop-label";

export const EdPropInstanceOptions: FC<{
  name: string;
  mprop: FMCompDef;
  cprop: FNCompDef;
  labelClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}> = ({ name, mprop, cprop, labelClick }) => {
  const prop = mprop.toJSON() as FNCompDef;
  const local = useLocal({
    codeEditing: false,
    loading: false,
    loaded: false as any,
    isOpen: false,
    val: "",
    metaFn: null as null | (() => Promise<{ label: string; value: any }[]>),
  });
  const p = useGlobal(EDGlobal, "EDITOR");

  let metaOptions: { label: string; value: any }[] = [];

  if (cprop.meta?.options || cprop.meta?.optionsBuilt) {
    if (!local.loaded) {
      try {
        if (p.site.config.api_url) {
          if (!p.script.db) p.script.db = dbProxy(p.site.config.api_url);
          if (!p.script.api) p.script.api = apiProxy(p.site.config.api_url);
        }

        const args = {
          ...window.exports,
          db: p.script.db,
          api: p.script.api,
        };
        eval(`
${Object.entries(args)
  .map((e) => `const ${e[0]} = args["${e[0]}"]`)
  .join(";\n")}
const resOpt = ${cprop.meta.optionsBuilt || cprop.meta.options};
if (typeof resOpt === 'function')  local.metaFn = resOpt;
else metaOptions = resOpt;
`);
      } catch (e) {
        console.error(e);
      }
    } else {
      metaOptions = local.loaded;
    }

    if (local.metaFn && !local.loaded && !local.loading) {
      local.loading = true;
      local.metaFn().then((e) => {
        local.loading = false;
        local.loaded = e;
        local.render();
      });
    }
  }

  let evalue: any = null;
  try {
    eval(`evalue = ${prop.value}`);
  } catch (e) {}

  useEffect(() => {
    if (Array.isArray(metaOptions)) {
      local.val = evalue;
      local.render();
    }
  }, [evalue]);

  const onChange = (val: string) => {
    mprop.doc?.transact(() => {
      mprop.set("value", val);
      mprop.set("valueBuilt", val);
    });

    setTimeout(p.render);
  };

  let mode = prop.meta?.option_mode;
  if (!mode) mode = "button";
  return (
    <div className="flex items-stretch min-h-[28px]">
      <EdPropLabel name={name} labelClick={labelClick} />
      <div className="flex flex-1 justify-end">
        {mode === "dropdown" && (
          <>
            <Downshift
              inputValue={local.val}
              isOpen={local.isOpen}
              onOuterClick={() => {
                local.isOpen = false;
                local.render();
              }}
              onInputValueChange={(e) => {
                local.val = e;
                local.isOpen = true;
                local.render();
              }}
              onChange={(sel) => {
                if (!sel) {
                  local.val = evalue;
                  local.isOpen = false;
                  local.render();
                } else {
                  const val = JSON.stringify(sel.value);
                  local.isOpen = false;
                  onChange(val);
                }
              }}
              itemToString={(item) => (item ? item.value : "")}
            >
              {({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem,
                getRootProps,
              }) => (
                <div className="border-l self-stretch">
                  <div
                    style={{ display: "inline-block" }}
                    {...getRootProps({}, { suppressRefError: true })}
                  >
                    <input
                      {...getInputProps()}
                      onFocus={() => {
                        local.val = "";
                        local.isOpen = true;
                        local.render();
                      }}
                      onClick={() => {
                        local.isOpen = true;
                        local.render();
                      }}
                      onBlur={() => {
                        local.val = evalue;
                        local.isOpen = false;
                        local.render();
                      }}
                      type="search"
                      spellCheck={false}
                      className="flex-1 self-stretch font-mono border-2 border-transparent outline-none bg-transparent focus:bg-white focus:border-blue-500 border-slate-300 text-[11px] min-h-[28px] pl-1 "
                    />
                  </div>
                  <ul
                    {...getMenuProps()}
                    className="absolute z-10 border right-0 bg-white max-h-[300px] overflow-y-auto overflow-x-hidden"
                  >
                    {isOpen
                      ? metaOptions
                          .filter(
                            (item) =>
                              !inputValue || item.value.includes(inputValue)
                          )
                          .map((item, index) => (
                            <li
                              {...getItemProps({
                                key: item.value,
                                index,
                                item,
                              })}
                              className={cx(
                                "min-w-[180px] px-2 py-[2px] border-b",
                                selectedItem === item &&
                                  highlightedIndex !== index &&
                                  `bg-blue-500 text-white`,
                                highlightedIndex === index && `bg-blue-200`
                              )}
                            >
                              {item.label || item.value}
                            </li>
                          ))
                      : null}
                  </ul>
                </div>
              )}
            </Downshift>
          </>
        )}
        {mode === "button" && (
          <div className="flex-1 pt-1 px-1 flex flex-wrap justify-end space-x-1">
            {Array.isArray(metaOptions) &&
              metaOptions.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={cx(
                      "flex px-2 text-xs mb-1 border rounded-sm cursor-pointer  justify-center select-none items-center",
                      item.value !== evalue
                        ? "bg-white  text-blue-700 hover:bg-blue-50 hover:border-blue-500"
                        : "bg-blue-700 text-white border-blue-700"
                    )}
                    onClick={() => {
                      onChange(`"${item.value}"`);
                    }}
                  >
                    {item.label}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
