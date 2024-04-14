import { NodeRender } from "@minoru/react-dnd-treeview";
import { FC } from "react";
import { useLocal } from "web-utils";
import { TypedMap } from "yjs-types";
import { MItem } from "../../../../../utils/types/item";
import { FMCompDef, FNCompDef } from "../../../../../utils/types/meta-fn";
import { Popover } from "../../../../../utils/ui/popover";
import { EdPropPopoverForm, propPopover } from "./prop-form";

export type PropItem = {
  name: string;
  mitem: MItem;
  mprop: FMCompDef;
  prop: FNCompDef;
};

export const EdPropCompTreeItem: FC<{
  node: Parameters<NodeRender<PropItem>>[0];
  params: Parameters<NodeRender<PropItem>>[1];
  render: () => void;
}> = ({ node, params, render }) => {
  const local = useLocal({ closing: false });

  if (node.id === "root") {
    return <></>;
  }

  let type = "TXT";
  if (node.data?.prop.meta?.type === "option") type = "OPT";
  else if (node.data?.prop.meta?.type === "file") type = "FILE";
  else if (node.data?.prop.meta?.type === "content-element") type = "JSX";

  const plabel = node.data?.prop.label;
  const label = (
    <div className="flex items-center justify-between flex-1">
      <div className="flex-1">
        {node.text}{" "}
        {plabel && <span className="border px-1 ml-2 text-xs">{plabel}</span>}
      </div>
      {node.data?.prop.typings && (
        <div className="text-[7px] h-[14px] px-1 border border-slate-400 ml-1 text-slate-500 flex items-center">
          Typed
        </div>
      )}
      <div className="text-[9px] h-[14px] px-1 border border-slate-400 ml-1 text-slate-500 flex items-center">
        {type}
      </div>
    </div>
  );
  return (
    <div className="flex items-stretch border-b text-[14px] min-h-[27px]">
      <div
        ref={params.handleRef}
        className="cursor-pointer flex items-center justify-center text-slate-300 hover:bg-blue-100 hover:text-slate-600 border-r"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 4.625C6.12132 4.625 6.625 4.12132 6.625 3.5C6.625 2.87868 6.12132 2.375 5.5 2.375C4.87868 2.375 4.375 2.87868 4.375 3.5C4.375 4.12132 4.87868 4.625 5.5 4.625ZM9.5 4.625C10.1213 4.625 10.625 4.12132 10.625 3.5C10.625 2.87868 10.1213 2.375 9.5 2.375C8.87868 2.375 8.375 2.87868 8.375 3.5C8.375 4.12132 8.87868 4.625 9.5 4.625ZM10.625 7.5C10.625 8.12132 10.1213 8.625 9.5 8.625C8.87868 8.625 8.375 8.12132 8.375 7.5C8.375 6.87868 8.87868 6.375 9.5 6.375C10.1213 6.375 10.625 6.87868 10.625 7.5ZM5.5 8.625C6.12132 8.625 6.625 8.12132 6.625 7.5C6.625 6.87868 6.12132 6.375 5.5 6.375C4.87868 6.375 4.375 6.87868 4.375 7.5C4.375 8.12132 4.87868 8.625 5.5 8.625ZM10.625 11.5C10.625 12.1213 10.1213 12.625 9.5 12.625C8.87868 12.625 8.375 12.1213 8.375 11.5C8.375 10.8787 8.87868 10.375 9.5 10.375C10.1213 10.375 10.625 10.8787 10.625 11.5ZM5.5 12.625C6.12132 12.625 6.625 12.1213 6.625 11.5C6.625 10.8787 6.12132 10.375 5.5 10.375C4.87868 10.375 4.375 10.8787 4.375 11.5C4.375 12.1213 4.87868 12.625 5.5 12.625Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      {node.data && propPopover.name === node.text ? (
        <Popover
          placement="left-start"
          initialOpen
          open
          popoverClassName="bg-white shadow-lg border border-slate-300"
          onOpenChange={(open) => {
            propPopover.name = "";
            render();
          }}
          content={
            <EdPropPopoverForm
              closing={local.closing}
              mprop={node.data?.mprop}
              name={node.text}
            />
          }
          className="flex-1 pl-1 hover:bg-blue-100 cursor-pointer items-center flex"
        >
          {label}
        </Popover>
      ) : (
        <div
          className="flex-1 pl-1 hover:bg-blue-100 cursor-pointer items-center flex"
          onClick={() => {
            propPopover.name = node.text;
            local.render();
          }}
        >
          {label}
        </div>
      )}
      <div
        className="flex p-1 hover:bg-red-500 hover:text-white items-center justify-center cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (confirm("Are you sure ?")) {
            const mprop = node.data?.mprop;
            if (mprop) {
              const parent = mprop.parent as TypedMap<
                Record<string, FMCompDef>
              >;
              parent.forEach((m, idx) => {
                if (mprop === m) {
                  parent.delete(idx);
                }
              });
            }
          }
        }}
      >
        <Trash />
      </div>
    </div>
  );
};

const Trash = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.5 1a.5.5 0 000 1h4a.5.5 0 000-1h-4zM3 3.5a.5.5 0 01.5-.5h8a.5.5 0 010 1H11v8a1 1 0 01-1 1H5a1 1 0 01-1-1V4h-.5a.5.5 0 01-.5-.5zM5 4h5v8H5V4z"
      clipRule="evenodd"
    ></path>
  </svg>
);
