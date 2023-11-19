import { syncronize } from "y-pojo";
import { IItem } from "../../../../../../../utils/types/item";
import { PG } from "../../../../../logic/ed-global";
import { treeRebuild } from "../../../../../logic/tree/build";
import { fillID } from "../../../../../../../render/editor/tools/fill-id";

export const edActionDetach = (p: PG, item: IItem) => {
  const mitem = p.page.meta[item.id].mitem;
  if (mitem) {
    const compid = mitem.get("component")?.get("id");
    if (compid) {
      let comp = p.comp.list[compid].doc
        .getMap("map")
        .get("root")
        ?.toJSON() as IItem;

      if (comp) {
        fillID(comp);
        comp.id = item.id;
        if (comp.component) comp.component.id = "";
        mitem.doc?.transact(() => {
          mitem.parent.forEach((e, k) => {
            if (e.get("id") === mitem.get("id")) {
              mitem.parent.delete(k);
              const nmap = new Y.Map();
              syncronize(nmap, comp);
              mitem.parent.insert(k, [nmap]);
              console.log(nmap.toJSON());
            }
          });
        });
      }
      treeRebuild(p);
    }
  }
};
