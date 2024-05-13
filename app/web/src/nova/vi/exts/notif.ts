import { PG } from "../../ed/logic/ed-global";
import { VG } from "../render/global";
import { PrasiExt, prasi_ext } from "./types";

type NOTIF_ARG = {
  user_id: any;
  body: string;
  title: string;
  data?: any;
};

interface PushNotificationSchema {
  title?: string;
  subtitle?: string;
  body?: string;
  id: string;
  tag?: string;
  badge?: number;
  notification?: any;
  data: any;
  click_action?: string;
  link?: string;
  group?: string;
  groupSummary?: boolean;
}
interface ActionPerformed {
  actionId: string;
  inputValue?: string;
  notification: PushNotificationSchema;
}

const w = window as unknown as {
  notif:
    | {
        loaded: (send: (data: any) => void) => void;
        onReceive: (notif: PushNotificationSchema) => void | Promise<void>;
        onTap: (notif: null | ActionPerformed) => void | Promise<void>;
      }
    | undefined;
};

export const initExtNotif = async (vi: VG, prasi_ext: PrasiExt) => {
  const config = prasi_ext.notif;
  if (window.parent && config) {
    window.addEventListener("message", async ({ data: raw }) => {
      if (typeof raw === "object" && raw.mobile) {
        const data = raw as unknown as
          | {
              type: "notification-token";
              token: string;
            }
          | { type: "notification-tap"; notif: ActionPerformed }
          | { type: "notification-receive"; notif: PushNotificationSchema };

        const waitUntil = async (fn: () => boolean) => {
          if (!current.notif.onTap) {
            let ival = null as any;
            let i = 0;
            await new Promise(() => {
              ival = setInterval(() => {
                i++;
                if (i > 20) {
                  clearInterval(ival);
                }
                if (fn()) {
                  clearInterval(ival);
                }
              }, 500);
            });
            return;
          }
        };

        switch (data.type) {
          case "notification-token":
            config.token = data.token;
            break;
          case "notification-tap":
            if (!current.notif.onTap) {
              waitUntil(() => {
                if (current.notif.onTap) {
                  current.notif.onTap(data.notif);
                  return true;
                }
                return false;
              });
              return;
            }

            if (current.notif.onTap) {
              current.notif.onTap(data.notif);
            }
            break;
          case "notification-receive":
            if (!current.notif.onReceive) {
              waitUntil(() => {
                if (current.notif.onReceive) {
                  current.notif.onReceive(data.notif);
                  return true;
                }
                return false;
              });
            }
            if (current.notif.onReceive) {
              current.notif.onReceive(data.notif);
            }
            break;
        }
      }
    });

    const current = {
      send: (msg: { type: "ready" }) => {
        window.parent.postMessage({ mobile: true, ...msg }, "*");
      },
      config,
      notif: {
        register: async (user_id: any) => {
          if (vi && vi.site.api) {
            return await vi.site.api._notif("register", {
              type: "register",
              id: typeof user_id === "string" ? user_id : user_id.toString(),
              token: config.token,
            });
          }
        },
        send: async (data: NOTIF_ARG) => {
          if (vi && vi.site.api) {
            return await vi.site.api._notif("send", {
              type: "send",
              id:
                typeof data.user_id === "string"
                  ? data.user_id
                  : data.user_id.toString(),
              body: data.body,
              title: data.title,
              data: data.data,
            });
          }
        },
        onTap: null as null | Exclude<typeof w.notif, undefined>["onTap"],
        onReceive: null as
          | null
          | Exclude<typeof w.notif, undefined>["onReceive"],
      },
    };
    current.send({ type: "ready" });
  }
};
