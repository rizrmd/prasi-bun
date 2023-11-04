import { SAction } from "../actions";
import { activity } from "../entity/activity";
import { conns } from "../entity/conn";
import { docs } from "../entity/docs";
import { snapshot } from "../entity/snapshot";
import { user } from "../entity/user";
import { gzipAsync } from "../entity/zlib";
import { sendWS } from "../sync-handler";
import { SyncConnection, SyncType } from "../type";

export const page_load: SAction["page"]["load"] = async function (
  this: SyncConnection,
  id: string
) {
  let snap = snapshot.get("page", id);
  let ydoc = docs.page[id];

  const conf = this.conf;
  if (!conf) return undefined;

  conf.page_id = id;

  const createUndoManager = async (root: Y.Map<any>) => {
    const um = new Y.UndoManager(root, {
      ignoreRemoteMapChanges: true,
    });

    return um;
  };

  const attachOnUpdate = async (doc: Y.Doc, um: Y.UndoManager) => {
    snapshot.set("page", id, "id_doc", um.doc.clientID);

    doc.on("update", async (update: Uint8Array, origin: any) => {
      const bin = Y.encodeStateAsUpdate(doc);
      snapshot.set("page", id, "bin", bin);

      const sv_local = await gzipAsync(update);
      user.active.findAll({ page_id: id }).map((e) => {
        if (origin !== um) {
          if (e.client_id === origin) return;
        }
        const ws = conns.get(e.client_id)?.ws;
        if (ws)
          sendWS(ws, {
            type: SyncType.Event,
            event: "remote_svlocal",
            data: { type: "page", sv_local, id },
          });
      });
    });
  };

  const defaultActive = {
    select: "" as "" | "comp" | "item" | "section" | "text",
  };

  const setActivityPage = (id_site: string, id_page: string) => {
    activity.site.set(id_site, this.ws, (data) => {
      data.page_id = id_page;
      return data;
    });
  };

  if (!snap && !ydoc) {
    const page = await db.page.findFirst({ where: { id } });

    if (page) {
      setActivityPage(page.id_site, page.id);

      const doc = new Y.Doc();
      let root = doc.getMap("map");
      syncronize(root, { id, root: page.content_tree });

      const um = await createUndoManager(root);
      docs.page[id] = {
        doc: doc as any,
        id,
        um,
      };

      const bin = Y.encodeStateAsUpdate(doc);
      await attachOnUpdate(doc, um);

      snapshot.update({
        bin,
        id,
        type: "page",
        name: page.name,
        ts: Date.now(),
        url: page.url,
        id_doc: doc.clientID,
        id_site: page.id_site,
      });

      user.active.add({
        ...defaultActive,
        client_id: this.client_id,
        user_id: this.user_id,
        site_id: page.id_site,
        page_id: page.id,
      });

      return {
        id: id,
        url: page.url,
        name: page.name,
        snapshot: await gzipAsync(bin),
      };
    }
  } else if (snap && !ydoc) {
    const doc = new Y.Doc();
    snapshot.set("page", id, "id_doc", doc.clientID);
    setActivityPage(snap.id_site, id);

    Y.applyUpdate(doc, snap.bin);
    let root = doc.getMap("map");

    const um = await createUndoManager(root);
    await attachOnUpdate(doc, um);

    docs.page[id] = {
      doc: doc as any,
      id,
      um,
    };

    user.active.add({
      ...defaultActive,
      client_id: this.client_id,
      user_id: this.user_id,
      site_id: snap.id_site,
      page_id: snap.id,
    });

    return {
      id: id,
      url: snap.url,
      name: snap.name,
      snapshot: await gzipAsync(snap.bin),
    };
  } else if (snap && ydoc) {
    setActivityPage(snap.id_site, id);

    user.active.add({
      ...defaultActive,
      client_id: this.client_id,
      user_id: this.user_id,
      site_id: snap.id_site,
      page_id: snap.id,
    });

    return {
      id: snap.id,
      url: snap.url,
      name: snap.name,
      snapshot: await gzipAsync(snap.bin),
    };
  }
};
