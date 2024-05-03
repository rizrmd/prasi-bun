import { Glob } from "bun";
import { dir } from "dir";
import { dirAsync, exists, copyAsync } from "fs-jetpack";
import { dirname } from "path";

export const ensureFiles = async (path: string, id_site: string) => {
  const _dir = dir.data(path);
  if (!exists(_dir)) {
    await dirAsync(_dir);
  }

  const tdir = "/app/srv/ws/sync/code/templates";
  const templates = new Glob("**").scan({
    cwd: dir.path(tdir),
  });

  for await (const t of templates) {
    const f = t.replaceAll("_", ".");
    const to = dir.data(path + `/${f}`);
    const file = Bun.file(to);
    if (!(await file.exists())) {
      const from = dir.path(`${tdir}/${t}`);
      await dirAsync(dirname(to));
      await copyAsync(from, to);
    }
  }
};
