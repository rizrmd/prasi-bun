import { createId } from "@paralleldrive/cuid2";
import { IItem } from "../../../../../utils/types/item";

export const instantiate = (
  item: IItem,
  comp: IItem,
  ref_ids: Record<string, string>
) => {
  const newitem = structuredClone(comp);
  if (newitem.component) {
    newitem.component.ref_ids = {};
  }

  if (item.id) {
    newitem.id = item.id;
  }

  if (item.component) {
    newitem.component = item.component;
  }

  walkChild(newitem, ref_ids);

  for (const key of Object.keys(item)) {
    delete (item as any)[key];
  }

  for (const [k, v] of Object.entries(newitem)) {
    (item as any)[k] = v;
  }
};

const walkChild = (item: IItem, ref_ids: Record<string, string>) => {
  if (!ref_ids[item.id]) {
    ref_ids[item.id] = createId();
  }

  item.id = ref_ids[item.id];

  if (item.childs) {
    for (const child of item.childs) {
      walkChild(child as IItem, ref_ids);
    }
  }
};
