
import { SAction } from "../actions"; 
import { SyncConnection } from "../type";
export const code_action: SAction["code"]["action"] = async function (
  this: SyncConnection,
) {
  let result = null as unknown as Awaited<
    ReturnType<SAction["code"]["action"]>
  >;

  return result;
}