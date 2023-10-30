
import { SAction } from "../actions"; 
import { SyncConnection } from "../type";
export const code_list: SAction["code"]["list"] = async function (
  this: SyncConnection,
) {
  let result = null as unknown as Awaited<
    ReturnType<SAction["code"]["list"]>
  >;
  return result;
}