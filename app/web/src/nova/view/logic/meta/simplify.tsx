import { IItem } from "../../../../utils/types/item";
import { IMeta, ISimpleMeta } from "./types";

export const simplifyItemChild = (item: IItem) => {
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

export const simplifyMeta = (allmeta: Record<string, IMeta>) => {
  const smeta = {} as Record<string, ISimpleMeta>;

  for (const [k, meta] of Object.entries(allmeta)) {
    smeta[k] = {
      id: meta.item.id,
      parent: meta.parent
        ? {
            id: meta.parent.id,
            comp_id: meta.parent.comp_id,
            instance_id: meta.parent.instance_id,
          }
        : undefined,
      comp: meta.item.component?.id
        ? { id: meta.item.component.id, ref_ids: meta.item.component.ref_ids }
        : undefined,
      scope: meta.scope.def,
    };
  }

  return smeta;
};
