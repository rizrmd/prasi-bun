import { dir } from "dir";
import { code } from "../../code";
import { watch } from "fs";
import { Glob } from "bun";
import { removeAsync } from "fs-jetpack";
import { parseTypeDef } from "../../../../../util/parse-type-def";
import { user } from "../../../entity/user";
import { conns } from "../../../entity/conn";
import { sendWS } from "../../../sync-handler";
import { SyncType } from "../../../type";
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
    const typings_path = dir.data(`/code/${id_site}/site/typings.d.ts`);
    const typings_file = Bun.file(typings_path);

    if (!(await typings_file.exists())) {
      return false;
    }
    code.internal.typings[id_site] = {
      timeout: Date.now(),
      watch: watch(typings_path),
      spawn: Bun.spawn({
        cmd: [
          ...`${dir.path(
            "node_modules/tsc"
          )} --watch --moduleResolution node --emitDeclarationOnly --outFile ../typings.d.ts --declaration --noEmit false`.split(
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

        const client_ids = new Set<string>();
        user.active.findAll({ site_id: id_site }).forEach((e) => {
          client_ids.add(e.client_id);
        });

        const now = Date.now();
        client_ids.forEach((client_id) => {
          const ws = conns.get(client_id)?.ws;
          if (ws)
            sendWS(ws, {
              type: SyncType.Event,
              event: "code_changes",
              data: { ts: now, mode: "typings" },
            });
        });
      }, 180);
    });
  } catch (e) {
    console.log(e);
  }
};
