import { SAction } from "../actions";
import { Y, docs } from "../entity/docs";
import { snapshot } from "../entity/snapshot";
import { gunzipAsync } from "../entity/zlib";
import { SyncConnection } from "../type";

export const yjs_diff_local: SAction["yjs"]["diff_local"] = async function (
  this: SyncConnection,
  mode,
  id,
  bin
) {
  if (!docs[mode][id]) {
    return;
  }
  const doc = docs[mode][id].doc as Y.Doc;
  const diff = await gunzipAsync(bin);

  const um = docs[mode][id].um;
  um.addTrackedOrigin(this.client_id);
  Y.applyUpdate(doc, diff, this.client_id);
};