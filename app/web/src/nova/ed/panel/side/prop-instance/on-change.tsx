import { IItem } from "../../../../../utils/types/item";
import { FNComponent } from "../../../../../utils/types/meta-fn";
import { devItem, PrasiEdit } from "../../../../vi/render/script/item-dev";
import { getActiveMeta } from "../../../logic/active/get-meta";
import { PG } from "../../../logic/ed-global";

export const propInstanceOnChange = (p: PG, name: string, value: any) => {
  const meta = getActiveMeta(p);

  if (meta && meta.item.component) {
    const comp = p.comp.list[meta.item.component.id]?.doc
      .getMap("map")
      .get("root")
      ?.get("component")
      ?.toJSON() as FNComponent;

    if (comp) {
      const prop = comp.props[name];
      if (prop && prop.onChangeBuilt && meta.mitem) {
        const gen_fn = new Function(`return ${prop.onChangeBuilt}`);
        const fn = gen_fn() as (arg: {
          name: string;
          value: any;
          item: IItem & PrasiEdit;
        }) => void;

        fn({
          name,
          value,
          item: devItem(p.page.meta, meta.mitem, p.page.cur.id),
        });
      }
    }
  }
};
