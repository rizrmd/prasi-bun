import { conns } from "../../entity/conn";
import { user } from "../../entity/user";
import { sendWS } from "../../sync-handler";
import { SyncType } from "../../type";
import { FSWatcher, statSync, watch } from "fs";
import { readdir } from "node:fs/promises";
import { code } from "../code";
import { join } from "path";
export class Watcher {
  watchers = {} as Record<string, FSWatcher>;

  constructor(path: string, id_site: string) {
    this.init(path, id_site);
  }

  async init(path: string, id_site: string) {
    try {
      const broadcastLoading = async () => {
        const client_ids = user.active
          .findAll({ site_id: id_site })
          .map((e) => e.client_id);

        const now = Date.now();

        client_ids.forEach((client_id) => {
          const ws = conns.get(client_id)?.ws;
          if (ws)
            sendWS(ws, {
              type: SyncType.Event,
              event: "code_changes",
              data: { ts: now, mode: "frontend", status: "building" },
            });
        });
      };

      const createWatcher = (p: string, recursive: boolean) => {
        return watch(p, { recursive }, (e, filename) => {
          const fe = code.internal.frontend[id_site];

          if (
            filename?.endsWith(".tsx") ||
            filename?.endsWith(".ts") ||
            filename?.endsWith(".css") ||
            filename?.endsWith(".html")
          ) {
            if (typeof fe !== "undefined" && !fe.rebuilding) {
              fe.rebuilding = true;
              clearTimeout(fe.timeout);
              fe.timeout = setTimeout(async () => {
                try {
                  broadcastLoading();
                  await fe.ctx.rebuild();
                  fe.rebuilding = false;
                } catch (e: any) {
                  console.error(`Frontend failed rebuild (site: ${id_site})`);
                  console.error(e.message);
                  fe.rebuilding = false;
                }
              }, 500);
            }
          }
        });
      };

      this.watchers["."] = createWatcher(path, false);
      const files = await readdir(path);
      for (const file of files) {
        if (file.startsWith(".") || file === "node_modules") continue;
        const fullpath = join(path, file);
        const stats = statSync(fullpath);
        if (stats.isDirectory()) {
          this.watchers[file] = createWatcher(fullpath, true);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async close() {
    for (const v of Object.values(this.watchers)) {
      v.close();
    }
  }
}
