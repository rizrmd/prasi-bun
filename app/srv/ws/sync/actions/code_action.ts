import { Subprocess, spawn } from "bun";
import { waitUntil } from "web-utils";
import { SAction } from "../actions";
import { code } from "../code/code";
import { docs } from "../entity/docs";
import { snapshot } from "../entity/snapshot";
import { SyncConnection } from "../type";

const decoder = new TextDecoder();
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
        try {
          const pkg_file = Bun.file(
            code.path(arg.site_id, "site", "src", "package.json")
          );

          const pkg_json = await pkg_file.json();
          if (!pkg_json.scripts || !pkg_json.scripts.startup) {
            return { type, status: "disabled" };
          }
        } catch (e) {}
        return { type, status: "stopped" };
      }

      return { type, status: cs.killed ? "stopped" : "running" };
    }
    case "startup-run": {
      const cs = code_startup.process[arg.site_id];
      if (!cs) {
        code_startup.process[arg.site_id] = spawn({
          cmd: ["npm", "run", "startup"],
          cwd: code.path(arg.site_id, "site", "src"),
          stdio: ["pipe", "inherit", "inherit"],
        });
        code_startup.process[arg.site_id].exited.then((e) => {
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
    case "flush-page-cache": {
      const { page_id } = arg;
      snapshot.del("page", page_id);
      if (docs.page[page_id] && docs.page[page_id].doc) {
        docs.page[page_id].doc.destroy();
      }
      delete docs.page[page_id];
      break;
    }
  }
};
