import { WebSocketHandler } from "bun";

export const wsHandler: Record<string, WebSocketHandler<{ url: URL }>> = {
  "/edit": {
    open(ws) {},
    message(ws, message) {},
    close(ws, code, reason) {},
    drain(ws) {},
  },
};
