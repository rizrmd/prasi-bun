import { IContent } from "../../../../../../../utils/types/general";
import { PG } from "../../../../../logic/ed-global";
import { getMetaById } from "../../../../../logic/tree/build";

export const edActionHide = (
  p: PG,
  item: IContent,
  mode = "toggle" as "toggle" | "switch"
) => {
  const mitem = getMetaById(p, item.id)?.mitem;
  if (mitem) {
    const hidden = mitem.get("hidden");
    if (mode === "toggle") {
      if (!hidden) mitem.set("hidden", "all");
      else mitem.delete("hidden");
    } else {
      if (!hidden) mitem.set("hidden", "all");
      else if (hidden === "all") mitem.set("hidden", "only-editor");
      else if (hidden === "only-editor") mitem.delete("hidden");
    }
  }
};
