import { IContent } from "../../../../../../../utils/types/general";
import { getMetaById } from "../../../../../logic/active/get-meta";
import { PG } from "../../../../../logic/ed-global";
import { treeRebuild } from "../../../../../logic/tree/build";

export const edActionHide = (
  p: PG,
  item: IContent,
  mode = "toggle" as "toggle" | "switch"
) => {
  const mitem = getMetaById(p, item.id)?.mitem;
  if (mitem) {
    const hidden = mitem.get("hidden");
    if (!hidden) mitem.set("hidden", "all");
    else mitem.delete("hidden");
    treeRebuild(p, { note: "hidden" });
  }
};
