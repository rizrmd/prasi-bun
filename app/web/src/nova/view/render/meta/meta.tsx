import { FC, useState } from "react";
import { useGlobal } from "web-utils";
import { ViewGlobal } from "../../logic/global";
import { ViewMetaRender } from "./render";
import { ViewMetaScript } from "./script";
import { compPropVal } from "./script/comp-propval";

export const ViewMeta: FC<{ id: string; scopeIndex?: Record<string, any> }> = ({
  id,
  scopeIndex,
}) => {
  const v = useGlobal(ViewGlobal, "VIEW");
  const [, _render] = useState({});

  const meta = v.meta[id];

  if (!meta) return null;
  meta.render = () => _render({});

  const item = meta.item;

  if (item.type === "item" && item.component?.id) {
    compPropVal(v, meta);
  }

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

  return <ViewMetaRender meta={meta} v={v} />;
};
