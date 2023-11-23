import { IScopeComp } from "../../../../web/src/nova/ed/logic/ed-global";
import { DComp } from "../../../../web/src/utils/types/root";
import { SAction } from "../actions";
import { loadComponent } from "../editor/load-component";
import { serverWalkLoad, serverWalkMap } from "../editor/load-page";
import { docs } from "../entity/docs";
import { gzipAsync } from "../entity/zlib";
import { SyncConnection } from "../type";

export const comp_load: SAction["comp"]["load"] = async function (
  this: SyncConnection,
  id: string
) {
  const root = await loadComponent(id, this);

  let ref = docs.comp[id];
  if (ref) {
    return scanMeta(id, ref.doc, this);
  }
};

const scanMeta = async (id: string, doc: DComp, sync: SyncConnection) => {
  const scope = {};
  const scope_comps: IScopeComp = {};
  const loaded = new Set<string>();
  const root = doc.getMap("map").get("root");
  if (root) {
    const name = root.get("name") || "";
    const childs = root.get("childs");
    if (childs) {
      await Promise.all(
        childs.map((m) => serverWalkLoad(m, scope_comps, sync, loaded))
      );
      childs.map((m, i) => {
        serverWalkMap(
          { sync, scope, scope_comps },
          {
            mitem: m,
            parent_item: { id: "root" },
            parent_ids: ["root"],
          }
        );
      });
    }

    const bin = Y.encodeStateAsUpdate(doc as any);
    const snapshot = await gzipAsync(bin);
    scope_comps[id] = { id, name, scope, snapshot };
  }

  return scope_comps;
};
