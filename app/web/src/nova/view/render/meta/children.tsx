import { FC, Fragment, ReactNode } from "react";
import { useGlobal } from "web-utils";
import { IItem } from "../../../../utils/types/item";
import { ISection } from "../../../../utils/types/section";
import { IText } from "../../../../utils/types/text";
import { ViewGlobal } from "../../logic/global";
import { ViewMeta } from "./meta";

export const ViewMetaChildren: FC<{ item: IItem | IText | ISection }> = ({
  item,
}) => {
  const v = useGlobal(ViewGlobal, "VIEW");
  const children: Record<string, ReactNode> = {};

  if (item.type !== "text") {
    for (const child of item.childs) {
      if (child.id) {
        children[child.id] = (<ViewMeta id={child.id} key={child.id} />);
      }
    }
  } else {
    if (item.id) {

      if (v.view.active?.text && v.view.active?.get(item)) {
        children[item.id] = <Fragment key={item.id}>
          {v.view.active.text(item)}
        </Fragment>;
      } else {
        children[item.id] = <span
          key={item.id}
          dangerouslySetInnerHTML={{ __html: item.html }
          }>
        </span >;
      }
    }
  }

  return <>{Object.values(children)}</>;
};
