import {
  ensureMItemProps,
  ensureMProp,
  ensurePropContent,
} from "../../../../web/src/nova/ed/logic/tree/sync-walk-utils";
import { IItem, MItem } from "../../../../web/src/utils/types/item";
import {
  FNCompDef,
  FNComponent,
} from "../../../../web/src/utils/types/meta-fn";
import { parseJs } from "./parser/parse-js";

export const extractMItemProps = (arg: {
  mitem: MItem;
  item: IItem;
  item_comp: FNComponent;
  mcomp: MItem;
  scope: Exclude<ReturnType<typeof parseJs>, undefined>;
  content_scope?: Record<string, string>;
  mcontent: (mcontent: MItem, prop_name: string) => void;
}) => {
  const { mitem, item, content_scope, item_comp, mcomp, scope } = arg;

  const mitem_comp = mitem.get("component");
  const mprops = mcomp.get("component")?.get("props")?.toJSON() as Record<
    string,
    FNCompDef
  >;
  if (mitem_comp) {
    const mitem_props = ensureMItemProps(mitem_comp, item_comp);
    if (mitem_props && mprops) {
      for (const [k, v] of Object.entries(mprops)) {
        scope.props[k] = { name: k, value: `null as any` };
        const mprop = ensureMProp(mitem_props, k, v);

        parseJs(v.value, { item, content_scope });

        item_comp.props[k] = v;
        if (mprop && v.meta?.type === "content-element") {
          scope.props[k].value = "null as ReactElement";
          const mcontent = ensurePropContent(mprop, k);
          if (mcontent) {
            arg.mcontent(mcontent, k);
          }
        }
      }
    }
  }
};
