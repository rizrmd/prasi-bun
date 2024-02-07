import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import { style } from "@hyrious/esbuild-plugin-style";
import { context } from "esbuild";
import { dirAsync, existsAsync, removeAsync, writeAsync } from "fs-jetpack";
import { DCode } from "../../../../../web/src/utils/types/root";
import { readDirectoryRecursively } from "../../../../api/site-export";
import { docs } from "../../entity/docs";
import { CodeMode, code } from "./util-code";

export const codeBuild = async (id_site: any, mode: CodeMode) => {
  const src_path = code.path(id_site, mode, "src");
  if (!(await existsAsync(src_path))) return;
  const build_path = code.path(id_site, mode, "build");

  await removeAsync(build_path);
  await dirAsync(build_path);
  const build_file = `${build_path}/index.js`;
  await writeAsync(build_file, "");

  if (!code.esbuild[id_site]) {
    code.esbuild[id_site] = { site: null, ssr: null };
  }

  if (!code.esbuild[id_site][mode]) {
    code.esbuild[id_site][mode] = await context({
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
                const doc = cdoc.build[mode];
                const build_dir = code.path(id_site, mode, "build");
                if (doc) {
                  codeApplyChanges(build_dir, doc);
                }
              }
            });
          },
        },
      ],
    });
    const esbuild = code.esbuild[id_site][mode];
    esbuild?.watch();
  }
  const esbuild = code.esbuild[id_site][mode];
  if (esbuild) {
    try {
      await esbuild.rebuild();
    } catch (e) {
      console.error(e);
    }
  }

  const out = Bun.file(build_file);
  const src = (await out.text()).replace(
    "//# sourceMappingURL=index.js.map",
    `//# sourceMappingURL=/nova-load/code/${id_site}/${mode}/index.js.map`
  );
  await Bun.write(out, src);
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
