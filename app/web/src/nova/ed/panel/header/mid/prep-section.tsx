import { createId } from "@paralleldrive/cuid2";
import { PG, active } from "../../../logic/ed-global";
import { ISection } from "../../../../../utils/types/section";
import { MContent } from "../../../../../utils/types/general";
import { fillID } from "../../../logic/tree/fill-id";

export const prepSection = (p: PG) => {
  const root = p.page.doc?.getMap("map").get("root");

  if (root) {
    const childs = root.get("childs");
    if (childs) {
      if (p.page.tree.length === 0) {
        const json = {
          id: createId(),
          name: `Section`,
          type: "section",
          dim: { w: "full", h: "full" },
          childs: [],
          adv: {
            css: "",
          },
        } as ISection;

        const map = new Y.Map() as MContent;
        syncronize(map as any, fillID(json));
        childs.push([map]);

        active.item_id = json.id;
      }
    }
  }
  return;
};
