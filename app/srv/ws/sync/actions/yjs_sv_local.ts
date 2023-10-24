import { SAction } from "../actions";
import { Y, docs } from "../entity/docs";
import { gunzipAsync, gzipAsync } from "../entity/zlib";
import { SyncConnection } from "../type";

export const yjs_sv_local: SAction["yjs"]["sv_local"] = async function (
  this: SyncConnection,
  mode,
  id,
  bin
) {
  if (!docs[mode][id]) {
    console.log(`sv_local not found`, mode, id);
    return;
  }
  const doc = docs[mode][id].doc as Y.Doc;

  const diff_remote = Y.encodeStateAsUpdate(doc, await gunzipAsync(bin));
  const sv_remote = Y.encodeStateVector(doc);
  return { diff: await gzipAsync(diff_remote), sv: await gzipAsync(sv_remote) };
};
