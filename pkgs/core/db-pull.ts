import { dir } from "dir";
import { $ } from "execa";

await $({
  cwd: dir.path("app/db"),
  stdio: ["ignore", "inherit", "inherit"],
})`bun prisma db pull`;
await $({
  cwd: dir.path("app/db"),
  stdio: ["ignore", "inherit", "inherit"],
})`bun prisma generate`;
