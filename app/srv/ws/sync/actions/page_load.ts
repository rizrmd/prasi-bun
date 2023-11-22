import { createId } from "@paralleldrive/cuid2";
import {
  EPage,
  IScope,
  IScopeComp,
} from "../../../../web/src/nova/ed/logic/ed-global";
import { IContent } from "../../../../web/src/utils/types/general";
import { IItem } from "../../../../web/src/utils/types/item";
import { DComp, DPage, IRoot } from "../../../../web/src/utils/types/root";
import { SAction } from "../actions";
import { loadComponent } from "../editor/load-component";
import { parseJs } from "../editor/parser/parse-js";
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

  const setActivityPage = async (id_site: string, id_page: string) => {
    await activity.site.set(id_site, this.ws, async (data) => {
      data.page_id = id_page;
      return data;
    });
  };

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

      const { scope, comps } = await scanMeta(docs.page[id].doc, this);

      return {
        id: id,
        url: page.url,
        name: page.name,
        snapshot: await gzipAsync(bin),
        scope,
        comps,
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

    const { scope, comps } = await scanMeta(docs.page[id].doc, this);

    return {
      id: id,
      url: snap.url,
      name: snap.name,
      snapshot: await gzipAsync(snap.bin),
      scope,
      comps,
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

    const { scope, comps } = await scanMeta(ydoc.doc, this);
    return {
      id: snap.id,
      url: snap.url,
      name: snap.name,
      snapshot: await gzipAsync(snap.bin),
      scope,
      comps,
    };
  }
};

const scanMeta = async (
  doc: DPage | DComp,
  sync: SyncConnection,
  existing?: { scope: IScope; comps: Record<string, IScopeComp> }
) => {
  const root = doc.getMap("map").get("root")?.toJSON() as IRoot;

  const scope = existing ? existing.scope : ({} as IScope);
  const comps = existing ? existing.comps : ({} as Record<string, IScopeComp>);

  const instantiate = (item: IItem, comp_id: string) => {
    const ref = docs.comp[comp_id];
    if (ref) {
      const item_comp = assignNewID(
        ref.doc.getMap("map").get("root")?.toJSON() as IItem
      );
      parseItem(item_comp, scope, item.id, loadComp);
    }
  };

  const pendingComp = new Set<IItem>();
  const loadComp = (item: IItem) => {
    const comp_id = item.component?.id;
    if (comp_id) {
      const comp = comps[comp_id];
      if (!comp) {
        pendingComp.add(item);
      } else {
        instantiate(item, comp_id);
      }
      return false;
    }
    return true;
  };
  if (root) {
    for (const c of root.childs) {
      parseItem(c, scope, "", loadComp);
    }
  }

  for (const item of pendingComp) {
    const comp_id = item.component?.id;
    if (comp_id) {
      let ref = docs.comp[comp_id];
      if (!ref) {
        await loadComponent(comp_id, sync);
        ref = docs.comp[comp_id];
        if (ref) {
          await scanMeta(ref.doc, sync, {
            scope,
            comps,
          });
        }
      }

      if (ref) {
        instantiate(item, comp_id);
      }
    }
  }

  Object.entries(comps)
    .filter(([k, v]) => !v)
    .map(async ([id, v]) => {});

  return { scope, comps };
};

const assignNewID = (item: IItem) => {
  item.id = createId();
  for (const c of item.childs) {
    if (c.type !== "text") {
      assignNewID(c);
    }
  }
  return item;
};

export const parseItem = (
  item: IContent,
  result: EPage["scope"],
  parent_id: string,
  each: (item: IItem) => boolean
) => {
  const js = item.adv?.js;

  const parent_ids: string[] = [];
  if (!!parent_id) {
    if (!!result[parent_id]) {
      result[parent_id].p.forEach((e) => parent_ids.push(e));
    } else {
      throw new Error(
        `Parent item not found: ${JSON.stringify(
          parent_id
        )} \nitem:\n${JSON.stringify(
          { id: item.id, name: item.name, type: item.type },
          null,
          2
        )}`
      );
    }

    parent_ids.push(parent_id);
  }

  result[item.id] = { p: parent_ids, s: null };

  if (!!each && !each(item as IItem)) {
    return;
  }

  if (typeof js === "string") {
    const res = parseJs(js);
    if (res) {
      result[item.id].s = res;
    }
  }

  if (item.type !== "text") {
    for (const c of item.childs) {
      parseItem(c, result, item.id, each);
    }
  }
};
