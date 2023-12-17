import { w } from "../../../utils/types/general";
import { PG } from "./global";

type NOTIF_ARG = {
  user_id: any;
  body: string;
  title: string;
  data?: any;
};
export const registerMobile = () => {
  const default_mobile = {
    send: () => {},
    bind: (p: PG) => {},
    notif: {
      register: (user_id: string) => {},
      send: async (data: NOTIF_ARG) => {
        const p = getP();
        if (p) {
          return await p.script.api._notif("send", {
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
      onTap: (data: NOTIF_ARG) => {},
      onReceive: (data: NOTIF_ARG) => {},
    },
  };

  let config = { notif_token: "", p: null as null | PG };
  const getP = () => {
    const p = config.p;
    if (p && p.site && p.site.api_url) {
      const api = w.prasiApi[p.site.api_url];
      if (
        api &&
        api.apiEntry &&
        api.apiEntry._notif &&
        p.script &&
        p.script.api
      ) {
        return p;
      }
    }
  };

  if (window.parent) {
    window.addEventListener("message", async ({ data: raw }) => {
      if (typeof raw === "object" && raw.mobile) {
        const data = raw as unknown as
          | {
              type: "notification-token";
              token: string;
            }
          | { type: "notification-tap"; notif: NOTIF_ARG }
          | { type: "notification-receive"; notif: NOTIF_ARG };

        const waitUntil = async (fn: () => boolean) => {
          if (!notifObject.notif.onTap) {
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
            config.notif_token = data.token;
            break;
          case "notification-tap":
            if (!notifObject.notif.onTap) {
              waitUntil(() => {
                if (notifObject.notif.onTap) {
                  notifObject.notif.onTap(data.notif);
                  return true;
                }
                return false;
              });
              return;
            }

            if (notifObject.notif.onTap) {
              notifObject.notif.onTap(data.notif);
            }
            break;
          case "notification-receive":
            if (!notifObject.notif.onReceive) {
              waitUntil(() => {
                if (notifObject.notif.onReceive) {
                  notifObject.notif.onReceive(data.notif);
                  return true;
                }
                return false;
              });
            }
            if (notifObject.notif.onReceive) {
              notifObject.notif.onReceive(data.notif);
            }
            break;
        }
      }
    });

    const notifObject = {
      send: (msg: { type: "ready" }) => {
        window.parent.postMessage({ mobile: true, ...msg }, "*");
      },
      bind(p: PG) {
        config.p = p;
      },
      config,
      notif: {
        register: async (user_id: any) => {
          const p = getP();
          if (p) {
            return await p.script.api._notif("register", {
              type: "register",
              id: typeof user_id === "string" ? user_id : user_id.toString(),
              token: config.notif_token,
            });
          }
        },
        send: async (data: NOTIF_ARG) => {
          const p = getP();
          if (p) {
            return await p.script.api._notif("send", {
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
        onTap: null as null | typeof default_mobile.notif.onTap,
        onReceive: null as null | typeof default_mobile.notif.onReceive,
      },
    };
    return notifObject;
  }
  return {
    ...default_mobile,
  };
};
