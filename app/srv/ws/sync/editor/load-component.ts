import { IItem } from "../../../../web/src/utils/types/item";
import { conns } from "../entity/conn";
import { docs } from "../entity/docs";
import { snapshot } from "../entity/snapshot";
import { user } from "../entity/user";
import { gzipAsync } from "../entity/zlib";
import { sendWS } from "../sync-handler";
import { SyncConnection, SyncType } from "../type";

export const loadComponent = async (comp_id: string, sync?: SyncConnection) => {
  let snap = snapshot.get("comp", comp_id);
  let ydoc = docs.comp[comp_id];

  const createUndoManager = async (root: Y.Map<any>) => {
    const um = new Y.UndoManager(root, {
      ignoreRemoteMapChanges: true,
    });

    return um;
  };

  const attachOnUpdate = async (doc: Y.Doc, um: Y.UndoManager) => {
    snapshot.set("comp", comp_id, "id_doc", um.doc.clientID);

    doc.on("update", async (update: Uint8Array, origin: any) => {
      const bin = Y.encodeStateAsUpdate(doc);
      snapshot.set("comp", comp_id, "bin", bin);

      const sv_local = await gzipAsync(update);

      const all = user.active.findAll({ comp_id: comp_id });

      all.map((e) => {
        if (origin !== um) {
          if (e.client_id === origin) return;
        }

        const ws = conns.get(e.client_id)?.ws;

        if (ws) {
          sendWS(ws, {
            type: SyncType.Event,
            event: "remote_svlocal",
            data: { type: "comp", sv_local, id: comp_id },
          });
        }
      });
    });
  };

  const defaultActive = {
    select: "" as "" | "comp" | "item" | "section" | "text",
  };

  if (!snap && !ydoc) {
    const comp = await _db.component.findFirst({ where: { id: comp_id } });
    if (comp) {
      const doc = new Y.Doc();
      let root = doc.getMap("map");
      syncronize(root, { id: comp_id, root: comp.content_tree });

      const um = await createUndoManager(root);
      docs.comp[comp_id] = {
        doc: doc as any,
        id: comp_id,
        um,
      };

      const bin = Y.encodeStateAsUpdate(doc);
      await attachOnUpdate(doc, um);

      await snapshot.update({
        bin,
        id: comp_id,
        type: "comp",
        name: comp.name,
        ts: Date.now(),
        id_doc: doc.clientID,
      });

      if (sync && sync.conf) {
        user.active.add({
          ...defaultActive,
          client_id: sync.client_id,
          user_id: sync.user_id,
          site_id: sync.conf.site_id,
          page_id: sync.conf.page_id,
          comp_id: comp.id,
        });
      }

      return {
        id: comp_id,
        name: comp.name,
        snapshot: await gzipAsync(bin),
      };
    }
  } else if (snap && !ydoc) {
    const doc = new Y.Doc();
    snapshot.set("comp", comp_id, "id_doc", doc.clientID);
    Y.applyUpdate(doc, snap.bin);
    let root = doc.getMap("map");

    const um = await createUndoManager(root);
    await attachOnUpdate(doc, um);

    docs.comp[comp_id] = {
      doc: doc as any,
      id: comp_id,
      um,
    };

    if (sync && sync.conf) {
      user.active.add({
        ...defaultActive,
        client_id: sync.client_id,
        user_id: sync.user_id,
        site_id: sync.conf.site_id,
        page_id: sync.conf.page_id,
        comp_id: comp_id,
      });
    }

    return {
      id: comp_id,
      name: snap.name,
      snapshot: await gzipAsync(snap.bin),
    };
  } else if (snap && ydoc) {
    if (sync && sync.conf) {
      user.active.add({
        ...defaultActive,
        client_id: sync.client_id,
        user_id: sync.user_id,
        site_id: sync.conf.site_id,
        page_id: sync.conf.page_id,
        comp_id: comp_id,
      });
    }

    return {
      id: snap.id,
      name: snap.name,
      snapshot: await gzipAsync(snap.bin),
    };
  }
};

export const userSyncComponent = (sync: SyncConnection, comp_id: string) => {
  const conf = sync.conf;

  user.active.add({
    client_id: sync.client_id,
    user_id: sync.user_id,
    site_id: conf?.site_id || "",
    page_id: conf?.page_id || "",
    comp_id: comp_id,
  });
};
