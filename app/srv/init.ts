import { existsAsync } from "fs-jetpack";
import { glb } from "./global";
import { code, server } from "./ws/sync/editor/code/util-code";

glb.npm = { page: {}, site: {} };

glb.server_hook = async (arg) => {
  const url = arg.url;
  if (url.pathname.startsWith("/prod")) {
    const arr = url.pathname.split("/");
    const site_id = arr[2];

    if (typeof server[site_id] === "undefined") {
      const server_src_path = code.path(site_id, "server", "build", "index.js");
      server[site_id] = null;
      if (await existsAsync(server_src_path)) {
        const svr = require(server_src_path);
        if (svr && svr.server) {
          server[site_id] = svr.server;
        }
      }
    }

    if (server[site_id]) {
      try {
        return await server[site_id]?.http(arg);
      } catch (e) {}
    }
  }

  if (arg.handle) return await arg.handle(arg.req);
};
