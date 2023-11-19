import { FC } from "react";
import { useGlobal } from "web-utils";
import { ViewGlobal } from "../../logic/global";
import { ViewMetaRender } from "./render";
import { ViewMetaScript } from "./script";

export const ViewMeta: FC<{ id: string; scopeIndex?: Record<string, any> }> = ({
  id,
  scopeIndex,
}) => {
  const v = useGlobal(ViewGlobal, "VIEW");

  const meta = v.meta[id];
  if (!meta) return null;

  const item = meta.item;

  if (item.hidden && v.view.hidden) {
    if (v.view.hidden(item)) {
      return null;
    }
  }

  if (item.adv) {
    if (item.adv.js && item.adv.jsBuilt) {
      return <ViewMetaScript v={v} item={item} scopeIndex={scopeIndex} />;
    }
  }

  return <ViewMetaRender item={item} v={v} />;
};
