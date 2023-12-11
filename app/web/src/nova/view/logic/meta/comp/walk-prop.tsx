import { IItem } from "../../../../../utils/types/item";
import { FNCompDef } from "../../../../../utils/types/meta-fn";

export const walkProp = (arg: {
  item: IItem;
  pcomp: { comp: IItem };
  each: (name: string, prop: FNCompDef) => void;
}) => {
  for (const [k, v] of Object.entries(arg.pcomp.comp.component?.props || {})) {
    const props = arg.item.component?.props;
    let prop = props?.[k];
    if (props) {
      if (!props[k]) {
        props[k] = v;
        prop = v;
      }
    }

    if (prop) {
      arg.each(k, prop);
    }
  }
};
