import { syncronize } from "y-pojo";
import { IContent, MContent } from "../../../../../../../utils/types/general";
import { IItem } from "../../../../../../../utils/types/item";
import { getMetaById } from "../../../../../logic/active/get-meta";
import { PG } from "../../../../../logic/ed-global";
import { treeRebuild } from "../../../../../logic/tree/build";

export const edActionUnwrap = (p: PG, item: IItem) => {
  const mitem = getMetaById(p, item.id)?.mitem;
  if (mitem) {
    mitem.parent.forEach((e: MContent, idx) => {
      if (e.get("id") === mitem.get("id")) {
        const json = e.toJSON() as IContent;
        if (json.type === "item") {
          mitem.parent.delete(idx);
          mitem.parent.insert(
            idx,
            json.childs.map((e) => {
              const map = new Y.Map() as MContent;
              syncronize(map as any, e);
              return map;
            })
          );
          treeRebuild(p, { note: "unwrap" });
        }
      }
    });
  }
};
