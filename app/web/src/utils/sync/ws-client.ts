import { DeepProxy } from "@qiwi/deep-proxy";
import { xxhash32 } from "hash-wasm";
import { UseStore, get, set } from "idb-keyval";
import { Packr } from "msgpackr";
import { stringify } from "safe-stable-stringify";
import { SyncActions } from "../../../../srv/ws/sync/actions";
import {
  SyncActionDefinition,
  SyncActionPaths,
} from "../../../../srv/ws/sync/actions-def";
import { UserConf } from "../../../../srv/ws/sync/entity/user";
import { SyncType } from "../../../../srv/ws/sync/type";
import { ESite } from "../../render/ed/logic/ed-global";
import { w } from "../types/general";
import { initIDB } from "./idb";
const packr = new Packr({ structuredClone: true });

const WS_DEBUG = false;

const conf = {
  ws: null as null | WebSocket,
  client_id: "",
  idb: null as null | UseStore,
  event: null as null | ClientEventObject,
};

const runtime = {
  action: {
    pending: {} as Record<
      string,
      { ts: number; resolve: (value: any) => void }
    >,
  },
};

type User = {
  id: string;
  name: string;
};

export type ClientEventObject = Parameters<typeof clientStartSync>[0]["events"];
export type ClientEvent = keyof ClientEventObject;

const sendWs = (ws: WebSocket, msg: any) => {
  if (WS_DEBUG) console.log(`%c⬆`, "color:blue", msg);
  ws.send(packr.pack(msg));
};

export const clientStartSync = async (arg: {
  user_id: string;
  events: {
    editor_start: (arg: UserConf) => void;
    site_loaded: (arg: { site: ESite }) => void;
    remote_svlocal: (arg: {
      type: "page" | "comp";
      id: string;
      sv_local: Uint8Array;
    }) => void;
  };
}) => {
  const { user_id, events } = arg;
  conf.idb = initIDB(user_id);
  await connect(user_id, events);
  return new DeepProxy(
    SyncActionDefinition,
    ({ target, trapName, value, key, DEFAULT, PROXY }) => {
      if (trapName === "set") {
        throw new TypeError("target is immutable");
      }

      if (typeof value === "string") {
        return (...args: any[]) => {
          return new Promise((resolve) => {
            doAction({
              code: value,
              resolve,
              args,
            });
          });
        };
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
      const data = await loadEventOffline(eventName);

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
          sendWs(ws, { type: SyncType.UserID, user_id });
          conf.ws = ws;
        };
        ws.onclose = async () => {
          console.log("disconnected..");
          w.offline = true;
          if (!conf.ws) {
            await connect(user_id, event);
            resolve();
          }
        };
        ws.onmessage = async (e) => {
          const raw = e.data as Blob;
          const msg = packr.unpack(Buffer.from(await raw.arrayBuffer()));
          if (WS_DEBUG) console.log(`%c⬇`, `color:red`, msg);

          if (msg.type === SyncType.ClientID) {
            conf.client_id = msg.client_id;
            resolve();
          } else if (msg.type === SyncType.Event) {
            const eventName = msg.event as ClientEvent;

            if (event[eventName]) {
              if (offlineEvents.includes(eventName)) {
                saveEventOffline(eventName, msg.data);
              }
              event[eventName](msg.data);
            }
          } else if (msg.type === SyncType.ActionResult) {
            const pending = runtime.action.pending[msg.argid];
            if (pending) {
              delete runtime.action.pending[msg.argid];
              const idb = conf.idb;
              if (idb) {
                await set(msg.argid, msg.val, idb);
              }
              pending.resolve(msg.val);
            }
          }
        };
      }
    });
  }
};

const offlineEvents: ClientEvent[] = ["editor_start"];
const saveEventOffline = async (name: ClientEvent, data: any) => {
  const idb = conf.idb;
  if (idb) {
    const hargs = await xxhash32(`ev-${name}`);
    await set(hargs, data, idb);
  }
};

const loadEventOffline = async (name: ClientEvent) => {
  const idb = conf.idb;
  if (idb) {
    const hargs = await xxhash32(`ev-${name}`);
    return await get(hargs, idb);
  }
};

const doAction = async <T>(arg: {
  code: string;
  resolve: (value: any) => void;
  args: any[];
}) => {
  const { args, code, resolve } = arg;
  const ws = conf.ws;
  const idb = conf.idb;
  if (idb) {
    const sargs = stringify(args);
    const path = (SyncActionPaths as any)[code];
    const argid = await xxhash32(`op-${path}-${sargs}`);

    if (ws && ws.readyState === ws.OPEN) {
      // online
      runtime.action.pending[argid] = {
        ts: Date.now(),
        resolve,
      };

      sendWs(ws, { type: SyncType.Action, code, args, argid });
    } else {
      // offline
      const cache = await get(argid, idb);
      resolve(cache as T);
    }
  }
};
