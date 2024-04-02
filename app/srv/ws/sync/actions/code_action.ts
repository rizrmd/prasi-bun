import { Subprocess, spawn } from "bun";
import { waitUntil } from "web-utils";
import { SAction } from "../actions";
import { code, codeGlobalTypings } from "../editor/code/util-code";
import { docs } from "../entity/docs";
import { snapshot } from "../entity/snapshot";
import { SyncConnection } from "../type";
import { dirAsync } from "fs-jetpack";
import path from "path";
import { gunzipAsync } from "../entity/zlib";
import { prismaExtendType } from "../../../../web/src/utils/script/prisma-extend";

const decoder = new TextDecoder();
const code_startup = {
  process: {} as Record<string, Subprocess>,
};

export const code_action: SAction["code"]["action"] = async function (
  this: SyncConnection,
  arg
) {
  const { type } = arg;

  switch (type) {
    case "startup-check": {
      const cs = code_startup.process[arg.site_id];

      if (!cs) {
        const pkg_file = Bun.file(
          code.path(arg.site_id, "site", "src", "package.json")
        );

        const pkg_json = await pkg_file.json();
        if (!pkg_json.scripts || !pkg_json.scripts.startup) {
          return { type, status: "disabled" };
        }

        return { type, status: "stopped" };
      }

      return { type, status: cs.killed ? "stopped" : "running" };
    }
    case "startup-run": {
      const cs = code_startup.process[arg.site_id];
      if (!cs) {
        code_startup.process[arg.site_id] = spawn({
          cmd: ["npm", "run", "startup"],
          cwd: code.path(arg.site_id, "site", "src"),
          stdio: ["pipe", "inherit", "inherit"],
        });
        code_startup.process[arg.site_id].exited.then((e) => {
          delete code_startup.process[arg.site_id];
        });
        await waitUntil(1000);
      }
      break;
    }
    case "startup-stop": {
      const cs = code_startup.process[arg.site_id];
      if (cs && !cs.killed) {
        cs.kill();
        await waitUntil(1000);
      }
      break;
    }
    case "flush-page-cache": {
      const { page_id } = arg;
      snapshot.del("page", page_id);
      if (docs.page[page_id] && docs.page[page_id].doc) {
        docs.page[page_id].doc.destroy();
      }
      delete docs.page[page_id];
      break;
    }
    case "check-typings": {
      const dir = code.path(arg.site_id, "site", "src", "typings");
      try {
        if (
          (await Bun.file(path.join(dir, "hash")).text()) ===
          arg.hash.toString()
        ) {
          return { type: "check-typings", hash: true };
        }
      } catch (e) {}
      return { type: "check-typings", hash: false };
    }
    case "push-typings": {
      const dir = code.path(arg.site_id, "site", "src", "typings");
      await dirAsync(dir);
      await dirAsync(path.join(dir, "runtime"));
      Bun.write(Bun.file(path.join(dir, "hash")), arg.hash.toString());
      const res = JSON.parse(decoder.decode(await gunzipAsync(arg.body)));
      await Bun.write(Bun.file(path.join(dir, "api.d.ts")), res.api);
      await Bun.write(
        Bun.file(path.join(dir, "prisma.d.ts")),
        res.prisma["prisma.d.ts"]
      );
      await Bun.write(
        Bun.file(path.join(dir, "runtime/index.d.ts")),
        res.prisma["runtime/index.d.ts"]
      );
      await Bun.write(
        Bun.file(path.join(dir, "runtime/library.d.ts")),
        res.prisma["runtime/library.d.ts"]
      );
      await Bun.write(
        Bun.file(path.join(dir, "global.d.ts")),
        codeGlobalTypings.replace(
          `declare global {`,
          `declare global {
  const db: prisma.PrismaClient & ${prismaExtendType};
  `
        )
      );

      Bun.spawn({
        cmd: ["chmod", "-R", "777", "."],
        cwd: code.path(arg.site_id, "site", "src"),
      });

      break;
    }
  }
};
