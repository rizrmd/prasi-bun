import { spawn } from "bun";
import { existsAsync, readAsync } from "fs-jetpack";
import { dir } from "../../utils/dir";
import { g } from "../../utils/global";

export const prepareAPITypes = async () => {
  const out: string[] = [];
  for (const [k, v] of Object.entries(g._api)) {
    const name = k.substring(0, k.length - 3).replace(/\W/gi, "_");

    let p = {
      path: `app/srv/api/${v.path}`,
      handler: `"./api/${v.path.substring(0, v.path.length - 3)}"`,
    };

    if (!(await existsAsync(dir.path(p.path)))) {
      p.path = `pkgs/core/api/${v.path}`;
      p.handler = `"../../pkgs/core/api/${v.path.substring(
        0,
        v.path.length - 3
      )}"`;
    }

    out.push(`\
export const ${name} = {
  name: "${name}",
  url: "${v.url}",
  path: "${p.path}",
  args: ${JSON.stringify(v.args)},
  handler: import(${p.handler})
}`);
  }
  await Bun.write(dir.path(`app/srv/exports.ts`), out.join(`\n`));

  const targetFile = dir.path("app/srv/exports.d.ts");

  const args = [
    process.execPath,
    dir.path("node_modules/.bin/tsc"),
    dir.path("app/srv/exports.ts"),
    "--declaration",
    "--emitDeclarationOnly",
    "--outFile",
    targetFile,
  ];
  if (g.mode === "dev") {
    const tsc = spawn(args, {
      cwd: dir.path(`node_modules/.bin`),
    });

    await tsc.exited;
  }

  let res = await readAsync(targetFile);
  if (res) {
    res = res.replace('export * from "@prisma/client";', "");
    res = res.replace("server: Server;", "");
    res = res.replace(`import { PrismaClient } from "app/db/db";`, "");
    res = res.replace(`db: PrismaClient;`, "");
    await Bun.write(targetFile, res);
  }
};
