import { spawn } from "bun";
import { ExecaChildProcess, $ } from "execa";
import { waitUntil } from "web-utils";
import { SAction } from "../actions";
import { code } from "../editor/code/util-code";
import { SyncConnection } from "../type";

const code_startup = {
  process: {} as Record<string, ExecaChildProcess>,
};

export const code_action: SAction["code"]["action"] = async function (
  this: SyncConnection,
  arg
) {
  const { type } = arg;

  switch (type) {
    case "startup-check": {
      const cs = code_startup.process[arg.site_id];

      if (!cs) {
        const pkg_file = Bun.file(
          code.path(arg.site_id, "site", "src", "package.json")
        );

        const pkg_json = await pkg_file.json();
        if (!pkg_json.scripts || !pkg_json.scripts.startup) {
          return { type, status: "disabled" };
        }

        return { type, status: "stopped" };
      }

      return { type, status: cs.killed ? "stopped" : "running" };
    }
    case "startup-run": {
      const cs = code_startup.process[arg.site_id];
      if (!cs) {
        code_startup.process[arg.site_id] = $({
          cwd: code.path(arg.site_id, "site", "src"),
        })`npm run startup`;
        code_startup.process[arg.site_id].on("exit", () => {
          delete code_startup.process[arg.site_id];
        });
        await waitUntil(1000);
      }
      break;
    }
    case "startup-stop": {
      const cs = code_startup.process[arg.site_id];
      if (cs && !cs.killed) {
        cs.kill();
        await waitUntil(1000);
      }
      break;
    }
  }
};
