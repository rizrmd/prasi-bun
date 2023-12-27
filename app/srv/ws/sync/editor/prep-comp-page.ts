import { EComp } from "../../../../web/src/nova/ed/logic/ed-global";
import { DPage, IRoot } from "../../../../web/src/utils/types/root";
import { docs } from "../entity/docs";
import { snapshot } from "../entity/snapshot";
import { gzipAsync } from "../entity/zlib";
import { SyncConnection } from "../type";
import { loadComponent } from "./load-component";
import { loadCompForPage } from "./prep-page";

export const prepareComponentForPage = async (
  page_id: string,
  sync: SyncConnection,
  reload_components: boolean,
  doc?: DPage
) => {
  const _doc = doc ? doc : docs.page[page_id].doc;
  const root = _doc.getMap("map").get("root")?.toJSON() as IRoot;

  const result = {} as Record<string, EComp>;

  if (reload_components) {
    root.component_ids = await loadCompForPage(root, sync);
    if (doc) {
      _doc.getMap("map").get("root")?.set("component_ids", root.component_ids);
    }
  }

  if (root.component_ids) {
    for (const id of root.component_ids) {
      if (!docs.comp[id]) {
        await loadComponent(id, sync);
      }
      const snap = snapshot.get("comp", id);
      if (snap) {
        result[id] = { id, snapshot: await gzipAsync(snap.bin) };
      }
    }
  }

  return result;
};
