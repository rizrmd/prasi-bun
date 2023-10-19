import { ServerWebSocket, WebSocketHandler } from "bun";
import { WSData } from "../../../../pkgs/core/server/create";
import { Packr } from "msgpackr";
import { createId } from "@paralleldrive/cuid2";
import { MSG_TO_SERVER } from "./type";
const packr = new Packr({ structuredClone: true });

const conns = new Map<
  string,
  {
    ws: ServerWebSocket<WSData>;
    msg: {
      pending: Record<string, Promise<any>>;
      resolve: Record<string, (result: any) => void>;
    };
  }
>();
const wconns = new WeakMap<ServerWebSocket<WSData>, string>();
export const syncHandler: WebSocketHandler<WSData> = {
  open(ws) {
    const id = createId();
    conns.set(id, { ws, msg: { pending: {}, resolve: {} } });
    wconns.set(ws, id);
    ws.sendBinary(packr.pack({ type: "identify", id }));
  },
  message(ws, raw) {
    const conn_id = wconns.get(ws);
    if (conn_id) {
      const conn = conns.get(conn_id);
      if (conn) {
        const msg = packr.unpack(Buffer.from(raw)) as MSG_TO_SERVER & {
          msg_client_id: string;
        };

        switch (msg.action) {
        }
      }
    }
  },
};
