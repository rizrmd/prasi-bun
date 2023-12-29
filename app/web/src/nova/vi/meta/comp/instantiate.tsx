import { createId } from "@paralleldrive/cuid2";
import { deepClone } from "web-utils";
import { IItem } from "../../../../utils/types/item";

export const instantiate = (arg: {
  item: IItem;
  item_comp: IItem;
  ids: Record<string, string>;
}) => {
  const { item, item_comp, ids } = arg;
  const newitem = deepClone(item_comp);

  walkChild(newitem, ids);

  if (item.id) {
    newitem.id = item.id;
  }

  if (newitem.component && item.component && newitem.component.props) {
    for (const k of Object.keys(newitem.component.props)) {
      if (item.component.props[k]) {
        newitem.component.props[k] = item.component.props[k];
      }
    }
  }

  for (const key of Object.keys(item)) {
    delete (item as any)[key];
  }

  for (const [k, v] of Object.entries(newitem)) {
    (item as any)[k] = v;
  }
};

export const walkChild = (item: IItem, ids: Record<string, string>) => {
  item.originalId = item.id;

  if (!ids[item.id]) {
    ids[item.id] = createId();
  }

  item.id = ids[item.id];

  if (item.childs) {
    for (const child of item.childs) {
      walkChild(child as IItem, ids);
    }
  }
};
