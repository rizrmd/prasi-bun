import { compress, decompress } from "wasm-gzip";
import { PG } from "./ed-global";
import { treeRebuild } from "./tree/build";

export const edRoute = async (p: PG) => {
  if (p.status === "ready") {
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
      if (p.page.cur.snapshot && p.page.list[p.page.cur.id]) {
        console.log("loading page from cache");
      } else {
        p.status = "loading";
        const page = await p.sync.page.load(params.page_id);

        if (!page) {
          p.status = "page-not-found";
          p.render();
          return;
        }

        p.page.cur = page;
        if (page.snapshot) {
          const doc = new Y.Doc();
          Y.applyUpdate(doc, decompress(page.snapshot));
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
            p.page.list[page.id] = {
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
      }
    }
  }
};
