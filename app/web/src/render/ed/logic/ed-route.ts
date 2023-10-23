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

    if (p.page.cur.id !== params.page_id || !p.page.cur.snapshot) {
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
          if (origin === "sv_remote") return;

          const res = await p.sync.yjs.sv_local(
            "page",
            p.page.cur.id,
            compress(bin)
          );

          if (res) {
            const diff_local = Y.encodeStateAsUpdate(
              doc as any,
              decompress(res.sv)
            );
            Y.applyUpdate(doc as any, decompress(res.diff), "local");
            await p.sync.yjs.diff_local(
              "page",
              p.page.cur.id,
              compress(diff_local)
            );
          }
        });

        p.page.doc = doc as any;

        if (p.page.doc) {
          await treeRebuild(p);
        }
      }
      p.status = "ready";
      p.render();
    }
  }
};
