import { FC, Fragment, MouseEvent } from "react";
import { useGlobal, useLocal } from "web-utils";
import { IItem } from "../../../../utils/types/item";
import { FMCompDef, FNCompDef } from "../../../../utils/types/meta-fn";
import { Menu, MenuItem } from "../../../../utils/ui/context-menu";
import { EDGlobal, IMeta, PG, active } from "../../logic/ed-global";
import { ChevronDown, ChevronRight } from "../tree/node/item/indent";
import { createEditScript } from "./prop-instance/edit-script";
import { EdPropInstanceButton } from "./prop-instance/prop-button";
import { EdPropInstanceCode } from "./prop-instance/prop-code";
import { EdPropInstanceFile } from "./prop-instance/prop-file";
import { EdPropInstanceOptions } from "./prop-instance/prop-option";
import { reset } from "./prop-instance/prop-reset";
import { EdPropInstanceText } from "./prop-instance/prop-text";
import { EdStyleAll } from "./style/side-all";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { PropItem } from "./prop-master/tree-item";

const w = window as any;

export const EdSidePropInstance: FC<{ meta: IMeta }> = ({ meta }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal(
    {
      rightClickEvent: null as any,
      pick: { mprop: null as any, name: "" },
      showJSX: false,
      expand: {
        prop: false,
        style: false,
      },
    },
    () => {
      local.expand.prop = true;
      if (localStorage.getItem("prop-instance-show-prop") === "false") {
        local.expand.prop = false;
      }

      local.expand.style = true;
      if (localStorage.getItem("prop-instance-show-style") === "false") {
        local.expand.style = false;
      }
      local.render();
    }
  );

  let _meta = meta;
  if (active.comp_id) {
    if (p.comp.list[active.comp_id]) {
      _meta = getCompMeta(p, meta);
    }
  }

  const item = _meta?.item as IItem;
  if (!item) return <>Warning: Item not found</>;
  if (!_meta.mitem)
    return (
      <div className="p-3 text-sm space-y-1 flex flex-col">
        <span>Warning: MItem Not Found</span>
        <hr />
        <span>This item is created on runtime</span>
      </div>
    );

  type SingleProp = { mprop: FMCompDef; cprop: FNCompDef; name: string };
  let filtered = [] as SingleProp[];

  const mprops = _meta.mitem?.get("component")?.get("props");
  const comp_id = _meta.mitem?.get("component")?.get("id") || "";

  if (!p.comp.list[comp_id]) return <>Warning: Component not found</>;
  const mcprops = p.comp.list[comp_id].doc
    .getMap("map")
    .get("root")
    ?.get("component")
    ?.get("props");

  if (mprops && _meta.mitem && mcprops) {
    mcprops.forEach((m, key): void => {
      let mprop = mprops.get(key);

      const cprop = m.toJSON() as any;
      const type = m.get("meta")?.get("type") || "text";
      const visible = m?.get("visible") || "";

      if (visible && visible !== "true") {
        try {
          const arg: any = { ...active.scope };
          if (meta.item.script?.props) {
            for (const [k, v] of Object.entries(meta.item.script?.props)) {
              if (v.value && v.value.length > 3) {
                try {
                  const evn = new Function("arg", `arg["${k}"] = ${v.value}`);
                  evn(arg);
                } catch (e) {}
              }
            }
          } else if (meta.item.component) {
            for (const [k, v] of Object.entries(meta.item.component.props)) {
              if (v.valueBuilt && v.valueBuilt.length > 3) {
                try {
                  const evn = new Function(
                    "arg",
                    `arg["${k}"] = ${v.valueBuilt}`
                  );
                  evn(arg);
                } catch (e) {
                  console.error(
                    `Error prop ${k} in item [${meta.item.name}], source:`,
                    v.valueBuilt
                  );
                  console.error(e);
                }
              }
            }
          }

          let visible_fn = null as any;
          try {
            visible_fn = new Function(...Object.keys(arg), `return ${visible}`);
            const res = visible_fn(...Object.values(arg));

            if (!res) {
              return;
            }
          } catch (e) {
            console.error("Failed to parse visible on prop: ", key);
            console.error(e);
          }
        } catch (e) {
          console.error(e);
          return;
        }
      }

      if (!local.showJSX && type === "content-element") {
        return;
      }

      if (!mprop) {
        const json = m.toJSON();
        const map = new Y.Map() as any;
        syncronize(map, json);
        mprops.set(key, map);
        filtered.push({ mprop: map, cprop, name: key });
      } else {
        filtered.push({ mprop, cprop, name: key });
      }
    });

    filtered = filtered.sort((a, b) => {
      const aidx = a.cprop.idx || 0;
      const bidx = b.cprop.idx || 0;
      return aidx - bidx;
    });
  }

  const grouped: Record<string, (SingleProp & { label: string })[]> = {};
  for (const item of filtered) {
    let [group, ...names] = item.name.split("__");
    let name = names.join("_");

    if (!name && !item.name.endsWith("__")) {
      name = group;
      group = "_";
    }

    if (!grouped[group]) {
      grouped[group] = [];
    }

    grouped[group].push({ ...item, label: name });
  }

  const expandable = item.component?.useStyle;
  const show_prop = !expandable || (expandable && local.expand.prop);
  const show_style = !expandable || (expandable && local.expand.style);

  let hide = localStorage.getItem("prasi-prop-hide")?.split(",") || [];

  return (
    <div className="flex flex-1 flex-col text-[12px]">
      <div
        className={cx(
          "flex border-b p-1 h-[28px] items-center bg-slate-50 justify-between select-none",
          expandable && "cursor-pointer hover:bg-blue-100"
        )}
        onClick={() => {
          if (expandable) {
            local.expand.prop = !local.expand.prop;
            localStorage.setItem(
              "prop-instance-show-prop",
              JSON.stringify(local.expand.prop)
            );
            local.render();
          }
        }}
      >
        {expandable && <>{!local.expand.prop ? <TriRight /> : <TriDown />}</>}
        <div className="flex-1 overflow-hidden mr-2 text-ellipsis whitespace-nowrap">
          {expandable ? _meta.item.name : `Props`}
        </div>
        {p.ui.comp_editable && (
          <div
            className="border px-1 cursor-pointer bg-white hover:bg-blue-100"
            onClick={() => {
              const item = _meta.item as IItem;

              const comp_id = item.component?.id;

              if (comp_id) {
                if (!p.comp.list[comp_id]) return;

                active.instance.item_id = item.id;
                active.instance.comp_id = active.comp_id;

                active.comp_id = comp_id || "";
                const root = p.comp.list[comp_id].tree.find(
                  (e) => e.parent === "root"
                );
                if (root && typeof root.id === "string") {
                  active.item_id = root.id || "";
                }

                p.render();
              }
            }}
          >
            Edit Component
          </div>
        )}
      </div>

      <div className="flex flex-1 relative overflow-y-auto overflow-x-hidden">
        <div className={cx("absolute inset-0")}>
          {local.rightClickEvent && (
            <Menu
              mouseEvent={local.rightClickEvent}
              onClose={() => {
                local.rightClickEvent = null;
                local.render();
              }}
            >
              <MenuItem
                label="Reset"
                onClick={() => {
                  if (local.pick.name) {
                    reset(p, comp_id, local.pick.mprop, local.pick.name);
                  }
                }}
              />
              <MenuItem
                label={"Edit Code"}
                onClick={createEditScript(
                  p,
                  "value",
                  local.pick.mprop,
                  local.pick.name
                )}
              />
            </Menu>
          )}
          {show_prop && (
            <>
              {filtered.length === 0 && (
                <div className="flex absolute inset-0 items-center justify-center">
                  No Prop Available
                </div>
              )}
              {Object.entries(grouped).map(([group, filtered]) => {
                const header = filtered.find((e) => e.name.endsWith("__"));
                if (group !== "_" && !header) {
                  return null;
                }

                return (
                  <Fragment key={group}>
                    {group !== "_" && (
                      <div
                        className={cx(
                          "border-b px-1 cursor-pointer py-1 hover:bg-blue-100 select-none flex items-center justify-between",
                          !hide.includes(group) && "bg-slate-50"
                        )}
                        onClick={() => {
                          if (hide.includes(group)) {
                            hide = hide.filter((e) => e !== group);
                          } else {
                            hide.push(group);
                          }

                          localStorage.setItem(
                            "prasi-prop-hide",
                            hide?.join(",")
                          );
                          local.render();
                        }}
                      >
                        <div className="flex items-center">
                          <div>{header?.cprop?.label || group}</div>
                          <div className="flex-1 pl-1">
                            {!hide.includes(group) ? (
                              <ChevronDown />
                            ) : (
                              <ChevronRight />
                            )}
                          </div>
                        </div>
                        {group.startsWith("$") && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();

                              if (group) {
                                const props = mcprops?.toJSON() as Record<
                                  string,
                                  FNCompDef
                                >;
                                const array_prop = {} as any;
                                for (const [k, v] of Object.entries(props)) {
                                  if (k.startsWith(group)) {
                                    array_prop[k] = v;
                                  }
                                }
                              }
                            }}
                            className="border rounded-md bg-white px-2 hover:bg-blue-500 hover:text-white"
                          >
                            + Add
                          </div>
                        )}
                      </div>
                    )}
                    <div className={cx(hide.includes(group) && "hidden")}>
                      {filtered.map(
                        ({ label: label_raw, name, mprop, cprop }) => {
                          if (name.endsWith("__")) return null;

                          const type = cprop.meta?.type || "text";
                          let hasCode = false;

                          const value = mprop.get("value") || "";
                          if (
                            !!value &&
                            (![`"`, "'", "`"].includes(value[0]) ||
                              ![`"`, "'", "`"].includes(
                                value[value.length - 1]
                              ))
                          ) {
                            hasCode = true;
                          }

                          if (value.length > 100) {
                            hasCode = true;
                          }
                          if (type === "file") {
                            if (!!value && !value.startsWith("siteurl("))
                              hasCode = true;
                            else hasCode = false;
                          }

                          if (type === "button") hasCode = false;

                          if (
                            type === "option" &&
                            cprop.meta?.option_mode === "checkbox"
                          ) {
                            hasCode = false;
                          }

                          const labelClick = (
                            e: MouseEvent<HTMLDivElement>
                          ) => {
                            e.preventDefault();
                            local.pick = { mprop, name };
                            if (local.rightClickEvent)
                              local.rightClickEvent = null;
                            else local.rightClickEvent = e;
                            local.render();
                          };

                          const label = cprop.label || label_raw;

                          return (
                            <div
                              key={name}
                              className="border-b text-[13px] relative hover:bg-orange-100 cursor-default flex items-stretch"
                              onContextMenu={labelClick}
                            >
                              {group !== "_" && (
                                <div className="pl-2 bg-slate-50 border-r"></div>
                              )}
                              <div className="flex-1">
                                {hasCode ? (
                                  <>
                                    <EdPropInstanceCode
                                      mprop={mprop}
                                      name={name}
                                      comp_id={comp_id}
                                      label={label}
                                      labelClick={labelClick}
                                      onEditCode={createEditScript(
                                        p,
                                        "value",
                                        mprop,
                                        name
                                      )}
                                    />
                                  </>
                                ) : (
                                  <>
                                    {type === "button" && (
                                      <EdPropInstanceButton
                                        meta={meta}
                                        cprop={cprop}
                                        mprop={mprop}
                                        label={label}
                                        name={name}
                                      />
                                    )}
                                    {type === "file" && (
                                      <EdPropInstanceFile
                                        mprop={mprop}
                                        label={label}
                                        name={name}
                                        labelClick={labelClick}
                                      />
                                    )}
                                    {type === "text" && (
                                      <EdPropInstanceText
                                        mprop={mprop}
                                        label={label}
                                        name={name}
                                        labelClick={labelClick}
                                      />
                                    )}
                                    {type === "option" && (
                                      <EdPropInstanceOptions
                                        mprop={mprop}
                                        meta={meta}
                                        cprop={cprop}
                                        label={label}
                                        name={name}
                                        labelClick={labelClick}
                                      />
                                    )}
                                    {type === "content-element" && (
                                      <div className="min-h-[28px] px-1 flex items-center">
                                        {name}
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </Fragment>
                );
              })}
            </>
          )}

          {item.component?.useStyle && (
            <div className={cx()}>
              <div
                className={cx(
                  "flex border-b p-1 h-[28px] items-center bg-slate-50 justify-between select-none",
                  expandable && "cursor-pointer hover:bg-blue-100"
                )}
                onClick={() => {
                  if (expandable) {
                    local.expand.style = !local.expand.style;
                    localStorage.setItem(
                      "prop-instance-show-style",
                      JSON.stringify(local.expand.style)
                    );
                    local.render();
                  }
                }}
              >
                {expandable && (
                  <>{!local.expand.style ? <TriRight /> : <TriDown />}</>
                )}

                <div className="flex-1 overflow-hidden mr-2 text-ellipsis whitespace-nowrap">
                  Component Style
                </div>
              </div>

              {show_style && <EdStyleAll as_child />}
            </div>
          )}

          <div className="p-2 text-gray-300">{comp_id}</div>
        </div>
      </div>
    </div>
  );
};

const getCompMeta = (p: PG, imeta: IMeta) => {
  let meta = null as unknown as IMeta;

  return imeta;
};

const TriRight = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 11L6 4L10.5 7.5L6 11Z" fill="currentColor"></path>
  </svg>
);

const TriDown = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path>
  </svg>
);
