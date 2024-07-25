import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import style from "@hyrious/esbuild-plugin-style";
import { dir } from "dir";
import { context, formatMessages } from "esbuild";
import { cleanPlugin } from "esbuild-clean-plugin";
import { watch } from "fs";
import { existsAsync } from "fs-jetpack";
import { appendFile } from "node:fs/promises";
import { server } from "../../../editor/code/server-main";
import { conns } from "../../../entity/conn";
import { user } from "../../../entity/user";
import { sendWS } from "../../../sync-handler";
import { SyncType } from "../../../type";
import { code } from "../../code";
import { $ } from "bun";
const pending = {} as any;

export const initFrontEnd = async (
  root: string,
  id_site: string,
  force?: boolean
) => {
  let existing = code.internal.frontend[id_site];

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
          existing.watch.close();
          await existing.ctx.dispose();
          delete code.internal.frontend[id_site];
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
    await isInstalling(id_site);
    const out_dir_temp = dir.data(`code/${id_site}/site/build-temp`);
    const out_dir_switch = dir.data(`code/${id_site}/site/build-switch`);
    const out_dir = dir.data(`code/${id_site}/site/build`);
    const build_ctx = await context({
      absWorkingDir: dir.data(root),
      entryPoints: ["index.tsx"],
      outdir: out_dir_temp,
      format: "esm",
      bundle: true,
      minify: true,
      treeShaking: true,
      splitting: true,
      logLevel: "silent",
      sourcemap: true,
      metafile: true,
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
              setup.onEnd(async (res) => {
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

                  await $`rm -rf ${out_dir_switch}`.quiet();
                  await $`mv ${out_dir} ${out_dir_switch}`.quiet();
                  await $`mv ${out_dir_temp} ${out_dir}`.quiet();

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
            } catch (e) {
              console.log("ERROR");
            }
          },
        },
      ],
    });
    const broadcastLoading = async () => {
      const client_ids = user.active
        .findAll({ site_id: id_site })
        .map((e) => e.client_id);

      const now = Date.now();

      client_ids.forEach((client_id) => {
        const ws = conns.get(client_id)?.ws;
        if (ws)
          sendWS(ws, {
            type: SyncType.Event,
            event: "code_changes",
            data: { ts: now, mode: "frontend", status: "building" },
          });
      });
    };

    code.internal.frontend[id_site] = {
      ctx: build_ctx,
      timeout: null,
      rebuilding: false,
      watch: watch(
        dir.data(root),
        {
          recursive: true,
        },
        async (event, filename) => {
          const fe = code.internal.frontend[id_site];
          const srv = code.internal.server[id_site];
          if (filename?.startsWith("node_modules") || filename?.startsWith("typings")) return;
          if (
            filename?.endsWith(".tsx") ||
            filename?.endsWith(".ts") ||
            filename?.endsWith(".css") ||
            filename?.endsWith(".html")
          ) {
            if (typeof fe !== "undefined" && !fe.rebuilding) {
              fe.rebuilding = true;
              clearTimeout(fe.timeout);
              fe.timeout = setTimeout(async () => {
                try {
                  broadcastLoading();
                  await fe.ctx.rebuild();
                } catch (e) {
                  console.error('Fronted failed rebuild', e);
                }
                fe.rebuilding = false;
              }, 500);
            }

            if (typeof srv !== "undefined" && !srv.rebuilding && srv.ctx) {
              srv.rebuilding = true;
              try {
                await srv.ctx.rebuild();
                await server.init(id_site);
              } catch (e) {}
              srv.rebuilding = false;
            }
          }
        }
      ),
    };
    const fe = code.internal.frontend[id_site];
    fe.rebuilding = true;
    try {
      await fe.ctx.rebuild();
    } catch (e) {}
    fe.rebuilding = false;
  } catch (e: any) {
    console.error("Error building front end", id_site);
    delete code.internal.frontend[id_site];
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
  const path = code.path(id_site, "site", "src", "index.log");
  const file = Bun.file(path);
  try {
    const text = await file.text();
    if (typeof text === "string" && text.startsWith("Installing dependencies"))
      return true;
  } catch (e) {}

  return false;
};