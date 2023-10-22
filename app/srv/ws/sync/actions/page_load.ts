import { syncronize } from "y-pojo";
import { SAction } from "../actions";
import { Y, docs } from "../entity/docs";
import { snapshot } from "../entity/snapshot";
import { ActionCtx } from "../type";
import { gzip } from "zlib";

export const page_load: SAction["page"]["load"] = async function (
  this: ActionCtx,
  id: string
) {
  let snap = snapshot.get("page", id);
  let ydoc = docs.page[id];

  if (!snap || !ydoc) {
    const page = await db.page.findFirst({ where: { id } });
    if (page) {
      const doc = new Y.Doc();
      let root = doc.getMap("map");
      syncronize(root, { id, root: page.content_tree });

      const um = new Y.UndoManager(root, { ignoreRemoteMapChanges: true });
      docs.page[id] = {
        doc: doc as any,
        id,
        um,
      };

      const bin = Y.encodeStateAsUpdate(doc);
      snapshot.set({
        bin,
        id,
        type: "page",
        name: page.name,
        ts: Date.now(),
        url: page.url,
      });

      return {
        id: id,
        url: page.url,
        name: page.name,
        snapshot: await gzipAsync(bin),
      };
    }
  }

  if (snap) {
    return {
      id: snap.id,
      url: snap.url,
      name: snap.name,
      snapshot: await gzipAsync(snap.bin),
    };
  }
};

const gzipAsync = (bin: Uint8Array) => {
  return new Promise<Buffer>((resolve, reject) => {
    gzip(bin, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
