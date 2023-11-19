import hash_sum from "hash-sum";
import { FC } from "react";
import { createAPI, createDB } from "../../../../utils/script/init-api";
import { IItem } from "../../../../utils/types/item";
import { ISection } from "../../../../utils/types/section";
import { IText } from "../../../../utils/types/text";
import { VG } from "../../logic/global";
import { extractNavigate, preload } from "../../logic/router";
import { ViewMetaRender } from "./render";
import { createLocal } from "./script/create-local";
import { createPassProp } from "./script/create-pass-prop";

export const ViewMetaScript: FC<{
  v: VG;
  item: IItem | IText | ISection;
  scopeIndex?: Record<string, any>;
}> = ({ item, v, scopeIndex }) => {
  const js = item.adv?.jsBuilt;
  const meta = v.meta[item.id];
  if (js && meta) {
    if (!meta.memoize) {
      meta.memoize = {};
    }
    const memoizeKey = hash_sum(scopeIndex) || "default";
    if (!meta.memoize[memoizeKey]) {
      meta.memoize[memoizeKey] = {
        Local: createLocal(v, item.id, scopeIndex),
        PassProp: createPassProp(v, item.id, scopeIndex),
      };
    }

    const _js = item.adv?.js;
    if (typeof _js === "string") {
      const navs = extractNavigate(_js || "");
      if (navs.length > 0) {
        navs.map((nav) => preload(v, nav));
      }
    }

    if (v.script.api_url) {
      if (!v.script.db) v.script.db = createDB(v.script.api_url);
      if (!v.script.api) v.script.api = createAPI(v.script.api_url);
    }

    
  }

  return <ViewMetaRender item={item} v={v} />;
};
