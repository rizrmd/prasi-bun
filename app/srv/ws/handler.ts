import { WebSocketHandler } from "bun";
import { WSData } from "../../../pkgs/core/server/create";
import { eg } from "./sync/editor/edit-global";
import { syncHandler } from "./sync/sync-handler";

eg.edit = {
  site: {},
  comp: {},
  page: {},
  ws: new WeakMap(),
};

export const wsHandler: Record<string, WebSocketHandler<WSData>> = {
  "/sync": syncHandler,
};
   