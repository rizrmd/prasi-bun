import { dir } from "dir";
import { inspectTreeAsync } from "fs-jetpack";
import { InspectTreeResult } from "fs-jetpack/types";
import { join } from "path";
import mime from "mime";

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
      for (const item of list.children) {
        if (item.type === "file") {
          const path = join(
            ...(parent || [{ name: "static" }]).map((e) => e.name),
            item.name
          );
          const file = await Bun.file(dir.path(`app/${path}`));
          if (await file.exists()) {
            cache.static[path.substring("static".length)] = {
              type: mime.getType(path) || "application/octet-stream",
              content: await file.arrayBuffer(),
            };
          }
        } else {
          await walk(item, parent ? [...parent, list] : [list]);
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
