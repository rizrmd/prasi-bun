import { g } from "utils/global";
import { validate } from "uuid";
import { glb } from "./global";
import { server } from "./ws/sync/editor/code/server-main";
glb.npm = { page: {}, site: {} };

glb.ws_hook = {
  ping(ws, data) {
    server.ws("ping", ws, data);
  },
  pong(ws, data) {
    server.ws("pong", ws, data);
  },
  drain(ws) {
    server.ws("drain", ws);
  },
  close(ws, code, reason) {
    server.ws("close", ws, code, reason);
  },
  message(ws, message) {
    server.ws("message", ws, message);
  },
  open(ws) {
    server.ws("open", ws);
  },
};

glb.server_hook = async (arg) => {
  const url = arg.url;
  if (url.pathname.startsWith("/prod/")) {
    const arr = url.pathname.split("/");
    const site_id = arr[2];

    if (arr.length >= 3 && validate(site_id)) {
      try {
        if (!g.server_runtime[site_id]) {
          if (g.server_runtime[site_id] !== null) {
            await g.createServerRuntime(site_id);
          }
        }

        const res = await server.http(site_id, arg);

        if (res instanceof Response) {
          return res;
        } else {
          if (!server.handler[site_id]) {
            return await arg.handle(arg.req);
          } else {
            return new Response("403: Please see server.log", { status: 403 });
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  if (arg.handle) return await arg.handle(arg.req);
};
