import { dir } from "dir";
import { code } from "../../code";
import { watch } from "fs";
import { Glob } from "bun";
import { removeAsync } from "fs-jetpack";
import { parseTypeDef } from "../../../../../util/parse-type-def";
export const initTypings = async (
  root: string,
  id_site: string,
  force?: boolean
) => {
  let existing = code.internal.typings[id_site];
  if (existing) {
    if (force) {
      existing.watch.close();
      existing.spawn.kill();
      await existing.spawn.exited;
    } else {
      return;
    }
  }

  try {
    code.internal.typings[id_site] = {
      timeout: Date.now(),
      watch: watch(dir.data(`/code/${id_site}/site/typings.d.ts`)),
      spawn: Bun.spawn({
        cmd: [
          ...`tsc --watch --moduleResolution node --emitDeclarationOnly --outFile ../typings.d.ts --declaration --noEmit false`.split(
            " "
          ),
        ],
        cwd: dir.data(`/code/${id_site}/site/src`),
        stdio: ["ignore", "ignore", "ignore"],
      }),
    };
    let timeout = null as any;
    code.internal.typings[id_site].watch.on("change", (e, path) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        clearTimeout(timeout);
        const glob = new Glob("type_def*");
        const path = dir.data(`/code/${id_site}/site/typings.d.ts`);
        const file = Bun.file(path);

        for await (const item of glob.scan(dir.data(`/code/${id_site}/site`))) {
          const stamp = parseInt(item.split(".")[1]);
          if (file.lastModified !== stamp) {
            await removeAsync(dir.data(`/code/${id_site}/site/${item}`));
          } else {
            return new Response(
              Bun.gzipSync(
                await Bun.file(
                  dir.data(`/code/${id_site}/site/${item}`)
                ).arrayBuffer()
              ),
              {
                headers: {
                  "content-type": "application/json",
                  "content-encoding": "gzip",
                },
              }
            );
          }
        }

        const res = JSON.stringify(await parseTypeDef(path));
        await Bun.write(
          dir.data(`/code/${id_site}/site/type_def.${file.lastModified}.json`),
          res
        );
      }, 180);
    });
  } catch (e) {
    console.log(e);
  }
};
