import { createId } from "@paralleldrive/cuid2";
import { IContent, MContent } from "../../../../utils/types/general";
import { IItem } from "../../../../utils/types/item";

export const applyRefIds = (
  item: IContent,
  mitem?: MContent,
  parent?: { instance?: IItem; minstance?: MContent }
) => {
  const instance = parent?.instance;

  if (instance && instance.component) {
    let mref_ids = parent?.minstance?.get("component")?.get("ref_ids");
    if (!mref_ids) {
      mref_ids = new Y.Map() as any;
    }

    if (mref_ids) parent?.minstance?.get("component")?.set("ref_ids", mref_ids);

    const ref_ids = instance.component.ref_ids || {};
    if (!ref_ids[item.id]) {
      ref_ids[item.id] = createId();
      mref_ids?.set(item.id, ref_ids[item.id]);
    }

    if (ref_ids[item.id]) {
      if (!item.originalId) item.originalId = item.id;
      item.id = ref_ids[item.id];
      mitem?.set("id", item.id);
    }

    return { ref_ids, mref_ids };
  }
};
