import { glb } from "./global";
import { server } from "./ws/sync/editor/code/server-main";
glb.npm = { page: {}, site: {} };

glb.server_hook = async (arg) => {
  const url = arg.url;
  if (url.pathname.startsWith("/prod")) {
    const arr = url.pathname.split("/");
    const site_id = arr[2];

    return await server.serve(site_id, arg);
  }

  if (arg.handle) return await arg.handle(arg.req);
};
