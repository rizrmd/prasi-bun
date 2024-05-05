import { dir } from "dir";
import { initFrontEnd } from "./parts/init/frontend";
import { initServer } from "./parts/init/server";
import { buildTypes } from "./parts/init/typings";
import { codeInternal } from "./parts/internal";
import { ensureLib } from "./utlis/ensure-lib";
import { ensureFiles } from "./utlis/ensure-files";

export const code = {
  internal: codeInternal,
  async init(id_site: string, note: string) {
    const root = `/code/${id_site}/site/src`;

    await ensureLib(root, id_site);
    await ensureFiles(root, id_site);

    await initFrontEnd(root, id_site);
    await initServer(root, id_site);
  },
  path(
    id_site: string,
    mode: "site" | "server",
    type: "src" | "build" | "build_cache",
    path?: string
  ) {
    let file_path = "";
    if (path) {
      file_path = path[0] === "/" ? path : `/${path}`;
    }

    return dir.data(`/code/${id_site}/${mode}/${type}${file_path}`);
  },
};
