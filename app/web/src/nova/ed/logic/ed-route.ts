import { compress, decompress } from "wasm-gzip";
import { isTextEditing } from "./active/is-editing";
import { loadCompSnapshot } from "./comp/load";
import { IMeta, PG, active } from "./ed-global";
import { loadSite } from "./ed-site";
import { treeCacheBuild, treeRebuild } from "./tree/build";
import { get, set } from "idb-keyval";
import { nav } from "../../vi/render/script/extract-nav";

const UPDATE_TIMEOUT = 0;
export const edRoute = async (p: PG) => {
  if (p.sync && (p.status === "ready" || p.status === "init")) {
    if (!p.site.domain && !p.site.name) {
      p.status = "load-site";
      const site = await p.sync.site.load(p.site.id);
      if (!site) {
        p.status = "site-not-found";
        p.render();
        return;
      }

      await loadSite(p, site, "from-route");
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

export const reloadLayout = async (p: PG, layout_id: string, note: string) => {
  if (!p.sync) return;
  const remotePage = await p.sync.page.load(layout_id);

  if (remotePage) {
    if (remotePage.comps) {
      for (const [id_comp, c] of Object.entries(remotePage.comps)) {
        if (c && c.snapshot) {
          await loadCompSnapshot(p, id_comp, c.snapshot);
        }
      }
    }
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
        clearTimeout(page.update_timeout);
        page.update_timeout = setTimeout(async () => {
          if (origin === "local" || !p.sync) return;
          console.log("page on update snap");

          const res = await p.sync.yjs.sv_local(
            "page",
            layout_id,
            Buffer.from(compress(bin))
          );

          if (res) {
            if (res.sv === res.diff && (res.sv as any) === "not-found") {
              console.warn("reload 1");
              location.reload();
            }

            const diff_local = Y.encodeStateAsUpdate(
              doc as any,
              decompress(res.sv)
            );
            Y.applyUpdate(doc as any, decompress(res.diff), "local");

            if (!isTextEditing()) {
              await treeRebuild(p, { note: note + " page-on-update" });
            }

            await p.sync.yjs.diff_local(
              "page",
              p.page.cur.id,
              Buffer.from(compress(diff_local))
            );

            p.preview.page_cache[layout_id] = {
              root,
              url: "~~@$#%^#@~LAYOUT~~@$#%^#@~",
            };
            await treeCacheBuild(p, layout_id);
            p.render();

            const meta_cache = p.preview.meta_cache[layout_id];
            if (meta_cache) {
              p.site.layout.meta = meta_cache.meta;
              p.site.layout.entry = meta_cache.entry;
              savePageMetaCache(p, meta_cache.meta);
            }
          }
        }, UPDATE_TIMEOUT);
      };

      const root = (doc.getMap("map").get("root") as any)?.toJSON();
      if (root) {
        p.preview.page_cache[layout_id] = {
          root,
          url: "~~@$#%^#@~LAYOUT~~@$#%^#@~",
        };
        await treeCacheBuild(p, layout_id);

        const meta_cache = p.preview.meta_cache[layout_id];

        if (meta_cache) {
          p.site.layout.meta = meta_cache.meta;
          p.site.layout.entry = meta_cache.entry;

          savePageMetaCache(p, meta_cache.meta);
        }
        p.render();
      }
    }
  }
};

export const reloadPage = async (
  p: PG,
  page_id: string,
  note: string,
  should_render?: boolean
) => {
  if (!p.sync) return;
  p.status = "reload";
  const remotePage = await p.sync.page.load(page_id);

  if (!remotePage) {
    p.status = "page-not-found";
    p.render();
    location.reload();
    return;
  }

  if (remotePage.comps) {
    for (const [id_comp, c] of Object.entries(remotePage.comps)) {
      if (c && c.snapshot) {
        await loadCompSnapshot(p, id_comp, c.snapshot);
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
      clearTimeout(page.update_timeout);
      page.update_timeout = setTimeout(async () => {
        if (origin === "local" || !p.sync) return;

        if (page.page.id !== remotePage.id) {
          alert("Page ID Mismatch!\n Refreshing to preventing data loss...");
          console.warn("reload 2");

          location.reload();
          return;
        }
        if ((window as any).catch) {
          throw new Error("woi");
        }

        const res = await p.sync.yjs.sv_local(
          "page",
          p.page.cur.id,
          Buffer.from(compress(bin))
        );

        if (res) {
          if (res.sv === res.diff && (res.sv as any) === "not-found") {
            console.warn("reload 3");

            location.reload();
          }

          const diff_local = Y.encodeStateAsUpdate(
            doc as any,
            decompress(res.sv)
          );
          Y.applyUpdate(doc as any, decompress(res.diff), "local");

          if (!isTextEditing()) {
            await treeRebuild(p, { note: note + " page-on-update" });
          }

          await p.sync.yjs.diff_local(
            "page",
            p.page.cur.id,
            Buffer.from(compress(diff_local))
          );
          p.ui.syncing = false;

          p.page.entry = (doc as any)
            .getMap("map")
            .get("root")
            ?.get("childs")
            ?.map((e: any) => e.get("id")) as string[];

          if (active.should_render_main) p.render();
        }
      }, UPDATE_TIMEOUT);
    };

    doc.on("update", page.on_update);

    p.page.doc = doc as any;
    if (p.page.doc) {
      page.page = p.page.cur;
      page.doc = p.page.doc;

      p.page.entry = p.page.doc
        .getMap("map")
        .get("root")
        ?.get("childs")
        ?.map((e) => e.get("id")) as string[];

      if (!Array.isArray(p.page.entry)) {
        p.sync.code
          .action({ type: "flush-page-cache", page_id: page_id })
          .then(() => {
            console.warn("reload 4");

            location.reload();
          });
      }
    }

    if (p.page.doc) {
      await treeRebuild(p, { note: note + " page-init" });
    }
  }

  p.status = "ready";
  if (should_render !== false) p.render();
};

export const loadPageMetaCache = async (p: PG, page_id: string) => {
  const idb_cache = await get(`page-${page_id}`, nav.store);
  if (idb_cache) {
    p.preview.meta_cache[page_id] = idb_cache;
    return p.preview.meta_cache[page_id];
  }
};

export const savePageMetaCache = async (p: PG, meta: Record<string, IMeta>) => {
  const cleaned_meta: Record<string, IMeta> = {};
  for (const [k, v] of Object.entries(meta)) {
    cleaned_meta[k] = {
      item: v.item,
      instances: v.instances,
      parent: v.parent,
      jsx_prop: v.jsx_prop,
    };
  }
  p.preview.meta_cache[params.page_id] = {
    meta: cleaned_meta,
    entry: p.page.entry,
    url: p.page.cur.url,
  };
  set(
    `page-${params.page_id}`,
    p.preview.meta_cache[params.page_id],
    nav.store
  );
};
