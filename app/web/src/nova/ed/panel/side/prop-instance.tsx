import { FC } from "react";
import { useGlobal } from "web-utils";
import { EDGlobal, EdMeta, active } from "../../logic/ed-global";
import { IItem } from "../../../../utils/types/item";

export const EdSidePropInstance: FC<{ meta: EdMeta }> = ({ meta }) => {
  const p = useGlobal(EDGlobal, "EDITOR");

  return (
    <div className="flex flex-col text-[12px]">
      <div className="flex border-b p-1 h-[35px] items-center bg-slate-50 justify-between select-none">
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
    </div>
  );
};
