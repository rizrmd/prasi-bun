import { syncronize } from "y-pojo";
import { docs } from "../entity/docs";
import { snapshot } from "../entity/snapshot";
import { ActionCtx } from "../type";

export const comp_load = async function (this: ActionCtx, id: string) {
  let snap = snapshot.get("comp", id);
  let ydoc = docs.comp[id];

  if (!snap || !ydoc) {
    const comp = await db.component.findFirst({ where: { id } });
    if (comp) {
      const doc = new Y.Doc();
      let root = doc.getMap("map");
      syncronize(root, { id, item: comp.content_tree });

      const um = new Y.UndoManager(root, { ignoreRemoteMapChanges: true });
      docs.comp[id] = {
        doc: doc as any,
        id,
        um,
      };

      const bin = Y.encodeStateAsUpdate(doc);
      snapshot.update({
        bin,
        id,
        type: "comp",
        name: comp.name,
        url: "",
        ts: Date.now(),
      });

      return {
        id: id,
        name: comp.name,
        snapshot: bin,
      };
    }
  }

  if (snap) {
    return {
      id: snap.id,
      name: snap.name,
      snapshot: snap.bin,
    };
  }
};
