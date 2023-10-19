import { Packr } from "msgpackr";
import {
  ClientAction,
  MSG_TO_CLIENT,
  MSG_TO_SERVER,
  ServerAction,
} from "../../../../srv/ws/sync/type";
import { SyncSite } from "./site";
import { createId } from "@paralleldrive/cuid2";
const packr = new Packr({ structuredClone: true });

export class SyncClient {
  private id = "";
  private ws: WebSocket;
  private wsPending?: Promise<void>;
  public connected = false;
  public loaded = {
    site: new Map<string, SyncSite>(),
  };

  public site = {
    load: async (id: string) => {
      this.loaded.site.set(id, new SyncSite(this, id));
    },
  };

  public _internal = {
    msg: {
      pending: {} as Record<string, Promise<any>>,
      resolve: {} as Record<string, (result: any) => void>,
    },
    send: async (msg: MSG_TO_SERVER) => {
      const { resolve, pending } = this._internal.msg;
      const msg_client_id = createId();
      pending[msg_client_id] = new Promise((done) => {
        resolve[msg_client_id] = done;
      });

      if (this.wsPending) {
        await this.wsPending;
      }

      this.ws.send(packr.pack({ ...msg, msg_client_id: createId() }));
    },
  };

  constructor(ws: WebSocket) {
    this.ws = ws;
  }

  private static instance = null as SyncClient | null;
  static connect() {
    if (SyncClient.instance) return SyncClient.instance;

    const url = new URL(location.href);
    url.pathname = "/sync";
    url.protocol = url.protocol === "http:" ? "ws:" : "wss:";

    const ws = new WebSocket(url.toString());
    const client = new SyncClient(ws);
    SyncClient.instance = client;
    let promise = {
      resolve: null as null | (() => void),
    };
    client.wsPending = new Promise((resolve) => {
      promise.resolve = resolve;
    });
    ws.onopen = () => {
      promise.resolve?.();
    };

    ws.onmessage = async (e) => {
      const raw = e.data as Blob;
      const msg = packr.unpack(
        Buffer.from(await raw.arrayBuffer())
      ) as MSG_TO_CLIENT & {
        msg_server_id: string;
      };

      if (!client.id) {
        if (msg.action === ClientAction.Identify) {
          client.id = msg.id;
          client.connected = true;
        }
      } else {
      }
    };

    return client;
  }
}
