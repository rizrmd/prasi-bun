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
  newitem.hidden = item.hidden;

  if (newitem.component) {
    if (newitem.component.props && item.component && item.component.props) {
      for (const k of Object.keys(newitem.component.props)) {
        const cprop = item.component.props[k];
        const nprop = newitem.component.props[k];
        if (cprop) {
          nprop.value = cprop.value;
          nprop.valueBuilt = cprop.valueBuilt;
          nprop.jsxCalledBy = cprop.jsxCalledBy;
          nprop.content = cprop.content;
        }
      }
    }
    newitem.component.instances = item.component?.instances;
    newitem.component.style = item.component?.style;
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
