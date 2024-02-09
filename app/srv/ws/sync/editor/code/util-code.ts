import { dir } from "dir";
import { BuildContext } from "esbuild";
import { dirAsync, exists, existsAsync, writeAsync } from "fs-jetpack";
import { dirname } from "path";

export type CodeMode = "site" | "server";
export const code = {
  path(id_site: string, mode: CodeMode, type: "src" | "build", path?: string) {
    let file_path = "";
    if (path) {
      file_path = path[0] === "/" ? path : `/${path}`;
    }
    return dir.data(`/code/${id_site}/${mode}/${type}${file_path}`);
  },
  package_deps: (path: string) => {
    const file = Bun.file(path);
  },
  esbuild: {} as Record<string, Record<CodeMode, null | BuildContext>>,
  prep(id_site: string, mode: CodeMode) {
    if (exists(dir.data(""))) {
      Bun.spawn({
        cmd: ["chmod", "-R", "777", "."],
        cwd: dir.data(``),
      });
    }
    const promises: Promise<void>[] = [];
    return {
      path(type: "src" | "build", path: string) {
        return dir.data(
          `/code/${id_site}/site/${type}${path[0] === "/" ? path : `/${path}`}`
        );
      },
      new_file(path: string, content: string) {
        promises.push(
          new Promise(async (done) => {
            const full_path = this.path("src", path);
            if (!(await existsAsync(full_path))) {
              await dirAsync(dirname(full_path));
              await writeAsync(full_path, content);
            }
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
