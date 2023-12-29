import { IContent } from "../../../../../../../utils/types/general";
import { IItem, MItem } from "../../../../../../../utils/types/item";
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
          deleteByParent(p, mitem, k);
        }
      });
    }
  }
};

export const edActionDeleteById = async (p: PG, id: string) => {
  const meta = getMetaById(p, id);
  if (meta) {
    const mitem = meta.mitem;
    if (mitem) {
      mitem.parent.forEach((e, k) => {
        if (e == mitem) {
          deleteByParent(p, mitem, k);
        }
      });
    }
  }
};

const deleteByParent = (p: PG, mitem: MItem, index: number) => {
  const mchild = mitem.parent.get(index);
  mitem.parent.delete(index);
  treeRebuild(p);
};
