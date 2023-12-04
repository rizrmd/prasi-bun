import { FC } from "react";
import { useGlobal } from "web-utils";
import { EDGlobal, EdMeta } from "../../logic/ed-global";

export const EdSidePropInstance: FC<{ meta: EdMeta }> = ({ meta }) => {
  const p = useGlobal(EDGlobal, "EDITOR");

  return (
    <div className="flex flex-col text-[12px]">
      <div className="flex border-b p-1 h-[35px] items-center bg-slate-50 justify-between select-none">
        <div className="flex-1 overflow-hidden mr-2 text-ellipsis whitespace-nowrap">
          {meta.item.name}
        </div>
        <div className="border px-1 cursor-pointer bg-white hover:bg-blue-100">
          Edit Component
        </div>
      </div>
    </div>
  );
};
