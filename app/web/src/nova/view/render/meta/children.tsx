import { FC, ReactNode } from "react";
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
  const children: ReactNode[] = [];

  if (item.type !== "text") {
    let i = 1;
    for (const child of item.childs) {
      children.push(<ViewMeta id={child.id} key={child.id || i++} />);
    }
  } else {
    return <span key={item.id} dangerouslySetInnerHTML={{ __html: item.html }}></span>;
  }

  return <>{children}</>;
};
