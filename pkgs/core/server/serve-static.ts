import { dir } from "dir";
import { watch } from "fs";
import mime from "mime";
import { join } from "path";
import { g } from "utils/global";
import { CORS_HEADERS } from "./serve-api";
import { existsAsync } from "fs-jetpack";
import { code } from "../../../app/srv/ws/sync/code/code";

if (!g.static_cache) {
  g.static_cache = {};
}

const cache = {
  static: g.static_cache as Record<
    string,
    { type: string; content: any; compression: "" | "br" }
  >,
  dev: {} as Record<string, ReturnType<typeof Bun.file>>,
};

export const serveStatic = {
  async init() {
    if (g.mode === "dev") {
      for (const k of Object.keys(cache.static)) {
        delete cache.static[k];
      }

      watch(dir.path(`static`), async (event, filename) => {
        if (filename) {
          cache.dev = {};
        }
      });

      watch(dir.path("app/web/public"), async (event, filename) => {
        if (filename) {
          cache.dev = {};
        }
      });
    } else {
      await Promise.all([
        this.load(dir.path(`static`)),
        this.load(dir.path("app/web/public")),
      ]);
    }
  },
  async load(base_path: string) {
    try {
      const glob = new Bun.Glob("**");

      for await (const file_path of glob.scan(base_path)) {
        const r_path = `${base_path}/${file_path}`;
        const br_path = `${base_path}-br/${file_path}`;

        let final_path = r_path;
        let br = false;
        if (await existsAsync(br_path)) {
          final_path = br_path;
          br = true;
        }

        try {
          cache.static[`/${file_path}`] = {
            type: mime.getType(file_path) || "application/octet-stream",
            compression: br ? "br" : "",
            content: await Bun.file(final_path).arrayBuffer(),
          };
        } catch (e: any) {
          console.error(`Failed to load static file: ${final_path}`);
          console.error(`  ${e.message}`);
        }
      }
    } catch (e: any) {
      console.error(`Failed to load static dir: ${base_path}`);
      console.error(`  ${e.message}`);
    }
  },
  exists: (url: URL) => {
    return !!cache.static[url.pathname];
  },
  serveSitePublic: (url: URL) => {
    if (!cache.static[url.pathname] && url.pathname.startsWith("/prod")) {
      const parts = url.pathname.split("/");
      const id_site = parts[2];
      if (id_site && id_site.length > 5) {
        const trail = parts.slice(3).join("/");
        if (!trail.startsWith("_prasi") && trail.length > 3) {
          const path = code.path(id_site, "site", "src", `/public/${trail}`);

          const file = Bun.file(path);
          if (file.size > 0) {
            return new Response(file);
          }
        }
      }
    }
  },
  async serve(url: URL) {
    if (g.mode === "prod") {
      let file = cache.static[url.pathname];
      if (file) {
        return new Response(file.content, {
          headers: {
            ...CORS_HEADERS,
            ...{ "content-type": file.type },
            ...(file.compression
              ? { "content-encoding": file.compression }
              : {}),
          },
        });
      }

      if (url.pathname.endsWith(".js")) {
        return new Response(
          `
console.warn("${url.pathname} not found, force reloading for clearing cache.")
navigator.serviceWorker.getRegistration().then(function(reg) {
  setTimeout(() => {
    if (reg) {
      reg.unregister().then(function() { window.location.reload(); });
    } else {
      window.location.reload();
    }
  }, 2000);
});
`,
          {
            headers: { "content-type": "text/javascript" },
          }
        );
      }

      file = cache.static["/index.html"];

      if (file) {
        return new Response(file.content, {
          headers: {
            ...{ "content-type": file.type },
            ...(file.compression
              ? { "content-encoding": file.compression }
              : {}),
          },
        });
      }
    } else {
      if (cache.dev[url.pathname]) {
        return new Response(cache.dev[url.pathname]);
      }

      let file = Bun.file(dir.path(`static${url.pathname}`));
      if (await file.exists()) {
        cache.dev[url.pathname] = file;
        return new Response(file);
      }
      file = Bun.file(dir.path(`/app/web/public${url.pathname}`));
      if (await file.exists()) {
        cache.dev[url.pathname] = file;
        return new Response(file);
      }
      file = Bun.file(dir.path(`static/index.html`));
      if (await file.exists()) {
        cache.dev[`/index.html`] = file;
        return new Response(file);
      }
    }
    return new Response(`Not Found: ${url.pathname}`, { status: 404 });
  },
};
