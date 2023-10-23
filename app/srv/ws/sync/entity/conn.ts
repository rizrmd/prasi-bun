import { ServerWebSocket } from "bun";
import { SyncConnection } from "../type";
import { WSData } from "../../../../../pkgs/core/server/create";

export const conns = new Map<string, SyncConnection>();
export const wconns = new WeakMap<ServerWebSocket<WSData>, string>();
