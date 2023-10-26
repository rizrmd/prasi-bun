import { ServerWebSocket } from "bun";
import { WSData } from "../../../../../pkgs/core/server/create";
import { sendWS } from "../sync-handler";
import { SyncType } from "../type";
import { conns } from "./conn";
import { user } from "./user";

type PAGE_ID = string;
type COMP_ID = string;
type ITEM_ID = string;
type CLIENT_ID = string;

export enum Activity {
  Open,
  Null,
}
export type ActivityKind = "root" | "js" | "css" | "html" | "text";
export type ActivityList = Record<
  ITEM_ID,
  Partial<Record<ActivityKind, Record<CLIENT_ID, Activity>>>
>;
export const actstore = {
  page: {} as Record<PAGE_ID, ActivityList>,
  comp: {} as Record<COMP_ID, ActivityList>,
};

export const broadcastActivity = (
  arg: { page_id?: string; comp_id?: string },
  exclude?: CLIENT_ID[]
) => {
  const wss = new Set<ServerWebSocket<WSData>>();
  const data = {} as any;
  if (arg.page_id) {
    data.page = actstore.page[arg.page_id] || {};
    user.active.findAll({ page_id: arg.page_id }).forEach((u) => {
      if (u.client_id && (!exclude || !exclude.includes(u.client_id))) {
        const ws = conns.get(u.client_id)?.ws;
        if (ws) wss.add(ws);
      }
    });
  }
  if (arg.comp_id) {
    data.comp = actstore.page[arg.comp_id] || {};
    user.active.findAll({ comp_id: arg.comp_id }).forEach((u) => {
      if (u.client_id && (!exclude || !exclude.includes(u.client_id))) {
        const ws = conns.get(u.client_id)?.ws;
        if (ws) {
          wss.add(ws);
        }
      }
    });
  }
  wss.forEach((ws) => {
    sendWS(ws, {
      type: SyncType.Event,
      event: "activity",
      data,
    });
  });
};
