import { FC, useState } from "react";
import { GlobalContext } from "web-utils";
import { DeadEnd } from "../../utils/ui/deadend";
import { Loading } from "../../utils/ui/loading";
import { evalCJS } from "../ed/logic/ed-sync";
import { Vi } from "../vi/vi";
import { base } from "./base/base";
import { scanComponent } from "./base/component";
import { loadPage, loadUrls } from "./base/page";
import { detectResponsiveMode } from "./base/responsive";
import { initBaseRoute, rebuildMeta } from "./base/route";
import { w } from "./w";

export const Root = () => {
  // #region context
  const [_, set] = useState({});
  const render = () => set({});
  w.prasiContext.render = render;
  const Provider = GlobalContext.Provider as FC<{ value: any; children: any }>;
  // #endregion

  // #region init
  if (base.route.status !== "ready") {
    if (base.route.status === "init") {
      base.route.status = "loading";
      initBaseRoute().then(async (router) => {
        detectResponsiveMode();
        base.route.status = "ready";
        base.route.router = router;

        const site_script = evalCJS(
          await (
            await fetch(`/deploy/${base.site.id}/_prasi/code/index.js`)
          ).text()
        );
        if (site_script) {
          for (const [k, v] of Object.entries(site_script)) {
            (window as any)[k] = v;
          }
        }

        render();
      });
    }
    return <Loading note="Loading router" />;
  }
  // #endregion

  // #region routing
  const router = base.route.router;
  if (!router) return <DeadEnd>Failed to create Router</DeadEnd>;

  const page = router.lookup(base.pathname);
  if (!page) return <DeadEnd>Page Not Found</DeadEnd>;

  w.params = page.params;

  base.page.id = page.id;
  base.page.url = page.url;
  const cache = base.page.cache[page.id];

  if (!cache) {
    loadPage(page.id)
      .then(async (root) => {
        const p = {
          id: page.id,
          url: page.url,
          root,
          meta: {},
        };
        await scanComponent(root.childs);
        rebuildMeta(p.meta, root);
        base.page.cache[p.id] = p;
        render();
      })
      .catch(() => {
        render();
      });

    return <Loading note="Loading page" />;
  } else {
    base.page.root = cache.root;
    base.page.meta = cache.meta;
  }
  // #endregion

  return (
    <Provider value={w.prasiContext}>
      <div className={cx("relative flex flex-1 items-center justify-center")}>
        <div
          className={cx(
            "absolute flex flex-col items-stretch flex-1 bg-white main-content-preview",
            base.mode === "mobile"
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
            api_url={base.site.api_url}
            entry={Object.values(base.page.root.childs)
              .filter((e) => e)
              .map((e) => e.id)}
            meta={base.page.meta}
            mode={base.mode}
            page_id={base.page.id}
            site_id={base.site.id}
            db={base.site.db}
            api={base.site.api}
            layout={
              base.layout.id && base.layout.root && base.layout.meta
                ? {
                    id: base.layout.id,
                    meta: base.layout.meta,
                    entry: Object.values(base.layout.root.childs)
                      .filter((e) => e)
                      .map((e) => e.id),
                  }
                : undefined
            }
            script={{ init_local_effect: base.init_local_effect }}
            on_preload={async ({ urls }) => {
              const load_urls: string[] = [];
              if (base.cache.urls) {
                for (const url of urls) {
                  if (!base.cache.urls.has(url)) {
                    load_urls.push(url);
                    base.cache.urls.add(url);
                  }
                }
              }

              if (load_urls.length > 0) {
                const pages = await loadUrls(load_urls);
                for (const page of pages) {
                  const p = {
                    id: page.id,
                    url: page.url,
                    root: page.root,
                    meta: {},
                  };
                  await scanComponent(page.root.childs);
                  rebuildMeta(p.meta, page.root);
                  base.page.cache[p.id] = p;
                }
              }
            }}
          />
        </div>
      </div>
    </Provider>
  );
};
