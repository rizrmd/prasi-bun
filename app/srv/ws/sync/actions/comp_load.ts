import { SAction } from "../actions";
import { conns } from "../entity/conn";
import { docs } from "../entity/docs";
import { snapshot } from "../entity/snapshot";
import { user } from "../entity/user";
import { gzipAsync } from "../entity/zlib";
import { sendWS } from "../sync-handler";
import { SyncConnection, SyncType } from "../type";

export const comp_load: SAction["comp"]["load"] = async function (
  this: SyncConnection,
  id: string
) {
  let snap = snapshot.get("comp", id);
  let ydoc = docs.comp[id];
  const conf = this.conf;
  if (!conf) return undefined;

  const createUndoManager = async (root: Y.Map<any>) => {
    const um = new Y.UndoManager(root, {
      ignoreRemoteMapChanges: true,
    });

    return um;
  };

  const attachOnUpdate = async (doc: Y.Doc, um: Y.UndoManager) => {
    snapshot.set("comp", id, "id_doc", um.doc.clientID);

    doc.on("update", async (update: Uint8Array, origin: any) => {
      const bin = Y.encodeStateAsUpdate(doc);
      snapshot.set("comp", id, "bin", bin);

      const sv_local = await gzipAsync(update);
      user.active.findAll({ comp_id: id }).map((e) => {
        if (origin !== um) {
          if (e.client_id === origin) return;
        }
        const ws = conns.get(e.client_id)?.ws;
        if (ws)
          sendWS(ws, {
            type: SyncType.Event,
            event: "remote_svlocal",
            data: { type: "comp", sv_local, id },
          });
      });
    });
  };

  const defaultActive = {
    select: "" as "" | "comp" | "item" | "section" | "text",
  };

  if (!snap && !ydoc) {
    const comp = await db.component.findFirst({ where: { id } });
    if (comp) {
      const doc = new Y.Doc();
      let root = doc.getMap("map");
      syncronize(root, { id, root: comp.content_tree });

      const um = await createUndoManager(root);
      docs.comp[id] = {
        doc: doc as any,
        id,
        um,
      };

      const bin = Y.encodeStateAsUpdate(doc);
      await attachOnUpdate(doc, um);

      snapshot.update({
        bin,
        id,
        type: "comp",
        name: comp.name,
        ts: Date.now(),
        id_doc: doc.clientID,
      });

      user.active.add({
        ...defaultActive,
        client_id: this.client_id,
        user_id: this.user_id,
        site_id: conf.site_id,
        page_id: conf.page_id,
        comp_id: comp.id,
      });

      return {
        id: id,
        name: comp.name,
        snapshot: await gzipAsync(bin),
      };
    }
  } else if (snap && !ydoc) {
    const doc = new Y.Doc();
    snapshot.set("comp", id, "id_doc", doc.clientID);
    Y.applyUpdate(doc, snap.bin);
    let root = doc.getMap("map");

    const um = await createUndoManager(root);
    await attachOnUpdate(doc, um);

    docs.comp[id] = {
      doc: doc as any,
      id,
      um,
    };

    user.active.add({
      ...defaultActive,
      client_id: this.client_id,
      user_id: this.user_id,
      site_id: conf.site_id,
      page_id: conf.page_id,
      comp_id: id,
    });

    return {
      id: id,
      name: snap.name,
      snapshot: await gzipAsync(snap.bin),
    };
  } else if (snap && ydoc) {
    user.active.add({
      ...defaultActive,
      client_id: this.client_id,
      user_id: this.user_id,
      site_id: conf.site_id,
      page_id: conf.page_id,
      comp_id: id,
    });

    return {
      id: snap.id,
      name: snap.name,
      snapshot: await gzipAsync(snap.bin),
    };
  }
};
