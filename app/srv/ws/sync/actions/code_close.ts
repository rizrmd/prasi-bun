
import { SAction } from "../actions"; 
import { SyncConnection } from "../type";
export const code_close: SAction["code"]["close"] = async function (
  this: SyncConnection,
) {
  let result = null as unknown as Awaited<
    ReturnType<SAction["code"]["close"]>
  >;
  return result;
}