import { ServerWebSocket } from "bun";
import { WSData } from "../../../../pkgs/core/server/create";
import { user } from "../../../db/db";
import { UserConf } from "./entity/user";

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
