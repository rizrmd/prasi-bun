import { IScopeComp } from "../../../../web/src/nova/ed/logic/ed-global";
import { DComp } from "../../../../web/src/utils/types/root";
import { SAction } from "../actions";
import { loadComponent } from "../editor/load-component";
import { docs } from "../entity/docs";
import { gzipAsync } from "../entity/zlib";
import { SyncConnection } from "../type";

export const comp_load: SAction["comp"]["load"] = async function (
  this: SyncConnection,
  ids: string[]
) {
  const result: Record<string, IScopeComp> = {};
  for (const id of ids) {
  }
  return result;
};

const scanMeta = async (id: string, doc: DComp, sync: SyncConnection) => {};
