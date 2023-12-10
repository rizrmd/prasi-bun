import { createId } from "@paralleldrive/cuid2";
import { TypedMap } from "yjs-types";
import { IItem } from "../../../../../utils/types/item";

export const instantiate = (
  item: IItem,
  comp: IItem,
  ref_ids: Record<string, string>,
  mref_ids?: Record<string, string> & TypedMap<Record<string, string>>
) => {
  const newitem = structuredClone(comp);
  if (item.id) {
    newitem.id = item.id;
  }
  if (item.component) {
    newitem.component = item.component;
  }

  walkChild(newitem, ref_ids, mref_ids);
};

const walkChild = (
  item: IItem,
  ref_ids: Record<string, string>,
  mref_ids?: Record<string, string> & TypedMap<Record<string, string>>
) => {
  if (!ref_ids[item.id]) {
    ref_ids[item.id] = createId();
    mref_ids?.set(item.id, ref_ids[item.id]);
  }

  item.id = ref_ids[item.id];

  if (item.childs) {
    for (const child of item.childs) {
      walkChild(child as IItem, ref_ids, mref_ids);
    }
  }
};
