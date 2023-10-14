import { file } from "bun";
import { inspectAsync, listAsync } from "fs-jetpack";
import { join } from "path";
import { dir } from "../utils/dir";
import { g } from "../utils/global";
import { parseArgs } from "./parse-args";

export const scanApi = async () => {
  g.api = {};
  const scan = async (path: string, root?: string) => {
    const apis = await listAsync(path);
    if (apis) {
      for (const filename of apis) {
        const importPath = join(path, filename);
        if (filename.endsWith(".ts")) {
          try {
            const api = await import(importPath);
            let args: string[] = await parseArgs(importPath);
            const route = {
              url: api._.url,
              args,
              fn: api._.api,
              path: importPath.substring((root || path).length + 1),
            };
            g.api[filename] = route;
            g.router.insert(route.url, g.api[filename]);
          } catch (e) {
            g.log.warn(
              `Failed to import app/srv/api${importPath.substring(
                (root || path).length
              )}`
            );

            const f = file(importPath);
            if (f.size > 0) {
              console.error(e);
            } else {
              g.log.warn(` ➨ file is empty`);
            }
          }
        } else {
          const dir = await inspectAsync(importPath);
          if (dir?.type === "dir") {
            await scan(importPath, path);
          }
        }
      }
    }
  };
  await scan(dir(`app/srv/api`));
  await scan(dir(`pkgs/api`));
};
