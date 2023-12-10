import { IItem } from "../../../../utils/types/item";

export const simplify = (item: IItem) => {
  const newitem = {} as any;
  for (const [k, v] of Object.entries(item)) {
    if (k === "childs") {
      newitem.childs = [];
      if (v && Array.isArray(v)) {
        for (const child of v) {
          newitem.childs.push({ id: child.id });
        }
      }
    } else {
      newitem[k] = v;
    }
  }
  return newitem as IItem;
};
