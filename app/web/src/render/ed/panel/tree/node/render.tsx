import { NodeRender } from "@minoru/react-dnd-treeview";
import { EdMeta } from "../../../logic/ed-global";
import { EdTreeAction } from "./item/action";
import { EdTreeCtxMenu } from "./item/ctx-menu";
import { EdTreeIndent } from "./item/indent";
import { EdTreeName } from "./item/name";
import { indentHook } from "./item/indent-hook";

export const nodeRender: NodeRender<EdMeta> = (node, prm) => {
  if (!node || !node.data) return <></>;
  const item = node.data?.item;
  return (
    <div className={cx("border-b flex items-stretch hover:bg-blue-50")}>
      <EdTreeCtxMenu node={node} prm={prm} />
      <EdTreeIndent node={node} prm={prm} />
      <EdTreeName node={node} prm={prm} />
      <EdTreeAction node={node} prm={prm} />
    </div>
  );
};
