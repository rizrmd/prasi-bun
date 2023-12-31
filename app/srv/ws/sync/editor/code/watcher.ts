import { watch } from "fs";
import { DBCode } from "./prep-code";
import { dir } from "dir";
import { g } from "utils/global";
import { dirAsync } from "fs-jetpack";
import { dirname } from "path";
import { spawn } from "bun";
import { codeBuild } from "./build";
import { BuildContext } from "esbuild";
import { codePkgInstall } from "./pkg-install";

export const Code = {
  pkginstall: {} as Record<string, true>,
  watchers: {} as Record<
    string,
    { id: string; watcher: ReturnType<typeof watch> }
  >,
  build: {
    ctx: {} as Record<string, BuildContext>,
    timeout: {} as Record<string, ReturnType<typeof setTimeout>>,
  },
  timeout: {} as Record<string, ReturnType<typeof setTimeout>>,
  path: (id_site: string, id_code: string, p?: string) => {
    return dir.path(
      `${g.datadir}/site/code/${id_site}/${id_code}${p ? "/" + p : ""}`
    );
  },
};

export const startCodeWatcher = async (code: DBCode) => {
  if (code.id && Code.watchers[code.id]) {
    return;
  }

  let delay = false;
  const indexes = {} as Record<string, (typeof code)["code_file"][0]>;

  if (!code.code_file.find((e) => e.path === "package.json")) {
    code.code_file.push(
      await db.code_file.create({
        data: {
          id_code: code.id,
          path: "package.json",
          content: JSON.stringify({ name: code.id, dependencies: {} }),
        },
      })
    );
  }

  if (!code.code_file.find((e) => e.path === "tsconfig.json")) {
    code.code_file.push(
      await db.code_file.create({
        data: {
          id_code: code.id,
          path: "tsconfig.json",
          content: JSON.stringify(
            {
              include: ["./", "../global.d.ts"],
              compilerOptions: {
                lib: ["ESNext", "DOM"],
                module: "esnext",
                target: "esnext",
                moduleResolution: "bundler",
                moduleDetection: "force",
                allowImportingTsExtensions: true,
                noEmit: true,
                composite: true,
                strict: true,
                downlevelIteration: true,
                skipLibCheck: true,
                jsx: "react-jsx",
                allowSyntheticDefaultImports: true,
                forceConsistentCasingInFileNames: true,
                allowJs: true,
              },
            },
            null,
            2
          ),
        },
      })
    );
  }

  if (!code.code_file.find((e) => e.path === "index.tsx")) {
    let content = `export const hello = 'world';`;

    code.code_file.push(
      await db.code_file.create({
        data: {
          id_code: code.id,
          path: "index.tsx",
          content,
        },
      })
    );
  }

  for (const c of code.code_file) {
    const path = Code.path(code.id_site, c.id_code, c.path);

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
    cwd: Code.path(code.id_site, code.id),
    stderr: "ignore",
    stdout: "ignore",
  }).exited;

  await codeBuild(code);

  Code.watchers[code.id] = {
    id: code.id,
    watcher: watch(
      Code.path(code.id_site, code.id),
      { recursive: true },
      async (event, path) => {
        if (path !== "package.json") {
          clearTimeout(Code.timeout[code.id]);
          Code.timeout[code.id] = setTimeout(() => {
            codeBuild(code);
          }, 100);
        }

        if (path) {
          const file = Bun.file(Code.path(code.id_site, code.id, path));
          const item = indexes[path];
          if (event === "change") {
            if (item) {
              let content = await file.text();
              if (path === "package.json") {
                clearTimeout(Code.build.timeout[code.id]);
                Code.build.timeout[code.id] = setTimeout(() => {
                  codePkgInstall(code);
                }, 1000);
              }

              await db.code_file.update({
                where: {
                  path_id_code: { id_code: item.id_code, path: item.path },
                },
                data: {
                  content,
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
