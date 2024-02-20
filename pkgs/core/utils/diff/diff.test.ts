import { describe } from "bun:test";
import { readAsync } from "fs-jetpack";
import { Diff, gunzipAsync } from "./diff";

import { Packr } from "msgpackr";

const MAX_HISTORY = 10;

const packr = new Packr({});

describe("simple diff", async () => {
  const json = await readAsync("data/1MB.json", "json") as any[];
  const server = await Diff.server<any>(json);
  const patch = await server.getPatch("new");

  console.log("init");
  const client = await Diff.client<string>(patch); 
  console.log(
    hmn(patch.length),
    `|| client: ${hmn(JSON.stringify(await client.data).length)}`
  );

  console.log("\npatch1");
  json.shift();
  json.shift();
  json.shift();
  await server.update(json);
  const patch1 = await server.getPatch(client.ts);
  await client.applyPatch(patch1);
  console.log(
    hmn(patch1.length),
    `|| client: ${hmn(JSON.stringify(await client.data).length)}`
  );

  // console.log("\npatch15");
  // await server.update({ moka: { rako: "1231" } });
  // const patch15 = await server.getPatch(client.ts);
  // await client.applyPatch(patch15);
  // console.log(
  //   hmn(patch15.length),
  //   `|| client: ${JSON.stringify(await client.data)}`
  // );

  // console.log("\npatch2");
  // const bin = await readAsync("data/prod/main.js", "utf8");
  // await server.update(bin);
  // const patch2 = await server.getPatch(client.ts);
  // await client.applyPatch(patch2);
  // console.log(
  //   hmn(patch2.length),
  //   `|| client: ${hmn((await client.data).length)}`
  // );

  // if (bin) {
  //   console.log("\npatch2.5");
  //   await server.update(bin.substring(0, 10) + "1" + bin.substring(10));
  //   const patch25 = await server.getPatch(client.ts);
  //   await client.applyPatch(patch25);
  //   console.log(
  //     hmn(patch25.length),
  //     `|| client: ${hmn((await client.data).length)}`
  //   );
  // }

  // console.log("\npatch3");
  // const ubin = "mantappu" + bin?.substring(0, 100000);
  // await server.update(ubin);
  // const patch3 = await server.getPatch(client.ts);
  // await client.applyPatch(patch3);
  // console.log(
  //   hmn(patch3.length),
  //   `|| client: ${hmn((await client.data).length)}`
  // );
});

function hmn(bytes: number): string {
  const sizes = ["bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 bytes";

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = i === 0 ? bytes : (bytes / Math.pow(1024, i)).toFixed(2);

  return `${size} ${sizes[i]}`;
}
