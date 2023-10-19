import { ServerWebSocket } from "bun";
import { gzip } from "zlib";
import { WSData } from "../../../../pkgs/core/server/create";

export const sendWS = async (ws: ServerWebSocket<WSData>, msg: string) => {
  gzip(Buffer.from(msg), (err, data) => {
    if (!err) {
      ws.sendBinary(data);
    }
  });
};
