import { dir } from "dir";
import { g } from "utils/global";
import { dirAsync, writeAsync } from "fs-jetpack";
import { dirname } from "path";
import { BuildContext } from "esbuild";

export type CodeMode = "site" | "ssr";
export const code = {
  path(id_site: string, mode: CodeMode, type: "src" | "build", path?: string) {
    return dir.path(`${g.datadir}/code/${id_site}/${mode}/${type}`);
  },
  esbuild: {} as Record<string, Record<CodeMode, null | BuildContext>>,
  prep(id_site: string, mode: CodeMode) {
    Bun.spawn({
      cmd: ["chmod", "-R", "777", "."],
      cwd: dir.path(`${g.datadir}/site`),
    });
    const promises: Promise<void>[] = [];
    return {
      path(type: "src" | "build", path?: string) {
        return dir.path(`${g.datadir}/code/${id_site}/${mode}/${type}`);
      },
      new_file(path: string, content: string) {
        promises.push(
          new Promise(async (done) => {
            const full_path = this.path("src", path);
            await dirAsync(dirname(full_path));
            await writeAsync(full_path, content);
            done();
          })
        );
        return this;
      },
      async await() {
        return await Promise.all(promises);
      },
    };
  },
};
