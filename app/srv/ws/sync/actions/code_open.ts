
import { SAction } from "../actions"; 
import { SyncConnection } from "../type";
export const code_open: SAction["code"]["open"] = async function (
  this: SyncConnection,
) {
  let result = null as unknown as Awaited<
    ReturnType<SAction["code"]["open"]>
  >;
  return result;
}