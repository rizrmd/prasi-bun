import { dir } from "dir";
import { $ } from "execa";

await $({ cwd: dir.path("app/db") })`bun prisma db pull`;
await $({ cwd: dir.path("app/db") })`bun prisma generate`;
