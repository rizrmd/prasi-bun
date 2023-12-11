import { createId } from "@paralleldrive/cuid2";
import { IContent, MContent } from "../../../../utils/types/general";
import { IItem } from "../../../../utils/types/item";
import { ISimpleMeta } from "./types";

const timeouts = {} as Record<string, any>;

export const applyRefIds = (
  item: IContent,
  mitem?: MContent,
  parent?: { instance?: IItem; minstance?: MContent },
  smeta?: Record<string, ISimpleMeta>
) => {
  const instance = parent?.instance;

  if (instance && instance.component) {
    const parentcomp = parent?.minstance?.get("component");
    let mref_ids = parentcomp?.get("ref_ids");

    const ref_ids = instance.component.ref_ids;

    if (ref_ids) {
      if (!ref_ids[item.id]) {
        ref_ids[item.id] = createId();

        // if (parentcomp) {
        //   clearTimeout(timeouts[instance.id]);
        //   timeouts[instance.id] = setTimeout(() => {
        //     if (mref_ids) {
        //       const mref_ids = new Y.Map() as any;
        //       syncronize(mref_ids, ref_ids);
        //       const parentcomp = parent?.minstance?.get("component");
        //       if (parentcomp) {
        //         parentcomp.set("ref_ids", mref_ids);
        //       }
        //     }
        //   }, 50);
        // }
      }

      if (ref_ids[item.id]) {
        if (!item.originalId) item.originalId = item.id;
        item.id = ref_ids[item.id];
      }
    }

    return { ref_ids, mref_ids };
  }
};
