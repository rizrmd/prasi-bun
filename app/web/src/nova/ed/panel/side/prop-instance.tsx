import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { IItem } from "../../../../utils/types/item";
import { FMCompDef } from "../../../../utils/types/meta-fn";
import { Menu, MenuItem } from "../../../../utils/ui/context-menu";
import { EDGlobal, EdMeta, active } from "../../logic/ed-global";
import { reset } from "./prop-instance/prop-reset";
import { EdPropInstanceText } from "./prop-instance/prop-text";
import { Loading } from "../../../../utils/ui/loading";

export const EdSidePropInstance: FC<{ meta: EdMeta }> = ({ meta }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    rightClickEvent: null as any,
    reset: { mprop: null as any, name: "" },
    showJSX: false,
  });

  const item = meta?.item as IItem;
  if (!item) return null;

  let filtered = [] as { mprop: FMCompDef; name: string }[];
  const mprops = meta.mitem?.get("component")?.get("props");
  const comp_id = meta.mitem?.get("component")?.get("id") || "";
  const mcprops = p.comp.list[comp_id].doc
    .getMap("map")
    .get("root")
    ?.get("component")
    ?.get("props");

  if (mprops && meta.mitem && mcprops) {
    mcprops.forEach((m, key) => {
      let mprop = mprops.get(key);

      const type = m.get("meta")?.get("type") || "text";
      if (meta.propvis) {
        if (meta.propvis[key] === false) return;
      }

      if (!local.showJSX && type === "content-element") {
        return;
      }

      if (!mprop) {
        const json = m.toJSON();
        const map = new Y.Map() as any;
        syncronize(map, json);
        mprops.set(key, map);
        filtered.push({ mprop: map, name: key });
      } else {
        filtered.push({ mprop, name: key });
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
          {meta.item.name}
        </div>
        <div
          className="border px-1 cursor-pointer bg-white hover:bg-blue-100"
          onClick={() => {
            const item = meta.item as IItem;

            const comp_id = item.component?.id;
            if (comp_id) {
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
      </div>

      <div className="flex flex-1 relative overflow-auto">
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
                  if (local.reset.name) {
                    reset(p, comp_id, local.reset.mprop, local.reset.name);
                  }
                }}
              />
              <MenuItem label={"Edit Code"} onClick={() => {}} />
            </Menu>
          )}
          {filtered.length === 0 && (
            <div className="flex absolute inset-0 items-center justify-center">
              No Prop Available
            </div>
          )}
          {filtered.map(({ name, mprop }) => {
            const type = mprop.get("meta")?.get("type") || "text";
            return (
              <div
                key={name}
                className="border-b text-[13px] relative"
                onContextMenu={(e) => {
                  e.preventDefault();
                  local.reset = { mprop, name };
                  local.rightClickEvent = e;
                  local.render();
                }}
              >
                <>
                  {type === "text" && (
                    <EdPropInstanceText mprop={mprop} name={name} />
                  )}
                  {type !== "text" && <div className="p-1">{name}</div>}
                </>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
