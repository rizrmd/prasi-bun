import { dir } from "dir";
import { apiContext } from "service-srv";
import { validate } from "uuid";
import { prodIndex } from "../util/prod-index";
import { code } from "../ws/sync/editor/code/util-code";
import { gzipAsync } from "../ws/sync/entity/zlib";

export const _ = {
  url: "/prod/:site_id/**",
  async api() {
    const { req, res } = apiContext(this);

    const pathname: string = req.params["*"] || "";
    const site_id = req.params.site_id as string;

    const index_html = new Response(prodIndex(site_id).render(), {
      headers: { "content-type": "text/html" },
    });

    if (!validate(site_id))
      return new Response("site not found", { status: 403 });

    if (pathname.startsWith("_prasi")) {
      const action = pathname.split("/")[1];

      switch (action) {
        case "code": {
          const arr = pathname.split("/").slice(2);
          const codepath = arr.join("/");
          const build_path = code.path(site_id, "site", "build", codepath);
          const file = Bun.file(build_path);

          if (!(await file.exists()))
            return new Response("Code file not found", { status: 403 });

          return new Response(file);
        }
        case "route": {
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

          return await responseCompressed(
            req,
            JSON.stringify({
              site: { ...site, api_url },
              urls,
              layout: layout
                ? { id: layout.id, root: layout.content_tree }
                : undefined,
            }) as any
          );
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
                  pages.map((e) => ({
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
      const res = dir.path(`/app/srv/core/${pathname}`);
      const file = Bun.file(res);
      if (!(await file.exists())) {
        return index_html;
      }
      return new Response(file);
    }
  },
};

const responseCompressed = async (req: Request, body: string) => {
  if (req.headers.get("accept-encoding")?.includes("gz")) {
    return new Response(await gzipAsync(body), {
      headers: { "content-encoding": "gzip" },
    });
  }

  return new Response(body);
};
