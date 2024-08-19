import { FSWatcher, statSync, watch } from "fs";
import { readdir } from "node:fs/promises";
import { join } from "path";

const path = process.argv.splice(2).join(" ");

const watchers = {} as Record<string, FSWatcher>;

const createWatcher = (p: string, recursive: boolean) => {
  return watch(p, { recursive }, (e, filename) => {
    if (filename === "global.d.ts") return;
    if (
      filename?.endsWith(".tsx") ||
      filename?.endsWith(".ts") ||
      filename?.endsWith(".css") ||
      filename?.endsWith(".html")
    ) {
      process.send?.([e, filename]);
    }
  });
};

watchers["."] = createWatcher(path, false);
const files = await readdir(path);
for (const file of files) {
  if (file.startsWith(".") || file === "node_modules") continue;
  const fullpath = join(path, file);
  const stats = statSync(fullpath);
  if (stats.isDirectory()) {
    watchers[file] = createWatcher(fullpath, true);
  }
}
setInterval(() => {}, 1e9);
