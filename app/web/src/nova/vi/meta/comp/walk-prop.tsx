import { createId } from "@paralleldrive/cuid2";
import { deepClone } from "web-utils";
import { IItem } from "../../../../utils/types/item";
import { FNCompDef } from "../../../../utils/types/meta-fn";

export const walkProp = (arg: {
  item: IItem;
  item_comp: IItem;
  instance: Record<string, string>;
  each: (name: string, prop: FNCompDef) => void;
}) => {
  const props = Object.entries(arg.item_comp.component?.props || {}).sort(
    (a, b) => {
      return a[1].idx - b[1].idx;
    }
  );
  for (const [k, v] of props) {
    let prop = deepClone(v);
    const props = arg.item.component?.props;
    if (props && props[k]) {
      prop.value = props[k].value;
      prop.valueBuilt = props[k].valueBuilt;
      if (props[k].content) {
        prop.content = props[k].content;
      }
    }

    if (prop) {
      arg.each(k, prop);
    }
  }
};
