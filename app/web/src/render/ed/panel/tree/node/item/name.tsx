import { NodeModel, RenderParams } from "@minoru/react-dnd-treeview";
import { EdMeta } from "../../../../logic/ed-global";

export const EdTreeName = ({
  node,
  prm,
}: {
  node: NodeModel<EdMeta>;
  prm: RenderParams;
}) => {
  const item = node.data?.item;
  if (!item) return <></>;
  return (
    <div className="text-[14px] flex items-center cursor-pointer flex-1">
      <div className="flex flex-col">
        {item.name}
        {/* <div className={"text-[11px] text-gray-500 -mt-1"}>{item.id}</div> */}
      </div>
    </div>
  );
};
