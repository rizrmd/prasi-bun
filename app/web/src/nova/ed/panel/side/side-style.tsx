import { FC } from "react";
import { EDGlobal, IMeta, active } from "../../logic/ed-global";
import { useGlobal, useLocal } from "web-utils";
import { IItem } from "../../../../utils/types/item";
import { EdSidePropComp } from "./prop-master";
import { EdStyleAll } from "./style/side-all";
import { Popover } from "../../../../utils/ui/popover";

export const EdSideStyle: FC<{ meta: IMeta }> = ({ meta }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({ value: "" });

  const item = meta?.item as IItem;
  if (!item) return null;

  if (item.component?.id === active.comp_id && p.ui.side.prop) {
    return <EdSidePropComp meta={meta} />;
  }

  return (
    <div className="flex flex-1 items-stretch flex-col text-[12px]">
      <div className="flex border-b p-1 h-[28px] items-center bg-slate-50 justify-between select-none">
        <div className="flex-1 overflow-hidden mr-2 text-ellipsis whitespace-nowrap">
          {meta.jsx_prop?.name || item.name}
        </div>

        <Popover
          content={
            <textarea
              className={cx(
                "font-mono",
                css`
                  font-size: 11px;
                  width: 500px;
                  height: 500px;
                  margin: 5px 0px;
                `
              )}
              spellCheck={false}
              value={local.value}
            ></textarea>
          }
        >
          <div
            className="border px-1 py-[2px] cursor-pointer bg-white hover:bg-blue-100"
            onClick={() => {}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M4 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1" />
              <path d="M8 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1" />
            </svg>
          </div>
        </Popover>
        {item.component?.id === active.comp_id && (
          <div
            className="border px-1 cursor-pointer bg-white hover:bg-blue-100"
            onClick={() => {
              p.ui.side.prop = true;
              local.value = JSON.stringify(meta.item, null, 2);
              p.render();
            }}
          >
            Edit Props
          </div>
        )}
      </div>
      <EdStyleAll />
    </div>
  );
};
