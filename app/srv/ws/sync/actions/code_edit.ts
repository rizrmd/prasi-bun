import { SAction } from "../actions";
import { SyncConnection } from "../type";

export const code_edit: SAction["code"]["edit"] = async function (
  this: SyncConnection,
  arg
) {
  if (arg.type === 'adv') {
    const { item_id, mode, comp_id, page_id } = arg;
  }

  return false;
};
