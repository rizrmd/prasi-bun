import { SAction } from "../actions";
import { getCode, prepDCode } from "../editor/code/prep-code";
import { SyncConnection } from "../type";

export const code_load: SAction["code"]["load"] = async function (
  this: SyncConnection,
  site_id,
  type
) {
  const code = await getCode(site_id, "site");

  if (code) {
    const prep = await prepDCode(site_id);
    if (prep) {
      return { id: site_id, snapshot: prep.bin[type] };
    }
  }

  return { id: site_id, snapshot: null };
};
