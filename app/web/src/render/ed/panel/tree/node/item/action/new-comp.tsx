import { IItem } from "../../../../../../../utils/types/item";
import { PG } from "../../../../../logic/ed-global";

export const edActionNewComp = (p: PG, item: IItem) => {
  const mitem = p.page.meta[item.id].mitem;
  if (mitem) {
  }
};
