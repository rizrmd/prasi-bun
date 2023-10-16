import { spawn } from "bun";
import { dir } from "dir";
import { dirAsync, removeAsync } from "fs-jetpack";
import { g } from "utils/global";
await removeAsync(dir.path("app/static"));
await removeAsync(dir.path("app/web/.parcel-cache"));

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
