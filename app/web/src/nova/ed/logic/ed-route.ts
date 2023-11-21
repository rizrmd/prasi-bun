import { compress, decompress } from "wasm-gzip";
import { PG } from "./ed-global";
import { treeRebuild } from "./tree/build";

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

      p.site = site;
    }

    if (
      p.page.cur.id !== params.page_id ||
      !p.page.cur.snapshot ||
      !p.page.list[p.page.cur.id]
    ) {
      let loadFromServer = true;
      if (p.page.list[params.page_id]) {
        const cur = p.page.list[params.page_id];
        p.page.cur = cur.page;
        p.page.doc = cur.doc;
        loadFromServer = false;

        const res = await p.sync.page.load(params.page_id);
        if (res) {
          treeRebuild(p);
        }
      }

      if (loadFromServer) {
        await reloadPage(p);
      }
    }
  }
};

export const reloadPage = async (p: PG) => {
  p.status = "loading";
  const remotePage = await p.sync.page.load(params.page_id);

  if (!remotePage) {
    p.status = "page-not-found";
    p.render();
    return;
  }

  p.page.cur = remotePage;
  if (remotePage.snapshot) {
    const doc = new Y.Doc();
    Y.applyUpdate(doc, decompress(remotePage.snapshot));
    doc.on("update", async (bin: Uint8Array, origin: any) => {
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
        await treeRebuild(p);

        await p.sync.yjs.diff_local(
          "page",
          p.page.cur.id,
          Buffer.from(compress(diff_local))
        );
        p.ui.syncing = false;
        p.render();
      }
    });

    p.page.doc = doc as any;
    if (p.page.doc) {
      p.page.list[remotePage.id] = {
        page: p.page.cur,
        doc: p.page.doc,
      };
    }

    if (p.page.doc) {
      await treeRebuild(p);
    }
  }
  p.status = "ready";
  p.render();
};
