
import { SAction } from "../actions"; 
import { SyncConnection } from "../type";
export const code_create: SAction["code"]["create"] = async function (
  this: SyncConnection,
) {
  let result = null as unknown as Awaited<
    ReturnType<SAction["code"]["create"]>
  >;
  return result;
}