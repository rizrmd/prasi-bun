import { SAction } from "../actions";
import { conns } from "../entity/conn";
import { SyncConnection } from "../type";

export const client_info: SAction["client"]["info"] = async function (
  this: SyncConnection,
  ids
) {
  const result = {} as any;
  for (const client_id of ids) {
    const user = conns.get(client_id)?.user;
    if (user) {
      result[client_id] = { id: user.id, username: user.username };
    }
  }

  return result;
};
