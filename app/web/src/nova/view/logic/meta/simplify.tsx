import { IItem } from "../../../../utils/types/item";
import { IMeta, ISimpleMeta } from "./types";

export const simplifyItem = (item: IItem) => {
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

function formatBytes(bytes: number, decimals: number) {
  if (bytes == 0) return "0 Bytes";
  var k = 1024,
    dm = decimals || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
