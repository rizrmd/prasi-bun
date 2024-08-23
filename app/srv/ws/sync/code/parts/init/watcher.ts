import { FSWatcher, statSync, watch } from "fs";
import { readdir } from "node:fs/promises";
import { join } from "path";
import { code } from "../../code";

const path = process.argv.splice(2).join(" ");

const watchers = {} as Record<string, FSWatcher>;

const createWatcher = (p: string, recursive: boolean, prefix?: string) => {
  return watch(p, { recursive }, (e, filename) => {
    if (filename === "global.d.ts") return;
    if (
      filename?.endsWith(".tsx") ||
      filename?.endsWith(".ts") ||
      filename?.endsWith(".css") ||
      filename?.endsWith(".html")
    ) {
      process.send?.([e, (prefix || "") + filename]);
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
    watchers[file] = createWatcher(fullpath, true, `${file}/`);
  }
}
setInterval(() => {}, 1e9);
