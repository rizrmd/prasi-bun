import { EComp } from "../../../../web/src/nova/ed/logic/ed-global";
import { IRoot } from "../../../../web/src/utils/types/root";
import { docs } from "../entity/docs";
import { snapshot } from "../entity/snapshot";
import { gzipAsync } from "../entity/zlib";

export const prepareComponentForPage = async (page_id: string) => {
  const doc = docs.page[page_id].doc;
  const root = doc.getMap("map").get("root")?.toJSON() as IRoot;

  const result = {} as Record<string, EComp>;
  if (root.component_ids) {
    for (const id of root.component_ids) {
      const snap = snapshot.get("comp", id);
      if (snap) {
        result[id] = { id, snapshot: await gzipAsync(snap.bin) };
      }
    }
  }

  return result;
};
