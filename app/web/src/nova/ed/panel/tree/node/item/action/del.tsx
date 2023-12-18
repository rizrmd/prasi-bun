import { IContent } from "../../../../../../../utils/types/general";
import { getMetaById } from "../../../../../logic/active/get-meta";
import { PG } from "../../../../../logic/ed-global";
import { treeRebuild } from "../../../../../logic/tree/build";

export const edActionDelete = async (p: PG, item: IContent) => {
  const meta = getMetaById(p, item.id);
  if (meta) {
    const mitem = meta.mitem;
    if (mitem) {
      mitem.parent.forEach((e, k) => {
        if (e == mitem) {
          mitem.parent.delete(k);
        }
      });
      await treeRebuild(p);
    }
  }
};
