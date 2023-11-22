import {
  EdMeta,
  IScope,
  IScopeComp,
} from "../../../../web/src/nova/ed/logic/ed-global";
import { ensurePropContent } from "../../../../web/src/nova/ed/logic/tree/sync-walk-utils";
import { MItem } from "../../../../web/src/utils/types/item";
import { FNComponent } from "../../../../web/src/utils/types/meta-fn";
import { docs } from "../entity/docs";
import { SyncConnection } from "../type";
import { loadComponent } from "./load-component";

export const serverWalkLoad = async (
  mitem: MItem,
  sync: SyncConnection,
  loaded: Set<string>
) => {
  const mcomp = mitem.get("component");
  if (mcomp) {
    const id = mcomp.get("id");
    const comp = mcomp.toJSON() as FNComponent;
    if (id) {
      const isFirstLoaded = !loaded.has(id);
      loaded.add(id);
      if (!docs.comp[id]) {
        await loadComponent(id, sync);
      }

      const pcomp = docs.comp[id];
      if (pcomp) {
        const pitem = pcomp.doc.getMap("map").get("root");
        if (pitem && isFirstLoaded) {
          await serverWalkLoad(pitem, sync, loaded);
        }
      }
    }

    for (const [propName, prop] of Object.entries(comp.props || {})) {
      if (prop.meta?.type === "content-element") {
        const mprop = mcomp.get("props")?.get(propName);
        if (mprop) {
          const mcontent = ensurePropContent(mprop, propName);
          if (mcontent) {
            await serverWalkLoad(mcontent, sync, loaded);
          }
        }
      }
    }
  }

  for (const e of mitem.get("childs")?.map((e) => e) || []) {
    await serverWalkLoad(e, sync, loaded);
  }
};

export const serverWalkMap = async (
  p: {
    sync: SyncConnection;
    scope: IScope;
    scope_comps: IScopeComp;
  },
  arg: {
    isLayout: boolean;
    mitem: MItem;
    portal: {
      in: Record<string, EdMeta>;
      out: Record<string, EdMeta>;
    };
    parent_item: EdMeta["parent_item"];
    parent_mcomp?: EdMeta["parent_mcomp"];
  }
) => {};
