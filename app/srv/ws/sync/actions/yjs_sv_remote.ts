import { SAction } from "../actions";
import { docs } from "../entity/docs";
import { gunzipAsync, gzipAsync } from "../entity/zlib";
import { SyncConnection } from "../type";

export const yjs_sv_remote: SAction["yjs"]["sv_remote"] = async function (
  this: SyncConnection,
  mode,
  id,
  sv,
  diff
) {
  if (!docs[mode][id]) {
    console.log(`sv_remote not found`, mode, id);
    return;
  }
  const doc = docs[mode][id].doc;
  const diff_local = Y.encodeStateAsUpdate(doc as any, await gunzipAsync(sv));
  Y.applyUpdate(doc as any, await gunzipAsync(diff), "local");
  return { diff: await gzipAsync(diff_local) };
};
