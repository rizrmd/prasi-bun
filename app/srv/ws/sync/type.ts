import { ServerWebSocket } from "bun";
import { UserConf } from "./entity/user";
import { WSData } from "../../../../pkgs/core/server/create";
import { user } from "../../../db/db";

export enum Activity {
  Open,
  Null,
}

export type PAGE_ID = string;
export type COMP_ID = string;
export type ITEM_ID = string;
export type CLIENT_ID = string;

export type ActivityKind = "root" | "js" | "css" | "html" | "text";
export type ActivityList = Record<
  ITEM_ID,
  Partial<Record<ActivityKind, Record<CLIENT_ID, Activity>>>
>;

export enum SyncType {
  ClientID,
  UserID,
  Event,
  Action,
  ActionResult,
}

export type SyncConnection = {
  user_id: string;
  user: null | user;
  client_id: string;
  conf?: UserConf & { toJSON: () => UserConf };
  ws: ServerWebSocket<WSData>;
  msg: {
    pending: Record<string, Promise<any>>;
    resolve: Record<string, (result: any) => void>;
  };
};
