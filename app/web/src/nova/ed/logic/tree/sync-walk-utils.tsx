import { createId } from "@paralleldrive/cuid2";
import { TypedMap } from "yjs-types";
import { MItem } from "../../../../utils/types/item";
import {
  FMCompDef,
  FMComponent,
  FNCompDef,
  FNComponent,
} from "../../../../utils/types/meta-fn";

export const ensurePropContent = (mprop: FMCompDef, k: string) => {
  let mcontent = mprop.get("content");
  if (!mcontent) {
    const newcontent = new Y.Map();
    syncronize(newcontent, {
      id: createId(),
      name: k,
      type: "item",
      dim: { w: "full", h: "full" },
      childs: [],
      adv: {
        css: "",
      },
    });
    mprop.set("content", newcontent as MItem);
    mcontent = mprop.get("content");
  }
  return mcontent;
};

export const ensureMItemProps = (
  mitem_comp: FMComponent,
  item_comp: FNComponent
) => {
  let mitem_props = mitem_comp.get("props");
  if (!mitem_props) {
    mitem_comp.set("props", new Y.Map() as any);
    mitem_props = mitem_comp.get("props");
  }
  if (!item_comp.props) {
    item_comp.props = {};
  }
  return mitem_props;
};

export const ensureMProp = (
  mitem_props: TypedMap<Record<string, FMCompDef>>,
  k: string,
  v: FNCompDef
) => {
  let mprop = mitem_props.get(k);
  if (!mprop) {
    const newprop = new Y.Map();
    syncronize(newprop, v);
    mitem_props.set(k, newprop as FMCompDef);
    mprop = mitem_props.get(k);
  }
  return mprop;
};
