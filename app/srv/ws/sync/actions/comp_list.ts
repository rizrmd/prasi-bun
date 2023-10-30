
import { SAction } from "../actions"; 
import { SyncConnection } from "../type";
export const comp_list: SAction["comp"]["list"] = async function (
  this: SyncConnection,
) {
  let result = null as unknown as Awaited<
    ReturnType<SAction["comp"]["list"]>
  >;
  return result;
}