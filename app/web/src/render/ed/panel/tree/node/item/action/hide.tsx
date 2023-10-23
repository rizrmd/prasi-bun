import { IContent } from "../../../../../../../utils/types/general";
import { PG } from "../../../../../logic/ed-global";

export const edActionHide = (p: PG, item: IContent) => {
  const mitem = p.page.meta[item.id].mitem;
  if (mitem) {
    const hidden = mitem.get("hidden");
    if (!hidden) mitem.set("hidden", "all");
    else if (hidden === "all") mitem.set("hidden", "only-editor");
    else if (hidden === "only-editor") mitem.delete("hidden");
  }
};
