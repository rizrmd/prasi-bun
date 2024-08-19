import brotliPromise from "brotli-wasm";
import { dir } from "dir";
import mime from "mime";
import { apiContext } from "service-srv";
import { g } from "utils/global";
import { validate } from "uuid";
import { parseTypeDef } from "../util/parse-type-def";
import { prodIndex } from "../util/prod-index";
import { code } from "../ws/sync/code/code";
import { initFrontEnd } from "../ws/sync/code/parts/init/frontend";
import { gzipAsync } from "../ws/sync/entity/zlib";

const encoder = new TextEncoder();
export const _ = {
  url: "/prod/:site_id/**",
  async api() {
    const { req, prasi } = apiContext(this);

    const pathname: string = req.params["*"] || "";
    const site_id = req.params.site_id as string;

    const index_html = new Response(prodIndex(site_id, prasi).render(), {
      headers: { "content-type": "text/html" },
    });

    if (!validate(site_id) && site_id !== "_") {
      return new Response("site not found", { status: 403 });
    }

    if (pathname.startsWith("_prasi")) {
      const action = pathname.split("/")[1];

      switch (action) {
        case "prisma.ext": {
          const path = dir.path(
            `app/srv/ws/sync/code/templates/typings/prisma_ext_d_ts`
          );
          const file = Bun.file(path);
          return new Response(file);
        }
        case "type_def": {
          const path = dir.data(`/code/${site_id}/site/typings.d.ts`);
          const file = Bun.file(path);
          if (await file.exists()) {
            try {
              const res = JSON.stringify(await parseTypeDef(path));
              await Bun.write(
                dir.data(
                  `/code/${site_id}/site/type_def.${file.lastModified}.json`
                ),
                res
              );

              return new Response(Bun.gzipSync(res), {
                headers: {
                  "content-type": "application/json",
                  "content-encoding": "gzip",
                },
              });
            } catch (e) {}
          }
          return new Response("{}", {
            headers: { "content-type": "application/json" },
          });
        }
        case "typings.d.ts": {
          const build_path = dir.data(`/code/${site_id}/site/typings.d.ts`);
          let file = Bun.file(build_path);

          if (!(await file.exists())) {
            const root = `/code/${site_id}/site/src`;
            await initFrontEnd(root, site_id);
            file = Bun.file(build_path);
          }

          if (await file.exists()) {
            const body = Bun.gzipSync(await file.arrayBuffer());

            return new Response(body, {
              headers: {
                "content-type": file.type,
                "content-encoding": "gzip",
              },
            });
          }
          return new Response("");
        }
        case "code": {
          const arr = pathname.split("/").slice(2);
          const codepath = arr.join("/");
          const build_path = code.path(site_id, "site", "build", codepath);
          const build_old = code.path(site_id, "site", "build_old", codepath);

          try {
            let file = Bun.file(build_path);

            return new Response(
              await gzipAsync(new Uint8Array(await file.arrayBuffer())),
              {
                headers: {
                  "content-encoding": "gzip",
                  "content-type": mime.getType(build_path) || "",
                },
              }
            );
          } catch (e) {
            try {
              let file = Bun.file(build_old);

              return new Response(
                await gzipAsync(new Uint8Array(await file.arrayBuffer())),
                {
                  headers: {
                    "content-encoding": "gzip",
                    "content-type": mime.getType(build_path) || "",
                  },
                }
              );
            } catch (e: any) {
              return new Response(
                `
              console.error("Failed to load index.js")
              console.error("${e.message}")
`,
                {
                  headers: { "content-type": "application/javascript" },
                }
              );
            }
          }
        }
        case "route": {
          if (!g.route_cache) g.route_cache = {};
          if (g.route_cache[site_id]) {
            if (
              req.headers.get("accept-encoding")?.includes("br") &&
              g.route_cache[site_id].br
            ) {
              return new Response(g.route_cache[site_id].br, {
                headers: {
                  "content-type": "application/json",
                  "content-encoding": "br",
                },
              });
            }

            if (
              req.headers.get("accept-encoding")?.includes("gzip") &&
              g.route_cache[site_id].gzip
            ) {
              return new Response(g.route_cache[site_id].gzip, {
                headers: {
                  "content-type": "application/json",
                  "content-encoding": "gzip",
                },
              });
            }
          }

          const site = await _db.site.findFirst({
            where: { id: site_id },
            select: {
              id: true,
              name: true,
              domain: true,
              responsive: true,
              config: true,
            },
          });

          const layouts = await _db.page.findMany({
            where: {
              name: { startsWith: "layout:" },
              is_deleted: false,
              id_site: site_id,
            },
            select: {
              id: true,
              name: true,
              is_default_layout: true,
              content_tree: true,
            },
          });

          let layout = null as any;
          for (const l of layouts) {
            if (!layout) layout = l;
            if (l.is_default_layout) layout = l;
          }

          let api_url = "";
          if (site && site.config && (site.config as any).api_url) {
            api_url = (site.config as any).api_url;
            delete (site as any).config;
          }
          const urls = await _db.page.findMany({
            where: {
              id_site: site_id,
              is_default_layout: false,
              is_deleted: false,
            },
            select: { url: true, id: true },
          });

          if (!g.route_cache[site_id]) {
            g.route_cache[site_id] = {};
          }

          const res = JSON.stringify({
            site: { ...site, api_url },
            urls,
            layout: layout
              ? { id: layout.id, root: layout.content_tree }
              : undefined,
          });

          if (!g.br) {
            g.br = await brotliPromise;
          }
          setTimeout(() => {
            if (!g.route_cache_compressing)
              g.route_cache_compressing = new Set();
            if (g.route_cache_compressing.has(site_id)) return;
            g.route_cache_compressing.add(site_id);
            g.route_cache[site_id].br = g.br.compress(encoder.encode(res));
            g.route_cache_compressing.delete(site_id);
          }, 100);

          g.route_cache[site_id].gzip = await gzipAsync(res);

          return new Response(g.route_cache[site_id].gzip, {
            headers: {
              "content-type": "application/json",
              "content-encoding": "gzip",
            },
          });
        }
        case "page": {
          const page_id = pathname.split("/").pop() as string;
          if (validate(page_id)) {
            const page = await _db.page.findFirst({
              where: { id: page_id },
              select: { content_tree: true, url: true },
            });
            if (page) {
              return await responseCompressed(
                req,
                JSON.stringify({
                  id: page_id,
                  root: page.content_tree,
                  url: page.url,
                }) as any
              );
            }
          }
          return null;
        }
        case "pages": {
          const page_ids = req.params.ids as string[];
          if (page_ids) {
            const ids = page_ids.filter((id) => validate(id));
            const pages = await _db.page.findMany({
              where: { id: { in: ids } },
              select: { id: true, content_tree: true, url: true },
            });
            if (pages) {
              return await responseCompressed(
                req,
                JSON.stringify(
                  pages.map((e: any) => ({
                    id: e.id,
                    url: e.url,
                    root: e.content_tree,
                  }))
                ) as any
              );
            }
          }
          break;
        }
        case "comp": {
          const ids = req.params.ids as string[];
          const result = {} as Record<string, any>;
          if (Array.isArray(ids)) {
            const comps = await _db.component.findMany({
              where: { id: { in: ids } },
              select: { content_tree: true, id: true },
            });
            for (const comp of comps) {
              result[comp.id] = comp.content_tree;
            }
          }
          return await responseCompressed(req, JSON.stringify(result) as any);
        }
      }
      return new Response("action " + action + ": not found");
    } else if (pathname === "index.html" || pathname === "_") {
      return index_html;
    } else {
      const src_path = dir.path(`/app/srv/core/${pathname}`);

      if (!g.main_cache) g.main_cache = {};
      if (!g.main_cache[src_path] && g.mode === "prod") {
        if (!g.br) {
          g.br = await brotliPromise;
        }
        const file = Bun.file(src_path);
        if (await file.exists()) {
          g.main_cache[src_path] = {
            content: g.br.compress(
              new Uint8Array(await Bun.file(src_path).arrayBuffer())
            ),
            type: mime.getType(src_path) || "",
          };
        }
      }

      if (
        g.mode === "prod" &&
        req.headers.get("accept-encoding")?.includes("br") &&
        g.main_cache[src_path]
      ) {
        return new Response(g.main_cache[src_path].content, {
          headers: {
            "content-encoding": "br",
            "content-type": g.main_cache[src_path].type,
          },
        });
      }
      if (req.headers.get("accept-encoding")?.includes("gzip")) {
        const file = Bun.file(src_path);

        if (await file.exists()) {
          return new Response(
            await gzipAsync(new Uint8Array(await file.arrayBuffer())),
            {
              headers: {
                "content-encoding": "gzip",
                "content-type": mime.getType(src_path) || "",
              },
            }
          );
        }
      }

      return index_html;
    }
  },
};

const responseCompressed = async (req: Request, body: string | Uint8Array) => {
  if (req.headers.get("accept-encoding")?.includes("gz")) {
    return new Response(await gzipAsync(body), {
      headers: { "content-encoding": "gzip" },
    });
  }

  return new Response(body);
};
