import { waitUntil } from "web-utils";
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
        send: (data: NOTIF_ARG) => Promise<void>;
        register: (user_id: string) => void;
        onReceive: (notif: PushNotificationSchema) => void | Promise<void>;
        onTap: (notif: null | ActionPerformed) => void | Promise<void>;
      }
    | undefined;
};

export const initExtNotif = async (vi: VG, prasi_ext: PrasiExt) => {
  if (window.parent) {
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
          if (!w.notif?.onTap) {
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
            prasi_ext.notif = { token: data.token };
            w.notif = {
              async send(data: NOTIF_ARG) {
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
              async register(user_id: any) {
                if (vi && vi.site.api && prasi_ext.notif?.token) {
                  return await vi.site.api._notif("register", {
                    type: "register",
                    id:
                      typeof user_id === "string"
                        ? user_id
                        : user_id.toString(),
                    token: prasi_ext.notif.token,
                  });
                }
              },
              onReceive(notif) {},
              onTap(notif) {},
            };

            break;
          case "notification-tap":
            if (!w.notif?.onTap) {
              waitUntil(() => {
                if (w.notif?.onTap) {
                  w.notif?.onTap(data.notif);
                  return true;
                }
                return false;
              });
              return;
            }

            if (w.notif?.onTap) {
              w.notif?.onTap(data.notif);
            }
            break;
          case "notification-receive":
            if (!w.notif?.onReceive) {
              waitUntil(() => {
                if (w.notif?.onReceive) {
                  w.notif?.onReceive(data.notif);
                  return true;
                }
                return false;
              });
            }
            if (w.notif?.onReceive) {
              w.notif?.onReceive(data.notif);
            }
            break;
        }
      }
    });

    window.parent.postMessage({ mobile: true, type: "ready" }, "*");

    w.notif = {
      async send(data: NOTIF_ARG) {
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
    } as any;
  }
};
