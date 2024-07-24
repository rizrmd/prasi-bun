import { ServerWebSocket } from "bun";
import { WSData } from "../../../../../pkgs/core/server/create";
import { user } from "../entity/user";

export const previewLiveReload = (
  ws: ServerWebSocket<WSData>,
  msg:
    | { mode: "init"; data: { client_id: string; site_id: string } }
    | {
        mode: "listen";
        data:
          | { type: "page"; id: string; client_id: string }
          | { type: "comp"; ids: string[]; client_id: string };
      }
) => {
  if (msg.mode === "init") {
    user.active.add({
      client_id: msg.data.client_id,
      site_id: msg.data.site_id,
    });
  } else if (msg.mode === "listen") {
    if (msg.data.type === "page") {
      user.active.add({
        client_id: msg.data.client_id,
        page_id: msg.data.id,
      });
    } else if (msg.data.type === "comp") {
      for (const id of msg.data.ids) {
        user.active.add({
          client_id: msg.data.client_id,
          comp_id: id,
        });
      }
    }
  }
};
