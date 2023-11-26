import { compress, decompress } from "wasm-gzip";
import { PG } from "./ed-global";
import { loadSite } from "./ed-site";
import { treeRebuild } from "./tree/build";
import { loadCompSnapshot } from "./tree/sync-walk-comp";

export const edRoute = async (p: PG) => {
  if (p.status === "ready" || p.status === "init") {
    if (!p.site.domain && !p.site.name) {
      p.status = "loading";
      const site = await p.sync.site.load(p.site.id);
      if (!site) {
        p.status = "site-not-found";
        p.render();
        return;
      }

      await loadSite(p, site);
    }

    if (
      p.page.cur.id !== params.page_id ||
      !p.page.cur.snapshot ||
      !p.page.list[p.page.cur.id]
    ) {
      const page = p.page.list[params.page_id];
      if (page && p.page.doc && page.on_update) {
        p.page.doc.off("update", page.on_update);

        const cur = p.page.list[params.page_id];
        p.page.cur = cur.page;
        p.page.doc = cur.doc;
      }

      await reloadPage(p, params.page_id, "load-route");
    }
  }
};

export const reloadPage = async (p: PG, page_id: string, note: string) => {
  p.status = "loading";
  const remotePage = await p.sync.page.load(page_id);

  if (!remotePage) {
    p.status = "page-not-found";
    p.render();
    return;
  }

  p.page.scope = remotePage.scope || {};
  if (remotePage.scope_comps) {
    for (const [id_comp, c] of Object.entries(remotePage.scope_comps)) {
      if (c && c.snapshot) {
        await loadCompSnapshot(p, id_comp, c.snapshot, c.scope);
      }
    }
  }

  p.page.cur = remotePage;
  if (remotePage.snapshot) {
    const doc = new Y.Doc();
    Y.applyUpdate(doc, decompress(remotePage.snapshot));

    let page = p.page.list[remotePage.id];
    if (!page) {
      p.page.list[remotePage.id] = {} as any;
      page = p.page.list[remotePage.id];
    }

    if (page.on_update && page.doc) {
      page.doc.off("update", page.on_update);
    }

    page.on_update = async (bin: Uint8Array, origin: any) => {
      if (origin === "sv_remote" || origin === "local") return;

      const res = await p.sync.yjs.sv_local(
        "page",
        p.page.cur.id,
        Buffer.from(compress(bin))
      );

      if (res) {
        const diff_local = Y.encodeStateAsUpdate(
          doc as any,
          decompress(res.sv)
        );
        Y.applyUpdate(doc as any, decompress(res.diff), "local");
        await treeRebuild(p, { note: note + " page-on-update" });

        await p.sync.yjs.diff_local(
          "page",
          p.page.cur.id,
          Buffer.from(compress(diff_local))
        );
        p.ui.syncing = false;
        p.render();
      }
    };

    doc.on("update", page.on_update);

    p.page.doc = doc as any;
    if (p.page.doc) {
      page.page = p.page.cur;
      page.doc = p.page.doc;
    }

    if (p.page.doc) {
      await treeRebuild(p, { note: note + " page-init" });
    }
  }
  p.status = "ready";
  p.render();
};
