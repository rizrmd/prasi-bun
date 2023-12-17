import { dir } from "dir";
import { inspectTreeAsync } from "fs-jetpack";
import { InspectTreeResult } from "fs-jetpack/types";
import { join } from "path";
import { watch } from "fs";

import mime from "mime";
import { g } from "utils/global";

const webPath = "app/static";
const cache = {
  static: {} as Record<string, { type: string; content: any }>,
};

export const serveStatic = {
  init: async () => {
    const list = await inspectTreeAsync(dir.path(`${webPath}`));
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
          cache.static[path.substring("static".length)] = {
            type: mime.getType(path) || "application/octet-stream",
            content: await file.arrayBuffer(),
          };
        }
      } 
    };
    if (list) {
      await walk(list);
    }

    if (g.mode === "dev") {
      watch(dir.path(`app/static`), async (_, filename) => {
        if (filename) {
          const path = join("static", filename);
          const file = Bun.file(dir.path(`app/${path}`));
          if (await file.exists()) {
            cache.static[`/${filename}`] = {
              type: mime.getType(path) || "application/octet-stream",
              content: await file.arrayBuffer(),
            };
          }
        }
      });
    }
  },
  exists: (url: URL) => {
    return !!cache.static[url.pathname];
  },
  serve: (url: URL) => {
    const file = cache.static[url.pathname];
    if (file) {
      return new Response(file.content, {
        headers: { "content-type": file.type },
      });
    }

    const index = cache.static["/index.html"];
    if (index) {
      return new Response(index.content, {
        headers: { "content-type": index.type },
      });
    }
  },
};
