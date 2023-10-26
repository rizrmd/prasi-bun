import { ServerWebSocket } from "bun";
import { UserConf } from "./entity/user";
import { WSData } from "../../../../pkgs/core/server/create";
import { user } from "../../../db/db";

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
