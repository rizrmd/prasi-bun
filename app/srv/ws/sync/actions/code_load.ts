import { DCode } from "../../../../web/src/utils/types/root";
import { SAction } from "../actions";
import { docs } from "../entity/docs";
import { SyncConnection } from "../type";
export const code_load: SAction["code"]["load"] = async function (
  this: SyncConnection,
  id,
  type
) {
  let result = null as unknown as Awaited<ReturnType<SAction["code"]["load"]>>;

  if (!docs.code[id]) {
    const src_doc = new Y.Doc() as DCode;
    const built_doc = new Y.Doc() as DCode;
    docs.code[id] = { id, src: src_doc, built: built_doc };
  }

  return result;
};
