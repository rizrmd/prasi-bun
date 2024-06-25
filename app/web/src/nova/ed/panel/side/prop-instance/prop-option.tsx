import { FC, Fragment, useCallback, useEffect } from "react";
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
  checked?: boolean;
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
  label: string;
  labelClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}> = ({ name, mprop, cprop, label, labelClick, meta }) => {
  const prop = mprop.toJSON() as FNCompDef;
  const local = useLocal({
    codeEditing: false,
    loading: true,
    isOpen: false,
    val: "",
    metaFnInit: false,
    metaFn: null as null | (() => Promise<MetaOption[]>),
    checkbox: {
      width: 0,
    },
    options: [] as MetaOption[],
    optDeps: [] as any[],
    resetOnDeps: false as boolean | (() => any[]),
    open: false,
    pendingVal: null as any,
  });
  const p = useGlobal(EDGlobal, "EDITOR");

  config.opt[name] = () => {
    local.metaFn = null;
    local.loading = false;
    local.render();
  };

  useEffect(() => {
    local.metaFnInit = false;
    local.render();
  }, [name, active.item_id]);

  if (cprop.meta?.options || cprop.meta?.optionsBuilt) {
    if (!local.metaFn || local.optDeps.length > 0) {
      let fn = "" as any;
      let arg = {};
      try {
        if (p.site.config.api_url) {
          if (!p.script.db) p.script.db = dbProxy(p.site.config.api_url);
          if (!p.script.api) p.script.api = apiProxy(p.site.config.api_url);
        }

        arg = {
          ...window.exports,
          db: p.script.db,
          api: p.script.api,
          ...active.scope,
        };

        if (meta.item.script?.props) {
          for (const [k, v] of Object.entries(meta.item.script?.props)) {
            if (v.value && v.value.length > 3) {
              try {
                const evn = new Function("arg", `arg["${k}"] = ${v.value}`);
                evn(arg);
              } catch (e) {
                console.error(e);
                console.warn(k, v.value);
              }
            }
          }
        }
        if (meta.item.component) {
          for (const [k, v] of Object.entries(meta.item.component.props)) {
            if (v.valueBuilt && v.valueBuilt.length > 3) {
              try {
                const evn = new Function(
                  "arg",
                  `arg["${k}"] = ${v.valueBuilt}`
                );
                evn(arg);
              } catch (e) {
                console.error(e);
                console.warn(k, v.valueBuilt);
              }
            }

            if (v.content) {
              eval(
                `try { arg.__${k} = ${JSON.stringify(
                  v.content
                )} } catch(e) { console.error("arg", e); }`
              );
            }
          }
        }

        const src = (
          cprop.meta.optionsBuilt ||
          cprop.meta.options ||
          ""
        ).trim();

        const final_src = `
        try {
          const resOpt = ${src.endsWith(";") ? src : `${src};`}
        
          if (typeof resOpt === 'function') local.metaFn = resOpt;
          else {
            if (typeof resOpt === 'object' && Array.isArray(resOpt.deps) && typeof resOpt.fn === 'function') {
              local.metaFn = resOpt.fn;
              local.optDeps = resOpt.deps;
              local.resetOnDeps = resOpt.reset;
            } else {
              local.options = resOpt;
            }
          }
        } catch(e) { console.error(e); }`;
        fn = new Function(...Object.keys(arg), "local", final_src);
        fn(...Object.values(arg), local);
      } catch (e) {
        console.error(e);
        console.warn(fn.toString(), arg);
      }
    }
  }

  const metaFnCallback = useCallback(
    async (e: any) => {
      local.loading = false;
      local.options = e;

      if (local.resetOnDeps) {
        if (!local.metaFnInit) {
          local.metaFnInit = true;
        } else {
          let reset = "[]";
          if (typeof local.resetOnDeps === "function") {
            reset = JSON.stringify(local.resetOnDeps());
          }
          await mprop.doc?.transact(() => {
            mprop.set("value", reset);
            mprop.set("valueBuilt", reset);
          });

          await treeRebuild(p);
          p.render();
        }
      }
      local.render();
    },
    [local.metaFnInit, local.resetOnDeps, mprop]
  );

  useEffect(() => {
    if (local.metaFn) {
      local.loading = true;
      try {
        const res = local.metaFn();

        if (res instanceof Promise) {
          res.then(metaFnCallback).catch((e) => {
            console.error(e);
          });
        } else metaFnCallback(res);
      } catch (e) {
        console.error(e);
      }
    } else {
      local.loading = false;
      local.render();
    }
  }, [...local.optDeps]);

  let evalue: any = null;
  try {
    eval(`evalue = ${prop.value}`);
  } catch (e) {}

  if (local.open) {
    evalue = local.pendingVal;
  } else {
    local.pendingVal = evalue;
  }

  useEffect(() => {
    if (Array.isArray(local.options) && !Array.isArray(evalue)) {
      if (mode !== "checkbox") {
        local.val = evalue;
        local.render();
      }
    }
  }, [evalue]);

  const onChange = useCallback(
    (val: string, item: MetaOption | undefined) => {
      if (local.open) {
        eval(`local.pendingVal = ${val}`);
        local.render();
        return;
      }

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
    },
    [local.open, mprop, config?.opt]
  );

  let mode = cprop.meta?.option_mode;
  if (!mode) mode = "button";

  if (local.options && local.options.length > 0) {
    for (const [k, v] of Object.entries(local.options)) {
      if (typeof v === "string") {
        local.options[k as any] = { label: v, value: v };
      }
    }
  }

  return (
    <div className="flex items-stretch min-h-[28px]">
      <EdPropLabel name={label || name} labelClick={labelClick} />
      <div className="flex flex-1 justify-end items-stretch">
        {local.loading ? (
          <div className="flex flex-1 justify-center items-center">
            Loading...
          </div>
        ) : (
          <>
            {mode === "dropdown" && (
              <select
                value={evalue}
                className="flex-1 border-l outline-none"
                onChange={(ev) => {
                  onChange(
                    `"${ev.currentTarget.value}"`,
                    local.options.find(
                      (e) => e.value === ev.currentTarget.value
                    )
                  );
                }}
              >
                {Array.isArray(local.options) &&
                  local.options.map((item, idx) => {
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
                {Array.isArray(local.options) &&
                  local.options.map((item, idx) => {
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
                onOpenChange={(open) => {
                  local.open = open;
                  local.render();

                  if (!open) {
                    onChange(JSON.stringify(local.pendingVal), null as any);
                  } else {
                    local.pendingVal = null;
                    local.render();
                  }
                }}
                open={local.open}
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
                      {Array.isArray(local.options) &&
                        local.options.map((item, idx) => {
                          const val: any[] = Array.isArray(evalue)
                            ? evalue
                            : [];
                          const found = val.find((e) => {
                            if (!item.options) {
                              return e === item.value;
                            } else {
                              if (
                                typeof e === "object" &&
                                e.value === item.value
                              ) {
                                return true;
                              }
                              return false;
                            }
                          });
                          return (
                            <SingleCheckbox
                              item={item}
                              idx={idx}
                              val={val}
                              key={idx}
                              depth={0}
                              onChange={(val) => {
                                onChange(JSON.stringify(val), item);
                                local.render();
                              }}
                              found={found}
                              render={local.render}
                            />
                          );
                        })}
                    </div>
                  </div>
                }
                asChild
              >
                <div
                  className="flex flex-1 items-stretch bg-white border hover:border-blue-500 hover:bg-blue-50 rounded-sm select-none cursor-pointer m-[3px]"
                  onClick={() => {
                    local.open = true;
                    local.render();
                  }}
                  ref={(el) => {
                    if (!local.checkbox.width && el) {
                      const bound = el.getBoundingClientRect();
                      local.checkbox.width = bound.width;
                      setTimeout(local.render, 500);
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
          </>
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
  found,
  render,
}: {
  item: MetaOption;
  idx: number;
  depth: number;
  val: any[];
  found: any;
  onChange: (val: MetaOption[], item: MetaOption) => void;
  render: () => void;
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

  const toggleCheck = () => {
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
      if (item.value) {
        let idx = val.findIndex((e) => e === item.value);

        if (idx >= 0) {
          val.splice(idx, 1);
        } else {
          val.push(item.value);
        }
      }
    }
    onChange(val, item);
  };

  useEffect(() => {
    if (item.checked && !is_check) {
      toggleCheck();
    }
  }, []);

  return (
    <>
      <div
        className={cx(
          "flex pl-1 text-xs cursor-pointer select-none space-x-1 items-center",
          idx === 0 && !depth ? "" : "border-t",
          item.checked && "opacity-50",
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
          toggleCheck();
        }}
      >
        {!is_check ? unchecked : checked}
        <div>{item.label}</div>
      </div>

      {item.options &&
        found &&
        item.options.map((child, idx) => {
          const sub_found = found.checked.find((e: any) => {
            if (!item.options) {
              return e === child.value;
            } else {
              if (typeof e === "object" && e.value === child.value) {
                return true;
              }
              return false;
            }
          });

          return (
            <SingleCheckbox
              key={idx}
              item={child}
              idx={idx}
              depth={depth + 1}
              val={found.checked}
              found={sub_found}
              onChange={(newval) => {
                onChange(val, child);
                render();
              }}
              render={render}
            />
          );
        })}
    </>
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
