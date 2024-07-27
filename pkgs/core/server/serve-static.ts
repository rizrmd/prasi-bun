import { dir } from "dir";
import { watch } from "fs";
import mime from "mime";
import { join } from "path";
import { g } from "utils/global";
import { CORS_HEADERS } from "./serve-api";
import { existsAsync } from "fs-jetpack";

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

      ["app/static", "app/web/public"].forEach((base_path) => {
        watch(dir.path(`app/static`), async (event, filename) => {
          if (filename) {
            cache.dev = {};
          }
        });
      });
    } else {
      await Promise.all([this.load("app/static"), this.load("app/web/public")]);
    }
  },
  async load(base_path: string) {
    try {
      const glob = new Bun.Glob("**");

      for await (const file_path of glob.scan(dir.path(base_path))) {
        const r_path = dir.path(`${base_path}/${file_path}`);
        const br_path = dir.path(`${base_path}-br/${file_path}`);

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

      let file = Bun.file(dir.path(`/app/static${url.pathname}`));
      if (await file.exists()) {
        cache.dev[url.pathname] = file;
        return new Response(file);
      }
      file = Bun.file(dir.path(`/app/web/public${url.pathname}`));
      if (await file.exists()) {
        cache.dev[url.pathname] = file;
        return new Response(file);
      }
      file = Bun.file(dir.path(`/app/static/index.html`));
      if (await file.exists()) {
        cache.dev[`/index.html`] = file;
        return new Response(file);
      }
    }
    return new Response(`Not Found: ${url.pathname}`, { status: 404 });
  },
};
