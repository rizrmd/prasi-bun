import { DeepProxy } from "@qiwi/deep-proxy";
import { xxhash32 } from "hash-wasm";
import { UseStore, get, set } from "idb-keyval";
import { Packr } from "msgpackr";
import { stringify } from "safe-stable-stringify";
import type { SyncActions } from "../../../../srv/ws/sync/actions";
import {
  SyncActionDefinition,
  SyncActionPaths,
} from "../../../../srv/ws/sync/actions-def";
import { UserConf } from "../../../../srv/ws/sync/entity/user";
import { SyncType } from "../../../../srv/ws/sync/type";
import { ESite } from "../../nova/ed/logic/ed-global";
import { w } from "../types/general";
import { initIDB } from "./idb";
const packr = new Packr({ structuredClone: true });

/** CONSTANT */
const WS_CONFIG = {
  debug: !!localStorage.getItem("prasi-ws-debug"),
  reconnectTimeout: 1000,
};

w.debug = new Proxy(
  {},
  {
    get(target, p, receiver) {
      if (p === "off") {
        WS_CONFIG.debug = false;
        localStorage.removeItem("prasi-js-debug");
        localStorage.removeItem("prasi-ws-debug");
        console.clear();
        return ["WS DEBUG: Deactivated"];
      }
      if (p === "on") {
        WS_CONFIG.debug = true;
        localStorage.setItem("prasi-ws-debug", "1");
        console.clear();
        return ["WS DEBUG: Activated"];
      }
      if (p === "js") {
        localStorage.setItem("prasi-js-debug", "1");
        console.clear();
        return ["JS DEBUG: Activated"];
      }
    },
  }
) as any;

const conf = {
  ws: null as null | WebSocket,
  client_id: "",
  idb: null as null | UseStore,
  event: null as null | ClientEventObject,
};

const runtime = {
  action: {
    done: [] as string[],
    pending: {} as Record<
      string,
      {
        ts: number;
        timeout: any;
        resolves: ((value: any) => void)[];
      }
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
  const raw = packr.pack(msg);
  if (WS_CONFIG.debug)
    console.log(`%c⬆`, "color:blue", formatBytes(raw.length, 0), msg);
  ws.send(raw);
};

export const clientStartSync = async (arg: {
  user_id: string;
  site_id?: string;
  page_id?: string;
  events: {
    editor_start: (arg: UserConf) => void;
    remote_svlocal: (arg: {
      type: "page" | "comp";
      id: string;
      sv_local: Uint8Array;
    }) => void;
    site_updated: (
      arg: Partial<
        Omit<ESite, "js" | "js_compiled"> & {
          js: Uint8Array;
          js_compiled: Uint8Array;
        }
      >
    ) => void;
    code_changes: (arg: {
      ts: number;
      mode: "frontend" | "typings";
      status: "error" | "ok" | "building";
    }) => void;
    disconnected: () => { reconnect: boolean };
    opened: () => void;
    shakehand: (client_id: string) => void;
  };
}) => {
  const { user_id, site_id, page_id, events } = arg;
  conf.idb = initIDB(user_id);
  await connect({ user_id, site_id, page_id }, events);
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

const connect = (
  opt: { user_id: string; page_id?: string; site_id?: string },
  event: ClientEventObject
) => {
  const { user_id, page_id, site_id } = opt;
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
    return new Promise<void>((resolve, reject) => {
      if (!conf.ws) {
        let reconnect = 0;
        const retry = () => {
          const url = new URL(w.basehost || location.href);
          url.pathname = "/sync";
          url.protocol = url.protocol === "http:" ? "ws:" : "wss:";

          const ws = new WebSocket(
            `${url.protocol}//${url.host}${url.pathname}`
          );

          let timeout = setTimeout(() => {
            clearTimeout(timeout);
            ws.close();
            retry();
          }, 2000);

          ws.onopen = () => {
            clearTimeout(timeout);
            w.offline = false;
            w.editorRender?.();

            sendWs(ws, { type: SyncType.UserID, user_id, site_id, page_id });
            conf.ws = ws;
            event.opened();
          };

          ws.onmessage = async (e) => {
            const raw = e.data as Blob;
            const msg = packr.unpack(Buffer.from(await raw.arrayBuffer()));
            if (WS_CONFIG.debug)
              console.log(`%c⬇`, `color:red`, formatBytes(raw.size, 0), msg);

            if (msg.type === SyncType.ClientID) {
              conf.client_id = msg.client_id;
              event.shakehand(msg.client_id);

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
                pending.resolves.map((e) => e(msg.val));
                clearTimeout(pending.timeout);
                delete runtime.action.pending[msg.argid];
                const idb = conf.idb;
                if (idb) {
                  await set(msg.argid, msg.val, idb);
                }
              }
            }
          };
        };
        retry();
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

    if (runtime.action.pending[argid]) {
      runtime.action.pending[argid].resolves.push(resolve);
      return;
    }
    if (runtime.action.done.includes(argid)) {
      resolve(undefined);
      return;
    }
    if (ws && ws.readyState === ws.OPEN) {
      runtime.action.done.push(argid);
      while (runtime.action.done.length > 50) {
        runtime.action.done.shift();
      }
      // online
      runtime.action.pending[argid] = {
        ts: Date.now(),
        resolves: [resolve],
        timeout: path.startsWith("yjs.")
          ? setTimeout(() => {
              console.error(`Sync too long: `, {
                type: SyncType.Action,
                code,
                args,
                argid,
              });
              w.sync_too_long = true;
            }, 10000)
          : undefined,
      };

      sendWs(ws, { type: SyncType.Action, code, args, argid });
    } else {
      // offline
      const cache = await get(argid, idb);
      resolve(cache as T);
    }
  }
};

function formatBytes(bytes: number, decimals: number) {
  if (bytes == 0) return "0 Bytes";
  var k = 1024,
    dm = decimals || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
