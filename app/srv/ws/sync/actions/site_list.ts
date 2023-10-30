
import { SAction } from "../actions"; 
import { SyncConnection } from "../type";
export const site_list: SAction["site"]["list"] = async function (
  this: SyncConnection,
) {
  let result = null as unknown as Awaited<
    ReturnType<SAction["site"]["list"]>
  >;
  return result;
}