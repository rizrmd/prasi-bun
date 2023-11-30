import { FC, Fragment, ReactNode } from "react";
import { useGlobal } from "web-utils";
import { EdMeta } from "../../../ed/logic/ed-global";
import { ViewGlobal } from "../../logic/global";
import { ViewMeta } from "./meta";

export const ViewMetaChildren: FC<{
  meta: EdMeta,
  className?: string
}> = ({
  meta,
  className
}) => {
    const v = useGlobal(ViewGlobal, "VIEW");
    const children: Record<string, ReactNode> = {};
    const item = meta.item;
    if (item.type !== "text") {
      for (const child of item.childs) {
        if (child.id) {
          children[child.id] = (<ViewMeta id={child.id} key={child.id} />);
        }
      }
    } else {
      if (item.id) {
        if (v.view.active?.text && v.view.active?.get(meta)) {
          children[item.id] = <Fragment key={item.id}>
            {v.view.active.text(meta)}
          </Fragment>;
        } else {
          children[item.id] = <span
            key={item.id}
            dangerouslySetInnerHTML={{ __html: item.html || '&nbsp;' }
            }>
          </span >;
        }
      }
    }

    return <>{item.id}{Object.values(children)}</>;
  };
