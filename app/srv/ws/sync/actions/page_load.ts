import { g } from "utils/global";
import { SAction } from "../actions";
import { prepareComponentForPage } from "../editor/prep-comp-page";
import { prepContentTree } from "../editor/prep-page";
import { conns } from "../entity/conn";
import { docs } from "../entity/docs";
import { snapshot } from "../entity/snapshot";
import { user } from "../entity/user";
import { gzipAsync } from "../entity/zlib";
import { sendWS } from "../sync-handler";
import { SyncConnection, SyncType } from "../type";
import { validate } from "uuid";

export const page_load: SAction["page"]["load"] = async function (
  this: SyncConnection,
  id: string
) {
  if (!id || (id && !validate(id))) return;

  let snap = snapshot.get("page", id);
  let ydoc = docs.page[id];

  const conf = this.conf;
  if (!conf) return undefined;

  conf.page_id = id;

  const createUndoManager = async (root: YJS.Map<any>) => {
    const um = new Y.UndoManager(root, {
      ignoreRemoteMapChanges: true,
    });

    return um;
  };

  const attachOnUpdate = async (doc: YJS.Doc, um: YJS.UndoManager) => {
    snapshot.set("page", id, "id_doc", um.doc.clientID);

    doc.on("update", async (update: Uint8Array, origin: any) => {
      const bin = Y.encodeStateAsUpdate(doc);
      snapshot.set("page", id, "bin", bin);
      snap = snapshot.get("page", id);
      const sv_local = await gzipAsync(update);

      if (snap?.name.startsWith("layout:") && snap.id_site && g.route_cache) {
        delete g.route_cache[snap.id_site];
      }

      const found = user.active.findAll({ page_id: id });

      if (!g.preview_page_timeout) g.preview_page_timeout = {};
      clearTimeout(g.preview_page_timeout[id]);
      g.preview_page_timeout[id] = setTimeout(() => {
        let json = doc.toJSON();
        for (const f of found) {
          const client_id = f.client_id;
          const ws = conns.get(client_id)?.ws;

          if (client_id && ws) {
            if (!f.user_id) {
              sendWS(ws, {
                type: SyncType.Event,
                event: "page_changed",
                data: json,
              });
            }
          }
        }
      }, 300);

      for (const f of found) {
        const client_id = f.client_id;
        const ws = conns.get(client_id)?.ws;
        if (client_id && ws) {
          if (!!f.user_id) {
            if (ws) {
              if (origin !== um) {
                if (client_id === origin) return;
              }

              sendWS(ws, {
                type: SyncType.Event,
                event: "remote_svlocal",
                data: { type: "page", sv_local, id },
              });
            }
          }
        }
      }
    });
  };

  const defaultActive = {
    select: "" as "" | "comp" | "item" | "section" | "text",
  };

  user.active.delAll({ client_id: this.client_id });

  if (!snap && !ydoc) {
    const page = await _db.page.findFirst({ where: { id } });
    if (page) {
      const doc = new Y.Doc();
      let root = doc.getMap("map");
      const proot = await prepContentTree(page.id, page.content_tree, this);
      if (validate(id) && id) {
        await _db.page.update({ where: { id }, data: { content_tree: proot } });
      }
      syncronize(root, { id, root: proot });

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
        comps: (await prepareComponentForPage(id, this, false)) || {},
      };
    }
  } else if (snap && !ydoc) {
    const page = await _db.page.findFirst({
      where: { id },
      select: { name: true, url: true },
    });

    const doc = new Y.Doc();
    snapshot.set("page", id, "id_doc", doc.clientID);

    Y.applyUpdate(doc, snap.bin);
    let root = doc.getMap("map");

    const comps = await prepareComponentForPage(id, this, true, doc as any);

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
      url: page?.url || "",
      name: page?.name || "",
      snapshot: await gzipAsync(snap.bin),
      comps: comps || {},
    };
  } else if (snap && ydoc) {
    const page = await _db.page.findFirst({
      where: { id },
      select: { name: true, url: true },
    });

    user.active.add({
      ...defaultActive,
      client_id: this.client_id,
      user_id: this.user_id,
      site_id: snap.id_site,
      page_id: snap.id,
    });

    return {
      id: snap.id,
      url: page?.url || "",
      name: page?.name || "",
      snapshot: await gzipAsync(snap.bin),
      comps: (await prepareComponentForPage(id, this, true)) || {},
    };
  }
};
