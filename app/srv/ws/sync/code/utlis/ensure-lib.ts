import { $ } from "bun";
import { dir } from "dir";
import { dirAsync, exists } from "fs-jetpack";

export const ensureLib = async (src_dir: string, id_site: string) => {
  if (!exists(dir.data(src_dir))) {
    await dirAsync(dir.data(src_dir));
  }

  if (!exists(dir.data(`${src_dir}/lib`))) {
    const _ = $.cwd(dir.data(src_dir));
    await _`git clone https://github.com/avolut/prasi-lib lib`;
  }
  if (!exists(dir.data(`${src_dir}/typings`))) {
    try {
      const site = await _db.site.findFirst({
        where: { id: id_site },
        select: {
          config: true,
        },
      });
      if (site) {
        const config = site.config as any;
        if (config.api_url) {
          new URL(config.api_url);
          const url = `${config.api_url}/_prasi/load.js?dev=1&v3&remote=1`;

          const res = await fetch(url);
          const apires = await res.text();

          const fn = new Function("window", "location", apires);
          const w = {} as any;
          fn(w, { href: "http://127.0.0.1" });

          const { prismaTypes, apiTypes } = w.prasiApi["http://127.0.0.1/"];
          for (const [k, v] of Object.entries(prismaTypes)) {
            await Bun.write(dir.data(`${src_dir}/typings/${k}`), v as any);
          }
          await Bun.write(
            dir.data(`${src_dir}/typings/api.d.ts`),
            w.prasiApi["http://127.0.0.1/"]["apiTypes"]
          );
        }
      }
    } catch (e) {
      // console.error(e);
    }
  }
};
