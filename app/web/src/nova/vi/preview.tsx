import { get } from "idb-keyval";
import init, { decompress } from "wasm-gzip";
import { useGlobal } from "web-utils";
import { w } from "../../utils/types/general";
import { IRoot } from "../../utils/types/root";
import { Loading } from "../../utils/ui/loading";
import { EDGlobal, PG } from "../ed/logic/ed-global";
import {
  loadPageMetaCache,
  reloadLayout,
  reloadPage,
  savePageMetaCache,
} from "../ed/logic/ed-route";
import { loadSite } from "../ed/logic/ed-site";
import { treeCacheBuild } from "../ed/logic/tree/build";
import { nav } from "./render/script/extract-nav";
import { Vi } from "./vi";
import parseUA from "ua-parser-js";

const decoder = new TextDecoder();
export const ViPreview = (arg: { pathname: string }) => {
  const p = useGlobal(EDGlobal, "EDITOR");

  if (p.site.id) {
    if (!p.mode && !!p.site.responsive) {
      if (
        p.site.responsive !== "mobile-only" &&
        p.site.responsive !== "desktop-only"
      ) {
        const parsed = parseUA();
        p.mode = parsed.device.type === "mobile" ? "mobile" : "desktop";
      } else if (p.site.responsive === "mobile-only") {
        p.mode = "mobile";
      } else if (p.site.responsive === "desktop-only") {
        p.mode = "desktop";
      }
    }
    if (localStorage.getItem("prasi-editor-mode")) {
      p.mode = localStorage.getItem("prasi-editor-mode") as any;
    }
  }

  w.navigateOverride = (_href) => {
    if (_href && _href.startsWith("/")) {
      if (w.basepath.length > 1) {
        _href = `${w.basepath}${_href}`;
      }
      if (
        location.hostname === "prasi.app" ||
        location.hostname === "prasi.avolut.com" ||
        location.hostname.includes("ngrok") ||
        location.hostname === "localhost" ||
        location.hostname === "127.0.0.1" ||
        location.hostname === "10.0.2.2" // android localhost
      ) {
        if (location.pathname.startsWith("/vi") && !_href.startsWith("/vi")) {
          const patharr = location.pathname.split("/");
          _href = `/vi/${patharr[2]}${_href}`;
        }
      }
    }
    return _href;
  };

  viRoute(p);

  if (p.status !== "ready") {
    if (p.preview.show_loading) {
      return <Loading note={p.status + "-page"} />;
    } else {
      setTimeout(() => {
        p.preview.show_loading = true;
        p.render();
      }, 1000);

      return null;
    }
  }

  const mode = p.mode;

  if (!w.isEditor && !p.preview.meta_cache[params.page_id]) {
    savePageMetaCache(p, p.page.meta);
  }

  return (
    <div className={cx("relative flex flex-1 items-center justify-center")}>
      <div
        className={cx(
          "absolute flex flex-col items-stretch flex-1 bg-white ",
          mode === "mobile"
            ? css`
                @media (min-width: 768px) {
                  border-left: 1px solid #ccc;
                  border-right: 1px solid #ccc;
                  width: 375px;
                  top: 0px;
                  overflow-x: hidden;
                  overflow-y: auto;
                  bottom: 0px;
                }
                @media (max-width: 767px) {
                  left: 0px;
                  right: 0px;
                  top: 0px;
                  bottom: 0px;
                  overflow-y: auto;
                }
              `
            : "inset-0 overflow-auto",

          css`
            contain: content;
          `
        )}
      >
        <Vi
          meta={p.page.meta}
          mode={p.mode}
          api_url={p.site.config.api_url}
          site_id={p.site.id}
          page_id={p.page.cur.id}
          entry={p.page.entry}
          api={p.script.api}
          db={p.script.db}
          layout={
            p.site.layout.id && p.site.layout.meta
              ? {
                  id: p.site.layout.id,
                  meta: p.site.layout.meta,
                  entry: p.site.layout.entry,
                }
              : undefined
          }
          render_stat="disabled"
          script={{ init_local_effect: p.script.init_local_effect }}
          on_nav_loaded={async ({ urls }) => {
            const load_urls: string[] = [];
            if (p.preview.url_cache) {
              for (const url of urls) {
                if (!p.preview.url_cache.has(url)) {
                  load_urls.push(url);
                  p.preview.url_cache.add(url);
                }
              }
            }

            if (load_urls.length > 0) {
              const res = await p.sync.page.cache(p.site.id, load_urls, [
                ...Object.keys(p.preview.page_cache),
                p.page.cur.id,
              ]);

              if (res) {
                const pages = JSON.parse(
                  decoder.decode(decompress(res.gzip)) || "{}"
                ) as Record<
                  string,
                  { root: IRoot; url: string; org_url: string }
                >;

                for (const [id, page] of Object.entries(pages)) {
                  p.preview.page_cache[id] = page;
                  await treeCacheBuild(p, id);
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
};

const viRoute = async (p: PG) => {
  if (p.status === "ready" || p.status === "init") {
    if (p.status === "init") {
      await init();
    }

    if (!p.site.domain && !p.site.name) {
      p.status = "load-site";
      const site = await p.sync.site.load(p.site.id);
      if (!site) {
        p.status = "site-not-found";
        p.render();
        return;
      }

      await loadSite(p, site, "from-route");
      if (p.site.layout.id) {
        if (!p.page.list[p.site.layout.id]) {
          const page_cache = await loadPageMetaCache(p, p.site.layout.id);
          if (page_cache) {
            reloadLayout(p, p.site.layout.id, "load-route");
          } else {
            await reloadLayout(p, p.site.layout.id, "load-route");
          }
        }
      }
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

      p.script.init_local_effect = {};

      if (!w.isEditor) {
        let page_cache = p.preview.meta_cache[params.page_id];

        let should_render = false;
        if (!page_cache) {
          const idb_cache = await get(`page-${params.page_id}`, nav.store);
          if (idb_cache) {
            page_cache = idb_cache;
            p.preview.meta_cache[params.page_id] = idb_cache;
          }
          should_render = true;
        }

        if (page_cache) {
          p.page.meta = page_cache.meta;
          p.page.entry = page_cache.entry;

          if (p.page.cur.id !== params.page_id) {
            p.page.cur = { id: params.page_id } as any;
          }
          p.status = "ready";
          if (should_render) p.render();
        }
      }

      await reloadPage(p, params.page_id, "load-route");
    }
  }
};
