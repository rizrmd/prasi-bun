import { DeepProxy } from "@qiwi/deep-proxy";
import { xxhash32 } from "hash-wasm";
import { UseStore, get, set } from "idb-keyval";
import { Packr } from "msgpackr";
import { stringify } from "safe-stable-stringify";
import { SyncActions } from "../../../../srv/ws/sync/actions";
import { SyncActionDefinition } from "../../../../srv/ws/sync/actions-def";
import { initIDB } from "./idb";
import { SyncType } from "../../../../srv/ws/sync/type";
import { w } from "../types/general";
const packr = new Packr({ structuredClone: true });
const conf = {
  ws: null as null | WebSocket,
  client_id: "",
  idb: null as null | UseStore,
  event: null as null | ClientEventObject,
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
            doAction({
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
  conf.event = event;
  if (w.offline) {
    return new Promise<void>(async (resolve) => {
      resolve();
      const eventName = "editor_start";
      const data = await loadOfflineMsg("ev", eventName);

      if (event[eventName]) {
        event[eventName](data);
      }
    });
  } else {
    return new Promise<void>((resolve) => {
      if (!conf.ws) {
        const url = new URL(location.href);
        url.pathname = "/sync";
        url.protocol = url.protocol === "http:" ? "ws:" : "wss:";

        const ws = new WebSocket(url.toString());

        ws.onopen = () => {
          ws.send(packr.pack({ type: SyncType.UserID, user_id }));
          conf.ws = ws;
        };
        ws.onclose = async () => {
          w.offline = true;
          if (!conf.ws) {
            await connect(user_id, event);
            resolve();
          }
        };
        ws.onmessage = async (e) => {
          const raw = e.data as Blob;
          const msg = packr.unpack(Buffer.from(await raw.arrayBuffer()));
          if (msg.type === SyncType.ClientID) {
            conf.client_id = msg.client_id;
            resolve();
          } else if (msg.type === SyncType.Event) {
            const eventName = msg.event as ClientEvent;

            if (event[eventName]) {
              if (offlineEvents.includes(eventName)) {
                saveOfflineMsg("ev", eventName, msg.data);
              }
              event[eventName](msg.data);
            }
          }
        };
      }
    });
  }
};

const offlineEvents: ClientEvent[] = ["editor_start"];
const saveOfflineMsg = async (type: "ev", name: ClientEvent, data: any) => {
  const idb = conf.idb;
  if (idb) {
    const hargs = await xxhash32(`${type}-${name}`);
    await set(hargs, data, idb);
  }
};

const loadOfflineMsg = async (type: "ev", name: ClientEvent) => {
  const idb = conf.idb;
  if (idb) {
    const hargs = await xxhash32(`${type}-${name}`);
    return await get(hargs, idb);
  }
};

const doAction = <T>(arg: {
  path: string;
  resolve: (value: any) => void;
  args: any[];
}) => {
  return new Promise<T>(async (resolve) => {
    const ws = conf.ws;
    const idb = conf.idb;
    if (idb) {
      const sargs = stringify(arg.args);
      const hargs = await xxhash32(`op-${arg.path}-${sargs}`);

      if (w.offline || (ws && ws.readyState === ws.OPEN)) {
        // online
      } else {
        // offline
        const cache = await get(hargs, idb);
        resolve(cache as T);
      }
    }
  });
};
