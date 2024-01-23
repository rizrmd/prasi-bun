import { build, context } from "esbuild";
import { Code } from "./watcher";
import { g } from "utils/global";
import { dir } from "dir";
import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import { style } from "@hyrious/esbuild-plugin-style";
import { sendWS } from "../../sync-handler";
import { SyncType } from "../../type";
import { gzipAsync } from "../../entity/zlib";
import { ServerWebSocket } from "bun";
import { WSData } from "../../../../../../pkgs/core/server/create";
import { user } from "../../entity/user";
import { conns } from "../../entity/conn";
import { CodeMode, code } from "./util";

const encoder = new TextEncoder();
export const codeBuild = async (id_site: any, mode: CodeMode) => {
  const src_path = code.path(id_site, mode, "src");
  const build_path = code.path(id_site, mode, "build");
  const build_file = dir.path(`${build_path}/index.js`);

  if (!code.esbuild[id_site]) {
    code.esbuild[id_site] = { site: null, ssr: null };
  }

  code.esbuild[id_site][mode] = await context({
    absWorkingDir: src_path,
    entryPoints: ["index.tsx"],
    bundle: true,
    outfile: build_file,
    minify: true,
    treeShaking: true,
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
    ],
  });

  const out = Bun.file(build_file);
  const src = (await out.text()).replace(
    "//# sourceMappingURL=index.js.map",
    `//# sourceMappingURL=/nova-load/code/${id_site}/${mode}/index.js.map`
  );
  await Bun.write(out, src);
};
