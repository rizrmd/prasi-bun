import { FC } from "react";
import { IItem } from "../../../../utils/types/item";
import { ISection } from "../../../../utils/types/section";
import { IText } from "../../../../utils/types/text";
import { VG } from "../../logic/global";
import { ViewMetaRender } from "./render";

export const ViewMetaScript: FC<{
  v: VG;
  item: IItem | IText | ISection;
}> = ({ item, v }) => {
  return <ViewMetaRender item={item} v={v} />;
};
