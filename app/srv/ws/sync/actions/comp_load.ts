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
  ids: string[]
) {
  const result: Record<string, IScopeComp> = {};
  for (const id of ids) {
    const root = await loadComponent(id, this);

    let ref = docs.comp[id];
    if (ref) {
      result[id] = await scanMeta(id, ref.doc, this);
    }
  }
  return result;
};

const scanMeta = async (id: string, doc: DComp, sync: SyncConnection) => {
  const scope = {};
  const scope_comps: IScopeComp = {};
  const loaded = new Set<string>();
  const mitem = doc.getMap("map").get("root");
  if (mitem) {
    const name = mitem.get("name") || "";
    await serverWalkLoad(mitem, scope_comps, sync, loaded);
    serverWalkMap(
      { sync, scope, scope_comps },
      {
        mitem,
        parent_item: { id: "root" },
        parent_ids: ["root"],
      }
    );

    const bin = Y.encodeStateAsUpdate(doc as any);
    const snapshot = await gzipAsync(bin);

    scope_comps[id] = { id, name, scope, snapshot };
  }

  return scope_comps;
};
