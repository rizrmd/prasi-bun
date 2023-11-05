import { ServerWebSocket } from "bun";
import { WSData } from "../../../../../pkgs/core/server/create";
import { conns, wconns } from "./conn";
import { sendWS } from "../sync-handler";
import { SyncType } from "../type";

export const RoomList = class<T extends Record<string, string>> {
  rooms = new Map<string, Room<T>>();
  name = "";
  constructor(name: string) {
    this.name = name;
  }
  joined(ws: ServerWebSocket<WSData>) {
    const rooms = new Set<Room<T>>();
    this.rooms.forEach((room) => {
      room.clients.forEach((_, roomws) => {
        if (roomws === ws) {
          rooms.add(room);
        }
      });
    });
    return rooms;
  }
  disconnect(ws: ServerWebSocket<WSData>) {
    this.rooms.forEach((room) => {
      room.clients.forEach((_, roomws) => {
        if (roomws === ws) {
          room.leave({ ws });
        }
      });
    });
  }

  set(
    id: string,
    ws: ServerWebSocket<WSData>,
    fn: (data: Partial<T>) => Partial<T>
  ) {
    const room = this.room(id);
    if (room) {
      room.set({ ws }, (ws, data) => {
        return fn(data);
      });

      room.broadcastState("set", ws);
    }
  }

  room(id: string) {
    let room = this.rooms.get(id);
    if (!room) {
      this.rooms.set(id, new Room<T>(this.name, id));
      room = this.rooms.get(id);
    }

    return room as Room<T>;
  }
};

export class Room<T extends Record<string, any>> {
  name = "";
  id = "";
  clients = new Map<ServerWebSocket<WSData>, Partial<T>>();

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }

  findAll(where: Partial<T>) {
    const clients = new Map<ServerWebSocket<WSData>, Partial<T>>();
    for (const [ws, data] of this.clients) {
      let match = true;
      for (const key in where) {
        if (data[key] !== where[key]) {
          match = false;
          break;
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
      this.broadcastState("join", ws);
    }
  }

  leave(client: { ws?: ServerWebSocket<WSData>; id?: string }) {
    const ws = this.identify(client);
    if (ws) {
      this.clients.delete(ws);
      this.broadcastState("leave", ws);
    }
  }

  broadcastState = (
    event_name: string,
    triggeredBy?: ServerWebSocket<WSData> | null
  ) => {
    const clients: any = [];
    this.clients.forEach((data, ws) => {
      const client_id = wconns.get(ws);
      if (client_id) {
        console.log(event_name, client_id, data);

        const client = conns.get(client_id);
        if (client)
          clients.push({
            user: {
              client_id,
              user_id: client.user?.id,
              username: client.user?.username,
            },
            data,
          });
      }
    });

    this.clients.forEach((_, ws) => {
      sendWS(ws, {
        type: SyncType.Event,
        event: `activity`,
        data: { activity: event_name, room_id: this.id, clients },
      });
    });
  };
}
