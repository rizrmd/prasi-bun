import { spawn } from "bun";
import { dir } from "dir";

await spawn({
  cmd: ["bun", "prisma", "db", "pull"],
  cwd: dir.path("app/db"),
  stdio: ["ignore", "inherit", "inherit"],
}).exited;

await spawn({
  cmd: ["bun", "prisma", "generate"],
  cwd: dir.path("app/db"),
  stdio: ["ignore", "inherit", "inherit"],
}).exited;
