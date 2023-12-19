import { EComp } from "../../../../web/src/nova/ed/logic/ed-global";
import { genMeta } from "../../../../web/src/nova/vi/meta/meta";
import { IItem } from "../../../../web/src/utils/types/item";
import { SAction } from "../actions";
import { loadComponent, userSyncComponent } from "../editor/load-component";
import { parseJs } from "../editor/parser/parse-js";
import { docs } from "../entity/docs";
import { snapshot } from "../entity/snapshot";
import { gzipAsync } from "../entity/zlib";
import { SyncConnection } from "../type";

export const comp_load: SAction["comp"]["load"] = async function (
  this: SyncConnection,
  comp_ids: string[],
  sync
) {
  const result: Record<string, EComp> = {};
  const loading = {} as Record<string, Promise<void>>;

  for (const id of comp_ids) {
    if (!docs.comp[id]) {
      if (typeof loading[id] === "undefined") {
        loading[id] = new Promise<void>(async (resolve) => {
          await loadComponent(id, sync ? this : undefined);
          resolve();
        });
      }
      await loading[id];
    } else {
      if (sync) {
        userSyncComponent(this, id);
      }
    }

    const snap = snapshot.get("comp", id);
    if (snap) {
      const meta = {};
      const item = docs.comp[id].doc
        .getMap("map")
        .get("root")
        ?.toJSON() as IItem;

      genMeta(
        {
          comps: {},
          meta,
          on: {
            visit(meta) {
              if (typeof meta.item.adv?.js === "string") {
                meta.scope.def = parseJs(meta.item.adv?.js);
              }
            },
          },
        },
        { item }
      );

      result[id] = {
        id,
        meta,
        snapshot: await gzipAsync(snap.bin),
      };
    }
  }
  return result;
};
