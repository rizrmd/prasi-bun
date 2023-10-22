import { SAction } from "../actions";
import { Y, docs } from "../entity/docs";
import { snapshot } from "../entity/snapshot";
import { gunzipAsync } from "../entity/zlib";
import { ActionCtx } from "../type";

export const yjs_diff_local: SAction["yjs"]["diff_local"] = async function (
  this: ActionCtx,
  mode,
  id,
  bin
) {
  if (!docs[mode][id]) {
    return;
  }
  const doc = docs[mode][id].doc as Y.Doc;
  const diff = await gunzipAsync(bin);
  Y.applyUpdate(doc, diff);

  const save = Y.encodeStateAsUpdate(doc);
  snapshot.set(mode, id, "bin", save);
};
