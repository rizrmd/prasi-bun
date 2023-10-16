import { spawn } from "bun";
import { dir } from "dir";
import { removeAsync } from "fs-jetpack";
await removeAsync(dir.path("app/static"));
await removeAsync(dir.path("app/web/.parcel-cache"));

await removeAsync(dir.path("app/web/static"));

const args = [
  "node",
  dir.path("node_modules/.bin/parcel"),
  "build",
  "./src/index.tsx",
  "--no-optimize",
  "--dist-dir",
  dir.path(`app/web/static`),
];

const parcel = spawn({
  cmd: args,
  cwd: dir.path("app/web"),
  stdio: ["ignore", "inherit", "inherit"],
});
await parcel.exited;
