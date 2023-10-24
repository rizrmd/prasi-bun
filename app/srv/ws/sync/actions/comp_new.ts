import { SAction } from "../actions";
import { SyncConnection } from "../type";

export const comp_new: SAction["comp"]["new"] = async function (
  this: SyncConnection,
  arg
) {
  console.log(arg);
};
