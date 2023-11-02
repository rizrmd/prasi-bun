import { ServerWebSocket } from "bun";
import { WSData } from "../../../../../pkgs/core/server/create";
import { conns } from "./conn";

export const RoomList = class<
  T extends Record<string, true | Record<string, any>>,
> {
  rooms = new Map<string, Room<T>>();
  constructor() {}
};

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

  set(
    client: { ws?: ServerWebSocket<WSData>; id?: string },
    action: (ws: ServerWebSocket<WSData>, data: Partial<T>) => Partial<T>
  ) {
    const ws = this.identify(client);
    if (ws) {
      const data = this.clients.get(ws);
      if (data) {
        const newdata = action(ws, data);
        this.clients.set(ws, newdata);
      }
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
