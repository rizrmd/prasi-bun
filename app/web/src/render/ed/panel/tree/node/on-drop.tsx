import { DropOptions, NodeModel } from "@minoru/react-dnd-treeview";
import { EdMeta } from "../../../logic/ed-global";

export const nodeOnDrop: (
  tree: NodeModel<EdMeta>[],
  options: DropOptions<EdMeta>
) => void = () => {};
