import { FC, MouseEvent } from "react";
import { useGlobal, useLocal } from "web-utils";
import { IItem } from "../../../../utils/types/item";
import { FMCompDef, FNCompDef } from "../../../../utils/types/meta-fn";
import { Menu, MenuItem } from "../../../../utils/ui/context-menu";
import { EDGlobal, IMeta, PG, active } from "../../logic/ed-global";
import { createEditScript } from "./prop-instance/edit-script";
import { EdPropInstanceCode } from "./prop-instance/prop-code";
import { EdPropInstanceOptions } from "./prop-instance/prop-option";
import { reset } from "./prop-instance/prop-reset";
import { EdPropInstanceText } from "./prop-instance/prop-text";

export const EdSidePropInstance: FC<{ meta: IMeta }> = ({ meta }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    rightClickEvent: null as any,
    pick: { mprop: null as any, name: "" },
    showJSX: false,
  });

  let _meta = meta;
  if (active.comp_id) {
    if (p.comp.list[active.comp_id]) {
      _meta = getCompMeta(p, meta);
    }
  }

  const item = _meta?.item as IItem;
  if (!item) return <>Warning: Item not found</>;
  if (!_meta.mitem) return <>Warning: MItem Not Found</>;

  let filtered = [] as { mprop: FMCompDef; cprop: FNCompDef; name: string }[];
  const mprops = _meta.mitem?.get("component")?.get("props");
  const comp_id = _meta.mitem?.get("component")?.get("id") || "";

  if (!p.comp.list[comp_id]) return <>Warning: Component not found</>;
  const mcprops = p.comp.list[comp_id].doc
    .getMap("map")
    .get("root")
    ?.get("component")
    ?.get("props");

  if (mprops && _meta.mitem && mcprops) {
    mcprops.forEach((m, key) => {
      let mprop = mprops.get(key);

      const cprop = m.toJSON() as any;
      const type = m.get("meta")?.get("type") || "text";
      const visible = mprop?.get("visible") || "";

      if (visible && visible !== "true") {
        try {
          const arg: any = {};
          if (meta.item.script?.props) {
            for (const [k, v] of Object.entries(meta.item.script?.props)) {
              eval(`arg.${k} = ${v.value}`);
            }
          }

          const visible_fn = new Function(
            ...Object.keys(arg),
            `return ${visible}`
          );
          const res = visible_fn(...Object.values(arg));
          if (!res) {
            return;
          }
        } catch (e) {
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
      const aidx = a.mprop.get("idx") || 0;
      const bidx = b.mprop.get("idx") || 0;
      return aidx - bidx;
    });
  }

  return (
    <div className="flex flex-1 flex-col text-[12px]">
      <div className="flex border-b p-1 h-[28px] items-center bg-slate-50 justify-between select-none">
        <div className="flex-1 overflow-hidden mr-2 text-ellipsis whitespace-nowrap">
          {_meta.item.name}
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
          {filtered.length === 0 && (
            <div className="flex absolute inset-0 items-center justify-center">
              No Prop Available
            </div>
          )}
          {filtered.map(({ name, mprop, cprop }) => {
            const type = cprop.meta?.type || "text";
            let hasCode = false;

            const value = mprop.get("value") || "";
            if (
              !!value &&
              (![`"`, "'", "`"].includes(value[0]) ||
                ![`"`, "'", "`"].includes(value[value.length - 1]))
            ) {
              hasCode = true;
            }
            if (value.length > 100) {
              hasCode = true;
            }
            const labelClick = (e: MouseEvent<HTMLDivElement>) => {
              e.preventDefault();
              local.pick = { mprop, name };
              local.rightClickEvent = e;
              local.render();
            };

            return (
              <div
                key={name}
                className="border-b text-[13px] relative hover:bg-orange-100 cursor-default"
                onContextMenu={labelClick}
              >
                {hasCode ? (
                  <>
                    <EdPropInstanceCode
                      mprop={mprop}
                      name={name}
                      labelClick={labelClick}
                      onEditCode={createEditScript(p, "value", mprop, name)}
                    />
                  </>
                ) : (
                  <>
                    {type === "text" && (
                      <EdPropInstanceText
                        mprop={mprop}
                        name={name}
                        labelClick={labelClick}
                      />
                    )}
                    {type === "option" && (
                      <EdPropInstanceOptions
                        mprop={mprop}
                        cprop={cprop}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

const getCompMeta = (p: PG, imeta: IMeta) => {
  let meta = null as unknown as IMeta;

  return imeta;
};
