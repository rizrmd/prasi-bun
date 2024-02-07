import { dir } from "dir";
import { watch } from "fs";
import { parseArgs } from "./parse-args";
import { g } from "utils/global";
export const watchApiRoutes = () => {
  const root = dir.path(`app/srv/api`);
  watch(root, { recursive: true }, async (e, filename) => {
    if (filename && filename.endsWith(".ts")) {
      const oldroute = g._api[filename];
      if (oldroute) {
        g.router.remove(oldroute.url);
      }

      const importPath = dir.path(`app/srv/api/${filename}`);
      delete require.cache[importPath];
      const api = require(importPath);
      let args: string[] = await parseArgs(importPath);
      const route = {
        url: api._.url,
        args,
        fn: api._.api,
        path: importPath.substring(root.length + 1),
      };
      g._api[filename] = route;
      g.router.insert(route.url.replace(/\*/gi, "**"), route);
    }
  });
};
