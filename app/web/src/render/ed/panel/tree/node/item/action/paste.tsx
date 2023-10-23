import { syncronize } from "y-pojo";
import { IContent } from "../../../../../../../utils/types/general";
import { MItem } from "../../../../../../../utils/types/item";
import { PG, active } from "../../../../../logic/ed-global";
import { treeRebuild } from "../../../../../logic/tree/build";
import { fillID } from "../../../../../../editor/tools/fill-id";

export const edActionPaste = async (p: PG, item: IContent) => {
  const mitem = p.page.meta[item.id].mitem;
  if (mitem) {
    const res = await navigator.clipboard.readText();
    if (typeof res === "string" && res.startsWith("prasi-clipboard:")) {
      const clip = JSON.parse(
        res.substring("prasi-clipboard:".length)
      ) as IContent;

      mitem.doc?.transact(() => {
        const mchilds = mitem.get("childs");
        if (mchilds) {
          let child: any = { ...clip };
          if (item.type === "section") {
            child = { ...clip, type: "item" };
          } else {
            if (item.type === "text") {
              (mitem as MItem).set("type", "item");
              item.type = "item" as any;
            }

            if (clip.type === "section") {
              child = { ...clip, type: "item" };
            }
          }
          const map = new Y.Map();
          const newchild = fillID(child);
          syncronize(map, newchild);
          mchilds.push([map]);
          active.item_id = newchild.id;
        }
      });
    }
    treeRebuild(p, { note: "paste" });
  }
};
