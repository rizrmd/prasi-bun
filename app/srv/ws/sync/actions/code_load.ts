import { SAction } from "../actions";
import { SyncConnection } from "../type";

export const code_load: SAction["code"]["load"] = async function (
  this: SyncConnection,
  site_id,
  type
) {
  return { id: site_id };
};
