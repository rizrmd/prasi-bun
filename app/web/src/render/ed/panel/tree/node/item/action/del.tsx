import { IContent } from "../../../../../../../utils/types/general";
import { PG } from "../../../../../logic/ed-global";
import { treeRebuild } from "../../../../../logic/tree/build";

export const edActionDelete = async (p: PG, item: IContent) => {
  const mitem = p.page.meta[item.id].mitem;
  if (mitem) {
    mitem.parent.forEach((e, k) => {
      if (e == mitem) {
        mitem.parent.delete(k);
      }
    });
    await treeRebuild(p);
  }
};
