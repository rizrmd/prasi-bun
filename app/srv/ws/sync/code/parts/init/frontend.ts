import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import style from "@hyrious/esbuild-plugin-style";
import { dir } from "dir";
import { BuildOptions, BuildResult, context, formatMessages } from "esbuild";
import { cleanPlugin } from "esbuild-clean-plugin";
import isEqual from "lodash.isequal";
import { appendFile } from "node:fs/promises";
import { code } from "../../code";
import { buildTypes } from "./typings";
const decoder = new TextDecoder();
export const initFrontEnd = async (
  root: string,
  id_site: string,
  force?: boolean
) => {
  let existing = code.internal.frontend[id_site];

  if (existing) {
    if (force) {
      try {
        await existing.dispose();
        delete code.internal.frontend[id_site];
      } catch (e) {}
    } else {
      return;
    }
  }

  try {
    await isInstalling(id_site);
    const out_dir = dir.data(`code/${id_site}/site/build`);
    const existing = await context({
      absWorkingDir: dir.data(root),
      entryPoints: ["index.tsx"],
      outdir: out_dir,
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
              await codeError(id_site, "Building...");
              setup.onStart(async () => {
                if (!(await isInstalling(id_site)))
                  await codeError(id_site, "Building...");
              });
              setup.onEnd(async (res) => {
                if (res.errors.length > 0) {
                  await codeError(
                    id_site,
                    (await formatMessages(res.errors, { kind: "error" })).join(
                      "\n\n"
                    )
                  );
                  await installDeps(root, res, id_site);
                } else {
                  await codeError(id_site, "");
                  await buildTypes(root, id_site);
                }
              });
            } catch (e) {
              console.log("ERROR");
            }
          },
        },
      ],
    });
    code.internal.frontend[id_site] = existing;
    await existing.watch();
  } catch (e: any) {
    console.error("Error building front end", id_site);
    delete code.internal.frontend[id_site];
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
    if (typeof text === "string" && text.startsWith("Installing dependencies"))
      return true;
  } catch (e) {}

  return false;
};

const readPackageJSON = async (id_site: string) => {
  const file = Bun.file(code.path(id_site, "site", "src", "package.json"));
  const deps = new Set<string>();

  if (await file.exists()) {
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
  }
  return deps;
};

const installDeps = async (
  root: string,
  res: BuildResult<BuildOptions>,
  id_site: string
) => {
  const pkgjson = await readPackageJSON(id_site);
  const imports = new Set<string>();

  if (res.errors.length > 0) {
    for (const err of res.errors) {
      if (err.notes?.[0].text.startsWith("You can mark the path ")) {
        let im = err.notes?.[0].text.split('"')[1];

        if (!im.startsWith("@")) {
          im = im.split("/").shift() || "";
        }

        imports.add(im);
      }
    }
  }

  if (res.metafile) {
    for (const [_, file] of Object.entries(res.metafile?.inputs || {})) {
      for (const im of file.imports) {
        if (im.kind === "import-statement" && im.external) {
          if (!im.path.startsWith(".") && !im.path.startsWith("@/"))
            imports.add(im.path);
        }
      }
    }
  }

  if (!isEqual(imports, pkgjson)) {
    await codeError(
      id_site,
      "Installing dependencies:\n " + [...imports].join("\n ")
    );
    let proc = Bun.spawn([`npm`, `install`, ...imports], {
      stdio: ["inherit", "pipe", "pipe"],
      cwd: dir.data(root),
    });

    async function print(generator: ReadableStream<Uint8Array>, prefix: any) {
      for await (let value of generator) {
        const str = decoder.decode(value);
        await codeError(id_site, `${prefix} ${str}`, true);
      }
    }

    print(proc.stdout, "stdout:");
    print(proc.stderr, "stderr:");

    await proc.exited;
    await codeError(id_site, "");
    return true;
  }
};
