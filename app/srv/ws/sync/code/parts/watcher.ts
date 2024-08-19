import { conns } from "../../entity/conn";
import { user } from "../../entity/user";
import { sendWS } from "../../sync-handler";
import { SyncType } from "../../type";
import { FSWatcher, statSync, watch } from "fs";
import { readdir } from "node:fs/promises";
import { code } from "../code";
import { join } from "path";
import { Subprocess } from "bun";

export class Watcher {
  proc: undefined | Subprocess;

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

      this.proc = Bun.spawn(
        ["bun", join(import.meta.dir, "init/watcher.ts"), path],
        {
          stdout: "inherit",
          stderr: "inherit",
          ipc(message, childProc) {
            console.log(id_site, message);
            const fe = code.internal.frontend[id_site];
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
          },
        }
      );
    } catch (e) {
      console.error(e);
    }
  }

  async close() {
    this.proc?.kill();
  }
}
