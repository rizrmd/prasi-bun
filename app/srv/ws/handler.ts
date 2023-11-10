import { WebSocketHandler } from "bun";
import { WSData } from "../../../pkgs/core/server/create";
import { eg } from "./edit/edit-global";
import { syncHandler } from "./sync/sync-handler";
import { editHandler } from "./edit/edit-handler";

eg.edit = {
  site: {},
  comp: {},
  page: {},
  ws: new WeakMap(),
};

export const wsHandler: Record<string, WebSocketHandler<WSData>> = {
  "/sync": syncHandler,
  "/edit": editHandler,
};
   