import { code } from "../ws/sync/code/code";
import { initFrontEnd } from "../ws/sync/code/parts/init/frontend";

export const _ = {
  url: "/rebuild/:id_site",
  async api(id_site: string) {
    const { frontend, server, typings } = code.internal;
    const root = `/code/${id_site}/site/src`;
    // delete frontend[id_site];
    // delete server[id_site];
    await initFrontEnd(root, id_site, true);
    // await initServer(root, id_site, true);
    // await initTypings(root, id_site, true);

    return "ok";
  },
};
