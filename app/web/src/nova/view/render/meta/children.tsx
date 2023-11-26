import { FC, ReactNode } from "react";
import { IItem } from "../../../../utils/types/item";
import { IText } from "../../../../utils/types/text";
import { ISection } from "../../../../utils/types/section";
import { ViewMeta } from "./meta";
import { useGlobal } from "web-utils";
import { ViewGlobal } from "../../logic/global";

export const ViewMetaChildren: FC<{ item: IItem | IText | ISection }> = ({
  item,
}) => {
  const v = useGlobal(ViewGlobal, "VIEW");
  const children: ReactNode[] = [];

  if (item.type !== "text") {
    for (const child of item.childs) {
      children.push(<ViewMeta id={child.id} key={child.id} />);
    }
  } else {
    return <span dangerouslySetInnerHTML={{ __html: item.html }}></span>;
  }

  return <>{children}</>;
};
