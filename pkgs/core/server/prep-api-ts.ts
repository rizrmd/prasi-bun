import { spawn, spawnSync } from "bun";
import { readAsync } from "fs-jetpack";
import { dir } from "../utils/dir";
import { g } from "../utils/global";

export const prepareAPITypes = async () => {
  const out: string[] = [];
  for (const [k, v] of Object.entries(g.api)) {
    const name = k.substring(0, k.length - 3).replace(/\W/gi, "_");
    out.push(`\
export const ${name} = {
  name: "${name}",
  url: "${v.url}",
  path: "app/srv/api/${v.path}",
  args: ${JSON.stringify(v.args)},
  handler: import("./api/${v.path.substring(0, v.path.length - 3)}")
}`);
  }
  await Bun.write(dir.path(`app/srv/exports.ts`), out.join(`\n`));

  const targetFile = dir.path("app/srv/exports.d.ts");
  const tsc = spawn(
    [
      dir.path("node_modules/.bin/tsc"),
      dir.path("app/srv/exports.ts"),
      "--declaration",
      "--emitDeclarationOnly",
      "--outFile",
      targetFile,
    ],
    {
      cwd: dir.path(`node_modules/.bin`),
    }
  );

  await tsc.exited;

  let res = await readAsync(targetFile);
  if (res) {
    res = res.replace('export * from "@prisma/client";', "");
    res = res.replace("server: Server;", "");
    res = res.replace(`import { PrismaClient } from "app/db/db";`, "");
    res = res.replace(`db: PrismaClient;`, "");
    await Bun.write(targetFile, res);
  }
};
