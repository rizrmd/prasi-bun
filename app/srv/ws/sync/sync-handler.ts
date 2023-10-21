import { createId } from "@paralleldrive/cuid2";
import { ServerWebSocket, WebSocketHandler } from "bun";
import { Packr } from "msgpackr";
import { WSData } from "../../../../pkgs/core/server/create";
import { ClientEvent } from "../../../web/src/utils/sync/client";
import { loadDefaultSite } from "./editor/load";
import { ActionCtx, SyncType } from "./type";
import { SyncActionPaths } from "./actions-def";
import * as actions from "./actions/index";
import { UserConf, user } from "./entity/user";
const packr = new Packr({ structuredClone: true });

const conns = new Map<
  string,
  {
    user_id: string;
    conf?: UserConf & { toJSON: () => UserConf };
    ws: ServerWebSocket<WSData>;
    msg: {
      pending: Record<string, Promise<any>>;
      resolve: Record<string, (result: any) => void>;
    };
  }
>();
const wconns = new WeakMap<ServerWebSocket<WSData>, string>();
const send = (ws: ServerWebSocket<WSData>, msg: any) => {
  ws.sendBinary(packr.pack(msg));
};
export const syncHandler: WebSocketHandler<WSData> = {
  open(ws) {
    const client_id = createId();
    conns.set(client_id, {
      user_id: "",
      ws,
      msg: { pending: {}, resolve: {} },
    });
    wconns.set(ws, client_id);
    send(ws, { type: SyncType.ClientID, client_id });
  },
  close(ws, code, reason) {
    const conn_id = wconns.get(ws);
    if (conn_id) {
      conns.delete(conn_id);
      wconns.delete(ws);
    }
  },
  async message(ws, raw) {
    const conn_id = wconns.get(ws);
    if (conn_id) {
      const conn = conns.get(conn_id);
      if (conn) {
        const msg = packr.unpack(Buffer.from(raw));
        if (msg.type === SyncType.UserID) {
          const { user_id } = msg;
          conn.user_id = user_id;

          const conf = user.conf.getOrCreate(user_id);
          if (!conf.site_id) {
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
          send(ws, {
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
              console.log(`app/ws/edit/sync/${actionName}.ts not found`);
            }
            if (baseAction) {
              const action = baseAction.bind({
                user: { id: conn.user_id, conf: conn.conf },
              } as ActionCtx);

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
