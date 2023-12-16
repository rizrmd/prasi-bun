import { WebSocketHandler } from "bun";
import { WSData } from "./create";

export const serveWS: (
  wsHandler: Record<string, WebSocketHandler<WSData>>
) => Promise<WebSocketHandler<WSData>> = async (wsHandler) => {
  return {
    maxPayloadLength: 9999999,
    closeOnBackpressureLimit: true,
    drain(ws) {
      // console.log("Backpressure relieved...");
    },
    close(ws, code, reason) {
      const pathname = ws.data.url.pathname;
      if (wsHandler[pathname]) {
        const close = wsHandler[pathname].close;
        if (close) {
          close(ws, code, reason);
        }
      }
    },
    message(ws, message) {
      const pathname = ws.data.url.pathname;
      if (wsHandler[pathname]) {
        const msg = wsHandler[pathname].message;
        if (msg) {
          msg(ws, message);
        }
      }
    },
    open(ws) {
      const pathname = ws.data.url.pathname;
      if (wsHandler[pathname]) {
        const open = wsHandler[pathname].open;
        if (open) {
          open(ws);
        }
      }
    },
  } as WebSocketHandler<WSData>;
};
