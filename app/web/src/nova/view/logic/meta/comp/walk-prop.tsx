import { IItem, MItem } from "../../../../../utils/types/item";
import { FMCompDef, FNCompDef } from "../../../../../utils/types/meta-fn";

export const walkProp = (arg: {
  item: IItem;
  mitem?: MItem;
  pcomp: { comp: IItem; mcomp?: MItem };
  each: (name: string, prop: FNCompDef, mprop?: FMCompDef) => void;
}) => {
  for (const [k, v] of Object.entries(arg.pcomp.comp.component?.props || {})) {
    let mprop = arg.mitem?.get("component")?.get("props")?.get(k);
    if (!mprop) {
      const map = new Y.Map() as any;
      syncronize(map, v);
      arg.mitem?.get("component")?.get("props")?.set(k, map);
      mprop = arg.mitem?.get("component")?.get("props")?.get(k);
    }

    const props = arg.item.component?.props;
    let prop = props?.[k];
    if (props) {
      if (!props[k]) {
        props[k] = v;
        prop = v;
      }
    }

    if (prop) {
      arg.each(k, prop, mprop);
    }
  }
};
