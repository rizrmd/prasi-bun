import { dir } from "dir";
import { exists, inspectTreeAsync } from "fs-jetpack";
import { InspectTreeResult } from "fs-jetpack/types";
import { join } from "path";
import { watch } from "fs";
import { CORS_HEADERS } from "./serve-api";
import mime from "mime";
import { g } from "utils/global";

const web = {
  brExists: null as null | boolean,
  get path() {
    if (g.mode === "dev") return "static";
    if (this.brExists === null) {
      this.brExists = !!exists(dir.path("app/static-br"));
    }
    if (this.brExists) return "static-br";
    else return "static";
  },
};

if (!g.static_cache) {
  g.static_cache = {};
}

const cache = {
  static: g.static_cache as Record<
    string,
    { type: string; content: any; compression: "" | "br" }
  >,
};

export const serveStatic = {
  async init() {
    if (g.mode === "dev") {
      for (const k of Object.keys(cache.static)) {
        delete cache.static[k];
      }
    }
    await this.walk();
    if (g.mode === "dev") {
      watch(dir.path(`app/static`), async (_, filename) => {
        if (filename) {
          const path = join("static", filename);
          try {
            const file = Bun.file(dir.path(`app/${path}`));
            if (await file.exists()) {
              cache.static[`/${filename}`] = {
                type: mime.getType(path) || "application/octet-stream",
                compression: g.mode === "prod" ? "br" : "",
                content: await file.arrayBuffer(),
              };
            }
          } catch (e: any) {
            cache.static = {};
          }
        }
      });
    }
  },
  walk: async () => {
    const list = await inspectTreeAsync(dir.path(`app/${web.path}`));
    const walk = async (
      list: InspectTreeResult,
      parent?: InspectTreeResult[]
    ) => {
      if (list.type === "dir") {
        for (const item of list.children) {
          await walk(item, [...(parent || []), list]);
        }
      } else {
        const path = join(...(parent || []).map((e) => e.name), list.name);
        const file = Bun.file(dir.path(`app/${path}`));
        if (await file.exists()) {
          cache.static[path.substring(web.path.length)] = {
            type: mime.getType(path) || "application/octet-stream",
            compression: g.mode === "prod" ? "br" : "",
            content: await file.arrayBuffer(),
          };
        }
      }
    };
    if (list) {
      await walk(list);
    }
  },
  exists: (url: URL) => {
    return !!cache.static[url.pathname];
  },
  async serve(url: URL) {
    let file = cache.static[url.pathname];
    if (file) {
      return new Response(file.content, {
        headers: {
          ...CORS_HEADERS,
          ...{ "content-type": file.type },
          ...(file.compression ? { "content-encoding": file.compression } : {}),
        },
      });
    }

    if (g.mode === "dev" && url.pathname.endsWith(".js")) {
      await this.walk();
    }

    file = cache.static["/index.html"];

    if (file) {
      return new Response(file.content, {
        headers: {
          ...{ "content-type": file.type },
          ...(file.compression ? { "content-encoding": file.compression } : {}),
        },
      });
    }
  },
};
