import { FC } from "react";
import { EDGlobal, EdMeta, active } from "../../logic/ed-global";
import { useGlobal } from "web-utils";
import { IItem } from "../../../../utils/types/item";
import { EdSidePropComp } from "./prop-master";

export const EdSideStyle: FC<{ meta: EdMeta }> = ({ meta }) => {
  const p = useGlobal(EDGlobal, "EDITOR");

  const item = meta?.item as IItem;
  if (!item) return null;

  if (item.component?.id === active.comp_id && p.ui.side.prop) {
    return <EdSidePropComp meta={meta} />;
  }

  return (
    <div className="flex flex-col text-[12px]">
      <div className="flex border-b p-1 h-[28px] items-center bg-slate-50 justify-between select-none">
        <div className="flex-1 overflow-hidden mr-2 text-ellipsis whitespace-nowrap">
          {item.name}
        </div>
        {item.component?.id === active.comp_id && (
          <div
            className="border px-1 cursor-pointer bg-white hover:bg-blue-100"
            onClick={() => {
              p.ui.side.prop = true;
              p.render();
            }}
          >
            Edit Props
          </div>
        )}
      </div>
    </div>
  );
};