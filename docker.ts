import { spawnSync } from "child_process";

Bun.serve({
  port: 3000,
  fetch(request, server) {
    return new Response("Hello World\n\n" + process.cwd(), {
      status: 200,
    });
  },
});

spawnSync("bun run prod", { cwd: "/app/prasi/repo" });
