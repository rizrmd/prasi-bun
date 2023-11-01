import { ServerWebSocket } from "bun";
import { WSData } from "../../../../../pkgs/core/server/create";
import { conns } from "./conn";

export class Room<T extends Record<string, true | Record<string, any>>> {
  name = "";
  clients = new Map<ServerWebSocket<WSData>, Partial<T>>();

  constructor() {}

  findAll(where: Partial<T>) {
    const clients = new Map<ServerWebSocket<WSData>, Partial<T>>();
    for (const [ws, data] of this.clients) {
      let match = true;
      for (const key in where) {
        if (where[key] === true) {
          if (!data[key]) {
            match = false;
            break;
          }
        } else {
          if (data[key] !== where[key]) {
            match = false;
            break;
          }
        }
      }
      if (match) clients.set(ws, data);
    }
    return clients;
  }

  do(
    where: Partial<T>,
    action: (ws: ServerWebSocket<WSData>, data: Partial<T>) => void
  ) {
    for (const [ws, data] of this.findAll(where)) {
      action(ws, data);
    }
  }

  private identify(client: { ws?: ServerWebSocket<WSData>; id?: string }) {
    let ws = null as ServerWebSocket<WSData> | null;
    if (client.ws) {
      ws = client.ws;
    } else if (client.id) {
      const connws = conns.get(client.id)?.ws;
      if (connws) ws = connws;
    }
    return ws;
  }

  join(client: { ws?: ServerWebSocket<WSData>; id?: string }) {
    const ws = this.identify(client);
    if (ws) {
      this.clients.set(ws, {});
    }
  }

  leave(client: { ws?: ServerWebSocket<WSData>; id?: string }) {
    const ws = this.identify(client);
    if (ws) {
      this.clients.delete(ws);
    }
  }
}
