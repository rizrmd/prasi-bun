import { existsAsync } from "fs-jetpack";
import { dir } from "./dir";
import { $ } from "execa";
import { g } from "./global";

export const preparePrisma = async () => {
  if (await existsAsync(dir.path("app/db/.env"))) {
    if (!(await existsAsync(dir.path("node_modules/.prisma")))) {
      await $({ cwd: dir.path(`app/db`) })`bun prisma generate`;
    }
    const { PrismaClient } = await import("../../../app/db/db");
    g.db = new PrismaClient();
  }
  
  g.dburl = process.env.DATABASE_URL || "";
};
