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
      mitem.doc?.transact(() => {
        mitem.parent.forEach((e, k) => {
          if (e == mitem) {
            deleteByParent(p, mitem, k);
          }
        });
      });
      p.render();
      await treeRebuild(p);
      p.render();
    }
  }
};

export const edActionDeleteById = async (p: PG, id: string) => {
  const meta = getMetaById(p, id);
  if (meta) {
    const mitem = meta.mitem;
    if (mitem) {
      mitem.doc?.transact(() => {
        mitem.parent.forEach((e, k) => {
          if (e == mitem) {
            deleteByParent(p, mitem, k);
          }
        });
      });
      p.render();
      await treeRebuild(p);
      p.render();
    }
  }
};

const deleteByParent = (p: PG, mitem: MItem, index: number) => {
  mitem.parent.delete(index);
};
