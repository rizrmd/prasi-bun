import { createId } from "@paralleldrive/cuid2";
import { syncronize } from "y-pojo";
import { IContent, MContent } from "../../../../../../../utils/types/general";
import { IItem } from "../../../../../../../utils/types/item";
import { IText } from "../../../../../../../utils/types/text";
import { getMetaById } from "../../../../../logic/active/get-meta";
import { PG } from "../../../../../logic/ed-global";
import { treeRebuild } from "../../../../../logic/tree/build";

export const edActionWrap = (p: PG, item: IText | IItem) => {
  const mitem = getMetaById(p, item.id)?.mitem;
  if (mitem) {
    mitem.parent.forEach((e: MContent, idx) => {
      if (e.get("id") === mitem.get("id")) {
        const json: IContent = {
          id: createId(),
          name: `Wrapped`,
          type: "item",
          childs: [e.toJSON() as IItem | IText],
        };
        const map = new Y.Map() as MContent;
        if (map) {
          syncronize(map as any, json);
          mitem.parent.delete(idx);
          mitem.parent.insert(idx, [map]);
          treeRebuild(p, { note: "wrap" });
        }
      }
    });
  }
};
