import { createId } from "@paralleldrive/cuid2";
import { IContent, MContent } from "../../../../utils/types/general";
import { IItem } from "../../../../utils/types/item";

export const applyRefIds = (item: IContent, parent?: { instance?: IItem }) => {
  const instance = parent?.instance;

  if (instance && instance.component) {
    const ref_ids = instance.component.ref_ids;

    if (ref_ids) {
      if (!ref_ids[item.id]) {
        ref_ids[item.id] = createId();
      }

      if (ref_ids[item.id]) {
        if (!item.originalId) item.originalId = item.id;
        item.id = ref_ids[item.id];
      }
    }

    return { ref_ids };
  }
};
