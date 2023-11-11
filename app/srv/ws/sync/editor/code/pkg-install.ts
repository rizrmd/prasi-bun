import { activity } from "../../entity/activity";
import { sendWS } from "../../sync-handler";
import { SyncType } from "../../type";
import { spawn } from "bun";
import { DBCode } from "./prep-code";
import { Code } from "./watcher";
import { PassThrough } from "stream";

const decoder = new TextDecoder();
export const codePkgInstall = async (code: DBCode) => {
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
          event: "code-loading",
        },
      });
    });
  try {
    const proc = spawn({
      cmd: ["bun", "i"],
      cwd: Code.path(code.id),
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
