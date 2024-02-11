import { describe } from "bun:test";
import { readAsync } from "fs-jetpack";
import { Diff, gunzipAsync } from "./diff";

import { Packr } from "msgpackr";

const MAX_HISTORY = 10;

const packr = new Packr({});

describe("simple diff", async () => {
  const server = await Diff.server<any>(await readAsync("tsconfig.json"));
  const patch = await server.getPatch("new");

  console.log("init", hmn(patch.length));
  const client = await Diff.client<string>(patch);

  console.log("\npatch1");
  await server.update("rako12");
  const patch1 = await server.getPatch(client.ts);
  await client.applyPatch(patch1);
  console.log(
    hmn(patch1.length),
    `|| client: ${hmn((await client.data).length)}`
  );

  console.log("\npatch2");
  const bin = await readAsync("data/prod/main.js", "utf8");
  await server.update(bin);
  const patch2 = await server.getPatch(client.ts);
  await client.applyPatch(patch2);
  console.log(
    hmn(patch2.length),
    `|| client: ${hmn((await client.data).length)}`
  );

  console.log("\npatch3");
  const ubin = "mantappu" + bin?.substring(0,100000);
  await server.update(ubin);
  const patch3 = await server.getPatch(client.ts);
  await client.applyPatch(patch3);
  console.log(
    hmn(patch3.length),
    `|| client: ${hmn((await client.data).length)}`
  );
});

function hmn(bytes: number): string {
  const sizes = ["bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 bytes";

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = i === 0 ? bytes : (bytes / Math.pow(1024, i)).toFixed(2);

  return `${size} ${sizes[i]}`;
}
