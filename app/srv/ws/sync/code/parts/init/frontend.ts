import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import style from "@hyrious/esbuild-plugin-style";
import { $ } from "bun";
import { dir } from "dir";
import { context, formatMessages } from "esbuild";
import { existsAsync } from "fs-jetpack";
import { appendFile } from "node:fs/promises";
import { conns } from "../../../entity/conn";
import { user } from "../../../entity/user";
import { sendWS } from "../../../sync-handler";
import { SyncType } from "../../../type";
import { code } from "../../code";
import { Watcher } from "../watcher";
import { cleanPlugin } from "../../utlis/esbuild-clean-plugin";
const pending = {} as any;

export const initFrontEnd = async (
  root: string,
  id_site: string,
  force?: boolean
) => {
  let existing = code.internal.frontend[id_site];

  await isInstalling(id_site);

  if (existing) {
    if (existing.npm) {
      if (pending[id_site]) return;
      pending[id_site] = true;
      await existing.npm;
      delete pending[id_site];
      delete existing.npm;
    } else {
      if (force) {
        try {
          await existing.ctx.dispose();
        } catch (e) {}
      } else {
        if (existing.ctx) {
          return;
        }
      }
    }
  } else {
    if (
      !(await existsAsync(code.path(id_site, "site", "src", "node_modules")))
    ) {
      return;
    }
  }

  try {
    if (code.internal.frontend[id_site]?.watch) {
      await code.internal.frontend[id_site].watch.close();
    }

    code.internal.frontend[id_site] = {
      inputs: new Set(),
      ctx: await initBuildCtx({ id_site, root }),
      rebuilding: true,
      watch: new Watcher(dir.data(root), id_site),
    };
    const fe = code.internal.frontend[id_site];
    try {
      await fe.ctx.rebuild();
    } catch (e) {
      console.log(`Failed to rebuild front-end ${id_site}`);
      console.error(e);
    }
    fe.rebuilding = false;
  } catch (e: any) {
    console.error("Error building front end", id_site);
  }
};

const codeError = async (id_site: string, error: string, append?: boolean) => {
  const path = code.path(id_site, "site", "src", "index.log");

  if (error) console.log(error);
  if (append) {
    await appendFile(path, error);
    return;
  }
  await Bun.write(path, error);
};

const isInstalling = async (id_site: string) => {
  const modules = Bun.file(
    code.path(id_site, "site", "src", "lib/modules.json")
  );

  if (await modules.exists()) {
    const pkg = Bun.file(code.path(id_site, "site", "src", "package.json"));
    try {
      const module_json = await modules.json();
      const pkg_json = await pkg.json();
      let should_install = false;
      if (module_json) {
        if (module_json.dependencies) {
          for (const [k, v] of Object.entries(module_json.dependencies)) {
            if (!pkg_json.dependencies[k]) should_install = true;
            pkg_json.dependencies[k] = v;
          }
        }

        if (module_json.devDependencies) {
          for (const [k, v] of Object.entries(module_json.devDependencies)) {
            if (!pkg_json.devDependencies[k]) should_install = true;
            pkg_json.devDependencies[k] = v;
          }
        }

        for (const k of Object.keys(pkg_json.dependencies)) {
          if (
            !(await Bun.file(
              code.path(id_site, "site", "src", `node_modules/${k}`)
            ).exists())
          ) {
            should_install = true;
            break;
          }
        }

        if (should_install) {
          await Bun.write(pkg, JSON.stringify(pkg_json, null, 2));
          await $`npm i`
            .cwd(code.path(id_site, "site", "src"))
            .quiet()
            .nothrow();
        }
      }
    } catch (e) {}
  }

  const path = code.path(id_site, "site", "src", "index.log");
  const file = Bun.file(path);
  try {
    const text = await file.text();
    if (typeof text === "string" && text.startsWith("Installing dependencies"))
      return true;
  } catch (e) {}

  return false;
};

const initBuildCtx = async ({
  id_site,
  root,
}: {
  id_site: string;
  root: string;
}) => {
  const out_dir_temp = dir.data(`code/${id_site}/site/build-temp`);
  const out_dir_old = dir.data(`code/${id_site}/site/build-old`);
  const out_dir = dir.data(`code/${id_site}/site/build`);

  const site_filename = "internal.tsx";
  const site_tsx = Bun.file(dir.data(root + `/${site_filename}`));
  if (!(await site_tsx.exists())) {
    await Bun.write(
      site_tsx,
      `\
import React from "react";

// export const Loading = () => {
//   return <></>;
// };

// export const NotFound = () => {
//   return <></>;
// };
`
    );
  }

  let prasi_json = {} as { exclude?: string[] };
  const prasi_json_file = Bun.file(
    dir.data(`code/${id_site}/site/src/prasi.json`)
  );
  if (await prasi_json_file.exists()) {
    prasi_json = await prasi_json_file.json();
  }

  return await context({
    absWorkingDir: dir.data(root),
    entryPoints: ["index.tsx", site_filename],
    outdir: out_dir_temp,
    format: "esm",
    bundle: true,
    minify: true,
    treeShaking: true,
    splitting: true,
    logLevel: "silent",
    sourcemap: true,
    metafile: true,
    external: ["crypto", "fs", ...(prasi_json?.exclude || [])],
    plugins: [
      cleanPlugin(),
      style(),
      globalExternals({
        react: {
          varName: "window.React",
          type: "cjs",
        },
        "react-dom": {
          varName: "window.ReactDOM",
          type: "cjs",
        },
      }),
      {
        name: "prasi",
        async setup(setup) {
          try {
            setup.onStart(() => {
              code.internal.frontend[id_site].build_timer = Date.now();
            });
            setup.onEnd((res) => {
              if (code.internal.frontend[id_site].build_timer) {
                const ms =
                  Date.now() - code.internal.frontend[id_site].build_timer;
                console.log(`Built front-end ${id_site} in ${ms}ms`);
              }

              code.internal.frontend[id_site].rebuilding = false;
              if (res.errors.length === 0) {
                code.internal.frontend[id_site].inputs = new Set(
                  Object.keys(res.metafile?.inputs || {})
                );
              }

              setTimeout(async () => {
                const client_ids = user.active
                  .findAll({ site_id: id_site })
                  .map((e) => e.client_id);
                if (res.errors.length > 0) {
                  await codeError(
                    id_site,
                    (await formatMessages(res.errors, { kind: "error" })).join(
                      "\n\n"
                    )
                  );

                  const now = Date.now();
                  client_ids.forEach((client_id) => {
                    const ws = conns.get(client_id)?.ws;
                    if (ws)
                      sendWS(ws, {
                        type: SyncType.Event,
                        event: "code_changes",
                        data: { ts: now, mode: "frontend", status: "error" },
                      });
                  });
                } else {
                  await codeError(id_site, "");
                  await $`rm -rf ${out_dir_old}`.quiet().nothrow();
                  await $`mv ${out_dir} ${out_dir_old}`.quiet().nothrow();
                  await $`mv ${out_dir_temp} ${out_dir}`.quiet().nothrow();

                  const now = Date.now();
                  client_ids.forEach((client_id) => {
                    const ws = conns.get(client_id)?.ws;
                    if (ws)
                      sendWS(ws, {
                        type: SyncType.Event,
                        event: "code_changes",
                        data: { ts: now, mode: "frontend", status: "ok" },
                      });
                  });
                }
              });
            });
          } catch (e) {
            console.log("ERROR");
          }
        },
      },
    ],
  });
};
