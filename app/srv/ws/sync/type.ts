import { UserConf } from "./user";

export enum SyncType {
  ClientID,
  UserID,
  Event,
  Action,
  ActionResult,
}
export type ActionCtx = {
  user: { id: string; conf: UserConf & { toJSON: () => UserConf } };
};
