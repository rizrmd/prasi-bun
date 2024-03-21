import { SAction } from "../actions";
import { prepCodeSnapshot } from "../editor/code/prep-code";
import { SyncConnection } from "../type";

export const code_load: SAction["code"]["load"] = async function (
  this: SyncConnection,
  site_id,
  type
) {
  const snap = await prepCodeSnapshot(site_id, "site");

  return { id: site_id };
};
