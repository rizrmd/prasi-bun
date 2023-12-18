import { EPage } from "../../../../web/src/nova/ed/logic/ed-global";
import { initLoadComp } from "../../../../web/src/nova/vi/meta/comp/init-comp-load";
import { genMeta } from "../../../../web/src/nova/vi/meta/meta";
import { simplifyMeta } from "../../../../web/src/nova/vi/meta/simplify";
import { GenMetaP } from "../../../../web/src/nova/vi/utils/types";
import { IItem } from "../../../../web/src/utils/types/item";
import { DPage } from "../../../../web/src/utils/types/root";
import { SAction } from "../actions";
import { loadComponent, userSyncComponent } from "../editor/load-component";
import { parseJs } from "../editor/parser/parse-js";
import { activity } from "../entity/activity";
import { conns } from "../entity/conn";
import { docs } from "../entity/docs";
import { CompSnapshot, snapshot } from "../entity/snapshot";
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

  const setActivityPage = async (id_site: string, id_page: string) => {
    await activity.site.set(id_site, this.ws, async (data) => {
      data.page_id = id_page;
      return data;
    });
  };

  user.active.delAll({ client_id: this.client_id });

  if (!snap && !ydoc) {
    const page = await db.page.findFirst({ where: { id } });

    if (page) {
      await setActivityPage(page.id_site, page.id);

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

      const meta = await scanMeta(docs.page[id].doc, this);

      return {
        id: id,
        url: page.url,
        name: page.name,
        snapshot: await gzipAsync(bin),
        ...meta,
      };
    }
  } else if (snap && !ydoc) {
    const doc = new Y.Doc();
    snapshot.set("page", id, "id_doc", doc.clientID);
    await setActivityPage(snap.id_site, id);

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

    const meta = await scanMeta(docs.page[id].doc, this);

    return {
      id: id,
      url: snap.url,
      name: snap.name,
      snapshot: await gzipAsync(snap.bin),
      ...meta,
    };
  } else if (snap && ydoc) {
    await setActivityPage(snap.id_site, id);

    user.active.add({
      ...defaultActive,
      client_id: this.client_id,
      user_id: this.user_id,
      site_id: snap.id_site,
      page_id: snap.id,
    });

    const meta = await scanMeta(ydoc.doc, this);
    return {
      id: snap.id,
      url: snap.url,
      name: snap.name,
      snapshot: await gzipAsync(snap.bin),
      ...meta,
    };
  }
};

const scanMeta = async (doc: DPage, sync: SyncConnection) => {
  const meta: GenMetaP["meta"] = {};
  const mcomps: GenMetaP["comps"] = {};
  const msnap: Record<string, CompSnapshot> = {};

  const loading = {} as Record<string, Promise<void>>;
  const mchilds = doc.getMap("map").get("root")?.get("childs");
  const entry: string[] = [];
  if (mchilds) {
    const childs = mchilds.map((m) => m);
    for (const mchild of childs) {
      await initLoadComp(
        { comps: mcomps, meta },
        mchild.toJSON(),
        async (comp_ids) => {
          for (const id of comp_ids) {
            if (!docs.comp[id]) {
              if (typeof loading[id] === "undefined") {
                loading[id] = new Promise<void>(async (resolve) => {
                  await loadComponent(id, sync);
                  resolve();
                });
              }
              await loading[id];
            } else {
              userSyncComponent(sync, id);
            }

            const snap = snapshot.get("comp", id);
            if (snap) {
              msnap[id] = snap;
            }

            if (docs.comp[id]) {
              const mitem = docs.comp[id].doc.getMap("map").get("root");
              mcomps[id] = { comp: mitem?.toJSON() as IItem };
            }
          }
        }
      );
    }

    for (const mitem of childs) {
      const item = mitem.toJSON() as IItem;
      entry.push(item.id);
      genMeta(
        {
          comps: mcomps,
          meta,
          on: {
            visit(meta) {
              if (!meta.parent?.comp_id) {
                if (typeof meta.item.adv?.js === "string") {
                  meta.scope.def = parseJs(meta);
                }
              }
            },
          },
        },
        { item }
      );
    }
  }

  const comps: EPage["comps"] = {};
  for (const [id, snap] of Object.entries(msnap)) {
    const meta = {};
    genMeta(
      {
        comps: {},
        meta,
        on: {
          visit(meta) {
            if (typeof meta.item.adv?.js === "string") {
              meta.scope.def = parseJs(meta);
            }
          },
        },
      },
      { item: mcomps[id].comp }
    );

    comps[id] = { id, meta, snapshot: await gzipAsync(snap.bin) };
  }

  return { meta: simplifyMeta(meta), comps, entry };
};
