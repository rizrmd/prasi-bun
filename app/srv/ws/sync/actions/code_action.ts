import { Subprocess, spawn } from "bun";
import { SAction } from "../actions";
import { SyncConnection } from "../type";
import { code } from "../editor/code/util-code";
import { waitUntil } from "web-utils";

const code_startup = {
  process: {} as Record<string, Subprocess>,
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
      if (
        !code_startup.process[arg.site_id] ||
        (code_startup.process[arg.site_id] &&
          !code_startup.process[arg.site_id].killed)
      ) {
        code_startup.process[arg.site_id] = spawn({
          cmd: ["npm", "run", "startup"],
          cwd: code.path(arg.site_id, "site", "src"),
        });
        await waitUntil(1000);
      }
      break;
    }
    case "startup-stop": {
      const cs = code_startup.process[arg.site_id];
      if (cs && !cs.killed) {
        cs.kill();
        await cs.exited;
      }
      break;
    }
  }
};
