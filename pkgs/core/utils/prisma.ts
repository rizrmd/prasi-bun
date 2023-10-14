import { existsAsync } from "fs-jetpack";
import { dir } from "./dir";
import { $ } from "execa";
import { g } from "./global";

export const preparePrisma = async () => {
  if (await existsAsync(dir("app/db/.env"))) {
    if (!(await existsAsync(dir("node_modules/.prisma")))) {
      await $({ cwd: dir(`app/db`) })`bun prisma generate`;
    }
    const { PrismaClient } = await import("../../../app/db/db");
    g.db = new PrismaClient();
  }
  
  g.dburl = process.env.DATABASE_URL || "";
};
