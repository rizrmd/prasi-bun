import { describe, expect, test } from "bun:test";
import { Diff } from "./diff";

describe("simple diff", async () => {
  const server = await Diff.server("ini ionadi a");
  const patch = server.getPatch("new");

  const client = await Diff.client(patch);

  await server.update("rako12");

  const newPatch = server.getPatch(client.ts);

  await client.applyPatch(newPatch);
  expect(await client.data).toBe("rako12");
});
