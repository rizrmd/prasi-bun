import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import { style } from "@hyrious/esbuild-plugin-style";
import { context } from "esbuild";
import { dirAsync, existsAsync, removeAsync, writeAsync } from "fs-jetpack";
import { DCode } from "../../../../../web/src/utils/types/root";
import { readDirectoryRecursively } from "../../../../api/site-export";
import { docs } from "../../entity/docs";
import { code } from "./util-code";
import { server } from "./server-main";

export const codeBuild = async (id_site: any) => {
  const src_path = code.path(id_site, "site", "src");
  if (!(await existsAsync(src_path))) return;
  if (!code.esbuild[id_site]) {
    code.esbuild[id_site] = { site: null, server: null };
  }

  if (!code.esbuild[id_site].server) {
    const server_main = code.path(id_site, "site", "src", "server.ts");
    if (!(await existsAsync(server_main))) {
      await writeAsync(
        server_main,
        `\
import type {} from "./typings/global";

export const server: PrasiServer = {
  async http({ req, handle, url, server }) {
    return await handle(req);
  },
};
`
      );
      const bun_types = Bun.spawn({
        cmd: ["npm", "i", "-D", "@types/bun"],
        cwd: code.path(id_site, "site", "src"),
      });
      await bun_types.exited;
    }

    const build_path = code.path(id_site, "server", "build");
    await removeAsync(build_path);
    await dirAsync(build_path);

    const build_file = `${build_path}/index.js`;
    await writeAsync(build_file, "");

    code.esbuild[id_site].server = await context({
      absWorkingDir: src_path,
      entryPoints: ["server.ts"],
      bundle: true,
      outfile: build_file,
      minify: true,
      treeShaking: true,
      format: "cjs",
      logLevel: "silent",
      sourcemap: true,
      banner: {
        js: `\
const _fs = require('node:fs/promises');
const console =
typeof global.server_hook === "function"
  ? { ...global.console }
  : global.console;
if (typeof global.server_hook === "function") {
  const log = global.console.log;
  console.log = function (...arg) {
    const out = "${code.path(id_site, "site", "src", "server.log")}";
    _fs.appendFile(out, arg.join(" ") + "\\n");
  }.bind(console);
}`,
      },
      plugins: [
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
          setup(setup) {
            setup.onEnd((res) => {
              server.init(id_site);
            });
          },
        },
      ],
    });

    const esbuild = code.esbuild[id_site].server;
    esbuild?.watch();
  }

  if (!code.esbuild[id_site].site) {
    const build_path = code.path(id_site, "site", "build");
    await removeAsync(build_path);
    await dirAsync(build_path);
    const build_file = `${build_path}/index.js`;
    await writeAsync(build_file, "");

    const index_path = code.path(id_site, "site", "src", "index.tsx");
    if (!(await existsAsync(index_path))) {
      await writeAsync(index_path, 'export const hello = "world"');
    }

    code.esbuild[id_site].site = await context({
      absWorkingDir: src_path,
      entryPoints: ["index.tsx"],
      bundle: true,
      outfile: build_file,
      minify: true,
      treeShaking: true,
      format: "cjs",
      logLevel: "silent",
      sourcemap: true,
      plugins: [
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
          setup(setup) {
            setup.onEnd((res) => {
              const cdoc = docs.code[id_site];
              if (cdoc) {
                const doc = cdoc.build["site"];
                const build_dir = code.path(id_site, "site", "build");
                if (doc) {
                  codeApplyChanges(build_dir, doc);
                }
              }
            });
          },
        },
      ],
    });
    const esbuild = code.esbuild[id_site].site;
    esbuild?.watch();
  }
  for (const _mode of ["site", "server"]) {
    const mode = _mode as "site" | "server";

    const esbuild = code.esbuild[id_site][mode];
    if (esbuild) {
      try {
        await esbuild.rebuild();
      } catch (e) {
        console.error(e);
      }
    }

    const build_file = code.path(id_site, mode, "build", "index.js");
    const out = Bun.file(build_file);
    const src = (await out.text()).replace(
      "//# sourceMappingURL=index.js.map",
      `//# sourceMappingURL=/nova-load/code/${id_site}/${mode}/index.js.map`
    );
    await Bun.write(out, src);
  }
};

const codeApplyChanges = (path: string, doc: DCode) => {
  const map = doc.getMap("map");

  const files = map.get("files");

  const dirs = readDirectoryRecursively(path);
  doc.transact(() => {
    files?.forEach((v, k) => {
      if (!dirs[k]) {
        files?.delete(k);
      }
    });
    for (const [k, v] of Object.entries(dirs)) {
      if (files) {
        files.set(k, v);
      }
    }
  });

  return doc;
};
