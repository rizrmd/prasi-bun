import { FC, Fragment, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { apiProxy } from "../../../../../base/load/api/api-proxy";
import { dbProxy } from "../../../../../base/load/db/db-proxy";
import { FMCompDef, FNCompDef } from "../../../../../utils/types/meta-fn";
import { EDGlobal, IMeta, active } from "../../../logic/ed-global";
import { treeRebuild } from "../../../logic/tree/build";
import { EdPropLabel } from "./prop-label";
import { ChevronDown } from "../../tree/node/item/indent";
import { Popover } from "../../../../../utils/ui/popover";

type MetaOption = {
  label: string;
  value: any;
  options?: MetaOption[];
  reload?: string[];
};

const config = {
  opt: {} as Record<string, () => void>,
};

export const EdPropInstanceOptions: FC<{
  meta: IMeta;
  name: string;
  mprop: FMCompDef;
  cprop: FNCompDef;
  labelClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}> = ({ name, mprop, cprop, labelClick, meta }) => {
  const prop = mprop.toJSON() as FNCompDef;
  const local = useLocal({
    codeEditing: false,
    loading: false,
    loaded: false as any,
    isOpen: false,
    val: "",
    metaFn: null as null | (() => Promise<MetaOption[]>),
    checkbox: {
      width: 0,
    },
  });
  const p = useGlobal(EDGlobal, "EDITOR");

  let metaOptions: MetaOption[] = [];

  config.opt[name] = () => {
    local.metaFn = null;
    local.loaded = null;
    local.loading = false;
    local.render();
  };

  if (cprop.meta?.options || cprop.meta?.optionsBuilt) {
    if (!local.loaded) {
      try {
        if (p.site.config.api_url) {
          if (!p.script.db) p.script.db = dbProxy(p.site.config.api_url);
          if (!p.script.api) p.script.api = apiProxy(p.site.config.api_url);
        }

        const arg = {
          ...window.exports,
          db: p.script.db,
          api: p.script.api,
          ...active.scope,
        };

        if (meta.item.script?.props) {
          for (const [k, v] of Object.entries(meta.item.script?.props)) {
            eval(`try { arg.${k} = ${v.value} } catch(e) { console.error("arg", e); }`);
          }
        } else if (meta.item.component) {
          for (const [k, v] of Object.entries(meta.item.component.props)) {
            eval(`try { arg.${k} = ${v.valueBuilt} } catch(e) { console.error("arg", e); }`);
          }
        }
        eval(`
${Object.entries(arg)
  .map((e) => `const ${e[0]} = arg["${e[0]}"]`)
  .join(";\n")}
const resOpt = ${cprop.meta.optionsBuilt || cprop.meta.options};
if (typeof resOpt === 'function') local.metaFn = resOpt;
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
      const res = local.metaFn();
      const callback = (e: any) => {
        local.loading = false;
        local.loaded = e;
        local.render();
      };
      if (res instanceof Promise) res.then(callback);
      else callback(res);
    }
  }

  let evalue: any = null;
  try {
    eval(`evalue = ${prop.value}`);
  } catch (e) {}

  useEffect(() => {
    if (Array.isArray(metaOptions) && !Array.isArray(evalue)) {
      local.val = evalue;
      local.render();
    }
  }, [evalue]);

  const onChange = (val: string, item: MetaOption | undefined) => {
    mprop.doc?.transact(() => {
      mprop.set("value", val);
      mprop.set("valueBuilt", val);
    });

    treeRebuild(p);
    p.render();

    setTimeout(() => {
      if (item?.reload) {
        for (const name of item.reload) {
          if (config.opt[name]) {
            config.opt[name]();
          }
        }
      }
    });
  };

  let mode = cprop.meta?.option_mode;
  if (!mode) mode = "button";

  if (metaOptions && metaOptions.length > 0) {
    for (const [k, v] of Object.entries(metaOptions)) {
      if (typeof v === "string") {
        metaOptions[k as any] = { label: v, value: v };
      }
    }
  }

  return (
    <div className="flex items-stretch min-h-[28px]">
      <EdPropLabel name={cprop.label || name} labelClick={labelClick} />
      <div className="flex flex-1 justify-end items-stretch">
        {mode === "dropdown" && (
          <select
            value={evalue}
            className="flex-1 border-l outline-none"
            onChange={(ev) => {
              onChange(
                `"${ev.currentTarget.value}"`,
                metaOptions.find((e) => e.value === ev.currentTarget.value)
              );
            }}
          >
            {Array.isArray(metaOptions) &&
              metaOptions.map((item, idx) => {
                return (
                  <option key={idx} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
          </select>
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
                      onChange(`"${item.value}"`, item);
                    }}
                  >
                    {item.label}
                  </div>
                );
              })}
          </div>
        )}

        {mode === "checkbox" && (
          <Popover
            placement="top"
            content={
              <div
                className={cx(
                  "relative max-h-[400px] min-w-[200px] overflow-y-auto overflow-x-hidden",
                  css`
                    margin: 0px -8px -6px -8px;
                    background: white;
                    padding: 5px 0px 0px 0px;
                    width: ${local.checkbox.width}px;
                  `
                )}
              >
                <div className={cx("flex flex-col bg-white")}>
                  {Array.isArray(metaOptions) &&
                    metaOptions.map((item, idx) => {
                      const val: any[] = Array.isArray(evalue) ? evalue : [];

                      const found = val.find((e) => {
                        if (!item.options) {
                          return e === item.value;
                        } else {
                          if (typeof e === "object" && e.value === item.value) {
                            return true;
                          }
                          return false;
                        }
                      });
                      return (
                        <Fragment key={idx}>
                          <SingleCheckbox
                            item={item}
                            idx={idx}
                            val={val}
                            onChange={(val) => {
                              onChange(JSON.stringify(val), item);
                              local.render();
                            }}
                          />
                          {item.options &&
                            found &&
                            item.options.map((child, idx) => {
                              let checked: any[] = found.checked;

                              return (
                                <SingleCheckbox
                                  key={idx}
                                  item={child}
                                  idx={idx}
                                  depth={1}
                                  val={checked}
                                  onChange={(newval) => {
                                    found.checked = newval;

                                    onChange(JSON.stringify(val), child);
                                    local.render();
                                  }}
                                />
                              );
                            })}
                        </Fragment>
                      );
                    })}
                </div>
              </div>
            }
            asChild
          >
            <div
              className="flex flex-1 items-stretch bg-white border hover:border-blue-500 hover:bg-blue-50 rounded-sm select-none cursor-pointer m-[3px]"
              onClick={() => {}}
              ref={(el) => {
                if (!local.checkbox.width && el) {
                  const bound = el.getBoundingClientRect();
                  local.checkbox.width = bound.width;
                  local.render();
                }
              }}
            >
              <div className="flex-1 flex items-center">
                <div className="px-1">
                  {Array.isArray(evalue)
                    ? evalue.length === 0
                      ? "Select Item"
                      : `${evalue.length} selected`
                    : `Select Item`}
                </div>
              </div>
              <div className="pr-1 pt-[2px]">
                <ChevronDown />
              </div>
            </div>
          </Popover>
        )}
      </div>
    </div>
  );
};

const SingleCheckbox = ({
  val,
  item,
  idx,
  onChange,
  depth,
}: {
  item: MetaOption;
  idx: number;
  depth?: number;
  val: any[];
  onChange: (val: MetaOption[], item: MetaOption) => void;
}) => {
  const is_check = !!val.find((e) => {
    if (!item.options) {
      return e === item.value;
    } else {
      if (typeof e === "object" && e.value === item.value) {
        return true;
      }
      return false;
    }
  });

  return (
    <div
      className={cx(
        "flex pl-1 text-xs cursor-pointer select-none space-x-1 items-center",
        idx === 0 && !depth ? "" : "border-t",
        depth &&
          css`
            padding-left: ${depth * 20}px;
          `,
        is_check
          ? css`
              color: green;
              border-left: 3px solid green;

              &:hover {
                border-left: 3px solid #a8d4a8;
              }

              svg {
                width: 14px;
              }
            `
          : css`
              border-left: 3px solid transparent;

              svg {
                color: gray;
                width: 14px;
              }
              &:hover {
                border-left: 3px solid #0084ff;
                color: #0084ff;

                svg {
                  color: #0084ff;
                }
              }
            `
      )}
      onClick={() => {
        if (item.options) {
          let idx = val.findIndex((e) => {
            if (typeof e === "object" && e.value === item.value) {
              return true;
            }
            return false;
          });

          if (idx >= 0) {
            val.splice(idx, 1);
          } else {
            val.push({ value: item.value, checked: [] });
          }
        } else {
          let idx = val.findIndex((e) => e === item.value);

          if (idx >= 0) {
            val.splice(idx, 1);
          } else {
            val.push(item.value);
          }
        }
        onChange(val, item);
      }}
    >
      {!is_check ? unchecked : checked}
      <div>{item.label}</div>
    </div>
  );
};

const checked = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="lucide lucide-square-check-big"
    viewBox="0 0 24 24"
  >
    <path d="M9 11l3 3L22 4"></path>
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
  </svg>
);
const unchecked = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="lucide lucide-square"
    viewBox="0 0 24 24"
  >
    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
  </svg>
);
