import { syncronize } from "y-pojo";
import { fillID } from "../../../../../../../render/editor/tools/fill-id";
import { IContent, MContent } from "../../../../../../../utils/types/general";
import { IItem } from "../../../../../../../utils/types/item";
import { getMetaById } from "../../../../../logic/active/get-meta";
import { PG } from "../../../../../logic/ed-global";
import { treeRebuild } from "../../../../../logic/tree/build";

export const edActionClone = (p: PG, item: IContent) => {
  const mitem = getMetaById(p, item.id)?.mitem;
  if (mitem) {
    mitem.doc?.transact(() => {
      mitem.parent.forEach((e: MContent, idx) => {
        if (e.get("id") === mitem.get("id")) {
          const json = e.toJSON() as IItem;
          fillID(json);
          if (json.component) json.component.ref_ids = {};
          const map = new Y.Map();
          syncronize(map, json);
          mitem.parent.insert(idx, [map]);
        }
      });
    });
    treeRebuild(p, { note: "clone" });
  }
};
