import { createId } from "@paralleldrive/cuid2";
import { ServerWebSocket, WebSocketHandler } from "bun";
import { Packr } from "msgpackr";
import { WSData } from "../../../../pkgs/core/server/create";
import { ClientEvent } from "../../../web/src/utils/sync/ws-client";
import { SyncActionPaths } from "./actions-def";
import * as actions from "./actions/index";
import { loadDefaultSite } from "./editor/load-default";
import { loadSitePage } from "./editor/load-sitepage";
import { conns, wconns } from "./entity/conn";
import { UserConf, user } from "./entity/user";
import { SyncType } from "./type";
import { activity } from "./entity/activity";
const packr = new Packr({ structuredClone: true });

export const sendWS = (ws: ServerWebSocket<WSData>, msg: any) => {
  ws.sendBinary(packr.pack(msg));
};
export const syncHandler: WebSocketHandler<WSData> = {
  open(ws) {
    const client_id = createId();
    conns.set(client_id, {
      user_id: "",
      user: null,
      client_id,
      ws,
      msg: { pending: {}, resolve: {} },
    });
    wconns.set(ws, client_id);
    sendWS(ws, { type: SyncType.ClientID, client_id });
  },
  close(ws) {
    const client_id = wconns.get(ws);
    if (client_id) {
      conns.delete(client_id);
      wconns.delete(ws);

      activity.site.disconnect(ws);
    }
  },
  async message(ws, raw) {
    const conn_id = wconns.get(ws);
    if (conn_id) {
      const conn = conns.get(conn_id);
      if (conn) {
        const msg = packr.unpack(Buffer.from(raw));
        if (msg.type === SyncType.UserID) {
          const { user_id, page_id, site_id } = msg;

          conn.user_id = user_id;
          conn.user = await db.user.findFirst({ where: { id: user_id } });

          let conf = await user.conf.getOrCreate(user_id);
          if (site_id) {
            const newconf = await loadSitePage(user_id, site_id, page_id);
            if (newconf) conf = newconf;
          } else if (!conf.site_id) {
            await loadDefaultSite(user_id);
          }

          conn.conf = new Proxy(conf, {
            get(_, p) {
              const conf = user.conf.get(user_id);
              if (p === "toJSON") return () => conf;
              if (conf) return conf[p as keyof typeof conf];
            },
            set(_, p, newValue) {
              user.conf.set(user_id, p as keyof UserConf, newValue);
              return true;
            },
          }) as UserConf & { toJSON: () => UserConf };
          sendWS(ws, {
            type: SyncType.Event,
            event: "editor_start" as ClientEvent,
            data: conn.conf.toJSON(),
          });
        }
        if (msg.type === SyncType.Action) {
          const code = msg.code as keyof typeof SyncActionPaths;
          const actionName = SyncActionPaths[code].replace(/\./gi, "_");
          if (actionName) {
            const baseAction = (actions as any)[actionName];
            if (!baseAction) {
              console.log(`app/srv/ws/sync/actions/${actionName}.ts not found`);
            }
            if (baseAction) {
              const action = baseAction.bind(conn);

              ws.sendBinary(
                packr.pack({
                  type: SyncType.ActionResult,
                  argid: msg.argid,
                  val: await action(...msg.args),
                })
              );
            }
          }
        }
      }
    }
  },
};
