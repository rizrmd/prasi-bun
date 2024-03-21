import { FC, useState } from "react";
import { validate } from "uuid";
import { GlobalContext, useLocal } from "web-utils";
import { DeadEnd } from "../../utils/ui/deadend";
import { Loading } from "../../utils/ui/loading";
import { Vi } from "../vi/vi";
import { base } from "./base/base";
import { scanComponent } from "./base/component";
import { loadPage, loadUrls } from "./base/page";
import { detectResponsiveMode } from "./base/responsive";
import { initBaseRoute, rebuildMeta } from "./base/route";
import { w } from "./w";
import { IRoot } from "../../utils/types/root";
import { IContent } from "../../utils/types/general";

export const isPreview = () => {
  return (
    location.hostname.split(".").length === 4 ||
    location.hostname === "prasi.app" ||
    location.hostname === "prasi.avolut.com" ||
    location.hostname.includes("ngrok") ||
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.hostname === "10.0.2.2"
  ); // android localhost
};

export const Root = () => {
  // #region context
  const local = useLocal({ page_id: "" });
  const [_, set] = useState({});
  const render = () => set({});
  w.prasiContext.render = render;
  const Provider = GlobalContext.Provider as FC<{ value: any; children: any }>;
  // #endregion

  // #region init
  const isPreviewProd = isPreview() && location.pathname.startsWith("/prod");

  if (base.route.status !== "ready") {
    if (base.route.status === "init") {
      base.route.status = "loading";
      initBaseRoute().then(async ({ router, pages }) => {
        detectResponsiveMode();
        base.route.status = "ready";
        base.route.router = router;
        base.route.pages = pages;

        const url = `${w._prasi.basepath}/_prasi/code/index.js`;
        const fn = new Function("callback", `import("${url}").then(callback)`);
        await new Promise<void>((resolve) => {
          fn((exports: any) => {
            for (const [k, v] of Object.entries(exports)) {
              (w as any)[k] = v;
            }
            resolve();
          });
        });

        render();
      });
    }
    return <Loading />;
  }
  // #endregion

  // #region routing
  const router = base.route.router;
  if (!router) return <DeadEnd>Failed to create Router</DeadEnd>;

  let page_id_from_url = "";
  if (isPreviewProd) {
    const parts = location.pathname.split("/");
    if (validate(parts[3])) {
      page_id_from_url = parts[3];
    }
  }

  let page = router.lookup(base.pathname);
  if (page_id_from_url) {
    const found = base.route.pages.find((e) => page_id_from_url === e.id);
    if (found) {
      page = found;
    }
  }
  if (!page) return <DeadEnd>Page Not Found</DeadEnd>;

  if (page.id !== local.page_id) {
    base.init_local_effect = {};
  }

  w.params = page.params || {};

  base.page.id = page.id;
  base.page.url = page.url;
  const cache = base.page.cache[page.id];

  if (!cache) {
    loadPage(page.id)
      .then(async ({ root }) => {
        if (page) {
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
        }
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
            on_preload={async ({ urls, opt }) => {
              const load_urls: string[] = [];
              const loaded = {} as Record<string, any>;
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

                if (opt?.on_load) {
                  opt.on_load(pages, walkRoot);
                }

                if (Array.isArray(pages)) {
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
              }
            }}
          />
        </div>
      </div>
    </Provider>
  );
};

const walkRoot = (
  pages: { root: IRoot }[],
  visit: (item: IContent) => void | Promise<void>
) => {
  for (const page of pages) {
    for (const child of page.root.childs) {
      walk(child, visit);
    }
  }
};

const walk = (
  item: IContent,
  visit: (item: IContent) => void | Promise<void>
) => {
  visit(item);

  if (item.type !== "text") {
    if (item.type === "item" && item.component?.props) {
      for (const prop of Object.values(item.component.props)) {
        if (prop.content) {
          walk(prop.content, visit);
        }
      }
    }

    for (const child of item.childs) {
      walk(child, visit);
    }
  }
};
