
import { SAction } from "../actions"; 
import { SyncConnection } from "../type";
export const page_list: SAction["page"]["list"] = async function (
  this: SyncConnection,
) {
  let result = null as unknown as Awaited<
    ReturnType<SAction["page"]["list"]>
  >;
  return result;
}