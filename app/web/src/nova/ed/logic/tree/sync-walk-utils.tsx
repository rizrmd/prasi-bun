import { createId } from "@paralleldrive/cuid2";
import { MItem } from "../../../../utils/types/item";
import { FMCompDef } from "../../../../utils/types/meta-fn";

export const ensurePropContent = (mprop: FMCompDef, k: string) => {
  let mcontent = mprop.get("content");
  if (!mcontent) {
    const newcontent = new Y.Map();
    syncronize(newcontent, {
      id: createId(),
      name: k,
      type: "item",
      dim: { w: "full", h: "full" },
      childs: [],
      adv: {
        css: "",
      },
    });
    mprop.set("content", newcontent as MItem);
    mcontent = mprop.get("content");
  }
  return mcontent;
};
