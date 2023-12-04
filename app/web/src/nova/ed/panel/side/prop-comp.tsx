import { useGlobal } from "web-utils";
import { EDGlobal, EdMeta } from "../../logic/ed-global";
import { IItem } from "../../../../utils/types/item";
import { FC } from "react";

export const EdSidePropComp: FC<{ meta: EdMeta }> = ({ meta }) => {
  const p = useGlobal(EDGlobal, "EDITOR");

  const item = meta?.item as IItem;
  if (!item) return null;

  return (
    <div className="flex flex-col text-[12px]">
      <div className="flex border-b p-1 h-[35px] items-center bg-slate-50 justify-between select-none">
        <div className="flex-1 overflow-hidden mr-2 text-ellipsis whitespace-nowrap">
          {item.name}
        </div>
        <div
          className="border px-1 cursor-pointer bg-white hover:bg-blue-100"
          onClick={() => {
            p.ui.side.prop = false;
            p.render();
          }}
        >
          Close
        </div>
      </div>
      <div className="flex flex-1 relative overflow-auto">
        <div className="absolute inset-0"></div>
      </div>
    </div>
  );
};
