import { watch } from "fs";
import { DBCode } from "./prep-code";
import { dir } from "dir";
import { g } from "utils/global";
import { dirAsync } from "fs-jetpack";
import { dirname } from "path";
import { spawn } from "bun";

export const Code = {
  watchers: {} as Record<string, ReturnType<typeof watch>>,
  path: (id: string, p?: string) => {
    return dir.path(`${g.datadir}/code/${id}${p ? "/" + p : ""}`);
  },
};

export const startCodeWatcher = async (code: DBCode) => {
  if (Code.watchers[code.id]) {
    return;
  }

  for (const c of code.code_file) {
    const path = Code.path(c.id_code, c.path);

    const file = Bun.file(path);
    if (!(await file.exists())) {
      await dirAsync(dirname(path));
      await Bun.write(file, c.content);
    }
  }

  await spawn({
    cmd: ["bun", "i"],
    cwd: Code.path(code.id),
    stderr: "ignore",
    stdout: "ignore",
  }).exited;

  Code.watchers[code.id] = watch(
    Code.path(code.id),
    { recursive: true },
    (event, path) => {
      console.log(event, path);
    }
  );
};

export const stopCodeWatcher = async (id_code: string) => {
  if (Code.watchers[id_code]) {
    Code.watchers[id_code].close();
    delete Code.watchers[id_code];
  }
};
