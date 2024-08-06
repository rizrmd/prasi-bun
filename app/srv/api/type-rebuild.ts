import { apiContext } from "service-srv";
import { initTypings } from "../ws/sync/code/parts/init/typings";
import { dir } from "dir";
import { removeAsync } from "fs-jetpack";
export const _ = {
  url: "/type-rebuild/:id_site",
  async api(id_site: string) {
    const { req, res } = apiContext(this);
    const root = `/code/${id_site}/site/src`;

    await removeAsync(dir.data(`${root}/typings`));
    await initTypings(root, id_site, true);

    return "ok";
  },
};
