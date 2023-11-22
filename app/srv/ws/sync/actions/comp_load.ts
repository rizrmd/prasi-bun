import { SAction } from "../actions";
import { loadComponent } from "../editor/load-component";
import { SyncConnection } from "../type";

export const comp_load: SAction["comp"]["load"] = async function (
  this: SyncConnection,
  id: string
) {
  return await loadComponent(id, this);
};
