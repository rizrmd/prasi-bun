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
      {item.name}
    </div>
  );
};
