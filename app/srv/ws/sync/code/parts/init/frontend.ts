import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import style from "@hyrious/esbuild-plugin-style";
import { dir } from "dir";
import { context } from "esbuild";
import { removeAsync } from "fs-jetpack";
import isEqual from "lodash.isequal";
import { code } from "../../code";
import { buildTypes } from "./typings";
import { appendFile } from "node:fs/promises";

const decoder = new TextDecoder();
export const initFrontEnd = async (root: string, id_site: string) => {
  let existing = code.internal.frontend[id_site];

  if (existing) {
    try {
      await existing.dispose();
      delete code.internal.frontend[id_site];
    } catch (e) {}
  }

  try {
    await isInstalling(id_site);

    const build_path = dir.data(`code/${id_site}/site/build`);
    await removeAsync(build_path);
    const existing = await context({
      absWorkingDir: dir.data(root),
      entryPoints: ["index.tsx"],
      outdir: build_path,
      format: "esm",
      bundle: true,
      minify: true,
      treeShaking: true,
      splitting: true,
      logLevel: "silent",
      sourcemap: true,
      metafile: true,
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
          async setup(setup) {
            try {
            } catch (e) {
              console.log("ERROR");
            }
          },
        },
      ],
    });
    code.internal.frontend[id_site] = existing;
    await existing.watch();
  } catch (e) {
    delete code.internal.frontend[id_site];
    console.log("front end error", e);
  }
};

const codeError = async (id_site: string, error: string, append?: boolean) => {
  const path = code.path(id_site, "site", "src", "index.log");

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
    if (text.startsWith("Installing dependencies")) return true;
  } catch (e) {}
  return false;
};

const readPackageJSON = async (id_site: string) => {
  const file = Bun.file(code.path(id_site, "site", "src", "package.json"));
  const deps = new Set<string>();

  const json = await file.json();

  if (json.dependencies) {
    for (const k of Object.keys(json.dependencies)) {
      deps.add(k);
    }
  }

  if (json.devDependencies) {
    for (const k of Object.keys(json.devDependencies)) {
      deps.add(k);
    }
  }
  return deps;
};
