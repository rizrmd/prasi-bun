import { spawn } from "bun";
import { sendWS } from "../../sync-handler";
import { SyncType } from "../../type";
import { Code } from "./watcher";

const decoder = new TextDecoder();
export const codePkgInstall = async (id_site: string, mode: string) => {
  try {
    const proc = spawn({
      cmd: ["bun", "i"],
      cwd: Code.path(code.id_site, code.id),
      stderr: "pipe",
      stdout: "pipe",
    });

    const broadcast = (content: string) => {
      activity.site
        .room(code.id_site)
        .findAll({ site_js: code.name })
        .forEach((item, ws) => {
          sendWS(ws, {
            type: SyncType.Event,
            event: "code",
            data: {
              name: code.name,
              id: code.id,
              content,
            },
          });
        });
    };
    (async () => {
      for await (const chunk of proc.stdout) {
        broadcast(decoder.decode(chunk));
      }
    })();
    (async () => {
      for await (const chunk of proc.stderr) {
        broadcast(decoder.decode(chunk));
      }
    })();
    await proc.exited;

    activity.site
      .room(code.id_site)
      .findAll({ site_js: code.name })
      .forEach((item, ws) => {
        sendWS(ws, {
          type: SyncType.Event,
          event: "code",
          data: {
            name: code.name,
            id: code.id,
            event: "code-done",
          },
        });
      });
  } catch (e: any) {
    activity.site
      .room(code.id_site)
      .findAll({ site_js: code.name })
      .forEach((item, ws) => {
        sendWS(ws, {
          type: SyncType.Event,
          event: "code",
          data: {
            name: code.name,
            id: code.id,
            event: "code-done",
            content: `ERROR: ${e.message}`,
          },
        });
      });
  }
};
