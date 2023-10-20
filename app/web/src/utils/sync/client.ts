import { DeepProxy } from "@qiwi/deep-proxy";
import { xxhash32 } from "hash-wasm";
import { UseStore, get } from "idb-keyval";
import { Packr } from "msgpackr";
import { stringify } from "safe-stable-stringify";
import { SyncActions } from "../../../../srv/ws/sync/actions";
import { SyncActionDefinition } from "../../../../srv/ws/sync/actions-def";
import { initIDB } from "./idb";
import { SyncType } from "../../../../srv/ws/sync/type";
const packr = new Packr({ structuredClone: true });
const conf = {
  ws: null as null | WebSocket,
  client_id: "",
  idb: null as null | UseStore,
};

type User = {
  id: string;
  name: string;
};

export type ClientEventObject = Parameters<typeof clientStartSync>[0]["events"];
export type ClientEvent = keyof ClientEventObject;

export const clientStartSync = async (arg: {
  user_id: string;
  events: {
    editor_start: (arg: {
      user_id: string;
      site_id?: string;
      page_id?: string;
    }) => void;
  };
}) => {
  const { user_id, events } = arg;
  conf.idb = initIDB(user_id);
  await connect(user_id, events);
  const path: any[] = [];
  return new DeepProxy(
    SyncActionDefinition,
    ({ trapName, value, key, DEFAULT, PROXY }) => {
      if (trapName === "set") {
        throw new TypeError("target is immutable");
      }

      path.push(key);
      if (typeof value === "string") {
        if (path[0] === "then") path.shift();
        return (...args: any[]) =>
          new Promise((resolve) => {
            operation({
              path: path.join("."),
              resolve,
              args,
            });
          });
      }

      if (trapName === "get") {
        if (typeof value === "object" && value !== null) {
          return PROXY;
        }
      }

      return DEFAULT;
    }
  ) as unknown as typeof SyncActions;
};

const connect = (user_id: string, event: ClientEventObject) => {
  return new Promise<WebSocket>((resolve) => {
    if (!conf.ws) {
      const url = new URL(location.href);
      url.pathname = "/sync";
      url.protocol = url.protocol === "http:" ? "ws:" : "wss:";

      const ws = new WebSocket(url.toString());
      conf.ws = ws;
      ws.onopen = () => {
        ws.send(packr.pack({ type: SyncType.UserID, user_id }));
      };

      ws.onmessage = async (e) => {
        const raw = e.data as Blob;
        const msg = packr.unpack(Buffer.from(await raw.arrayBuffer()));
        if (msg.type === SyncType.ClientID) {
          conf.client_id = msg.client_id;
          resolve(ws);
        } else if (msg.type === SyncType.Event) {
          const eventName = msg.event as keyof ClientEventObject;
          if (event[eventName]) {
            event[eventName](msg.data);
          }
        }
      };
    }
  });
};

const operation = async (arg: {
  path: string;
  resolve: (value: any) => void;
  args: any[];
}) => {
  const ws = conf.ws;
  const idb = conf.idb;
  if (idb) {
    const sargs = stringify(arg.args);
    const hargs = await xxhash32(`${arg.path}-${sargs}`);

    if (ws && ws.readyState === ws.OPEN) {
      // online
    } else {
      // offline
      const cache = await get(hargs, idb);
      console.log(cache);
    }
  }
};
