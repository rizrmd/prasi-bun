import { createId } from "@paralleldrive/cuid2";
import { ServerWebSocket, WebSocketHandler } from "bun";
import { Packr } from "msgpackr";
import { WSData } from "../../../../pkgs/core/server/create";
import { ClientEvent } from "../../../web/src/utils/sync/client";
import { loadUserConf } from "./editor/load";
import { SyncType } from "./type";
const packr = new Packr({ structuredClone: true });

const conns = new Map<
  string,
  {
    user_id: string;
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
          const conf = await loadUserConf(user_id);
          send(ws, {
            type: SyncType.Event,
            event: "editor_start" as ClientEvent,
            data: conf,
          });
        }
      }
    }
  },
};
