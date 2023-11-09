import { watch } from "fs";
import { DBCode } from "./prep-code";
import { dir } from "dir";
import { g } from "utils/global";
import { dirAsync } from "fs-jetpack";
import { dirname } from "path";
import { spawn } from "bun";

export const Code = {
  watchers: {} as Record<
    string,
    { id: string; watcher: ReturnType<typeof watch> }
  >,
  path: (id: string, p?: string) => {
    return dir.path(`${g.datadir}/site/code/${id}${p ? "/" + p : ""}`);
  },
};

export const startCodeWatcher = async (code: DBCode) => {
  if (Code.watchers[code.id]) {
    return;
  }

  let delay = false;
  const indexes = {} as Record<string, (typeof code)["code_file"][0]>;

  for (const c of code.code_file) {
    const path = Code.path(c.id_code, c.path);

    indexes[c.path] = c;
    const file = Bun.file(path);
    if (!(await file.exists())) {
      await dirAsync(dirname(path));
      await Bun.write(file, c.content);
      delay = true;
    }
  }

  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  await spawn({
    cmd: ["bun", "i"],
    cwd: Code.path(code.id),
    stderr: "ignore",
    stdout: "ignore",
  }).exited;

  Code.watchers[code.id] = {
    id: code.id,
    watcher: watch(
      Code.path(code.id),
      { recursive: true },
      async (event, path) => {
        if (path) {
          const file = Bun.file(Code.path(code.id, path));

          const item = indexes[path];

          if (event === "change") {
            if (item) {
              console.log(path, await file.text());

              await db.code_file.update({
                where: {
                  path_id_code: { id_code: item.id_code, path: item.path },
                },
                data: {
                  content: await file.text(),
                },
              });
            }
          } else {
            if (await file.exists()) {
              if (!item) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                const data = {
                  id_code: code.id,
                  path,
                  content: await file.text(),
                };
                await db.code_file.create({
                  data,
                });
                indexes[path] = data;
              } else {
                await db.code_file.update({
                  where: {
                    path_id_code: { id_code: item.id_code, path: item.path },
                  },
                  data: {
                    content: await file.text(),
                  },
                });
              }
            } else {
              if (item) {
                await db.code_file.delete({
                  where: {
                    path_id_code: { id_code: item.id_code, path: item.path },
                  },
                });
              }
            }
          }
        }
      }
    ),
  };
};

export const stopCodeWatcher = async (id_code: string) => {
  if (Code.watchers[id_code]) {
    Code.watchers[id_code].watcher.close();
    delete Code.watchers[id_code];
  }
};
