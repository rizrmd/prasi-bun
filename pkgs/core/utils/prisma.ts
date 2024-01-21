import { existsAsync } from "fs-jetpack";
import { dir } from "./dir";
import { $ } from "execa";
import { g } from "./global";

export const preparePrisma = async () => {
  if (
    (await existsAsync(dir.path("app/db/.env"))) ||
    process.env.DATABASE_URL
  ) {
    const { PrismaClient } = await import("../../../app/db/db");
    g.db = new PrismaClient();
  }

  g.dburl = process.env.DATABASE_URL || "";
};
