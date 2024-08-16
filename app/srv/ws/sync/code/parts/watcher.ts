import watcher, { AsyncSubscription } from "@parcel/watcher";
import { readdir } from "node:fs/promises";
import { statSync } from "node:fs";
import { join } from "path";
import { code } from "../code";
import { user } from "../../entity/user";
import { conns } from "../../entity/conn";
import { sendWS } from "../../sync-handler";
import { SyncType } from "../../type";
export class Watcher {
  subcription = null as null | AsyncSubscription;

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

      this.subcription = await watcher.subscribe(path, (err, events) => {
        for (const e of events) {
          const filename = e.path.substring(path.length + 1);
          if (e.type === "create" || e.type === "update") {
            const fe = code.internal.frontend[id_site];
            if (
              filename?.startsWith("node_modules") ||
              filename?.startsWith("typings") ||
              filename?.endsWith(".log")
            )
              return;

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
          }
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  async close() {
    if (this.subcription) {
      await this.subcription.unsubscribe();
    }
  }
}
