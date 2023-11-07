type NOTIF_ARG = {
  user_id: string;
  body: string;
  title: string;
  data?: any;
};
export const registerMobile = () => {
  const default_mobile = {
    notif: {
      register: (user_id: string) => {},
      send: (data: NOTIF_ARG) => {},
      onTap: (data: NOTIF_ARG) => {},
    },
  };
  if (window.parent) {
    let config = { notif_token: "" };
    window.addEventListener("message", ({ data: raw }) => {
      if (typeof raw === "object" && raw.mobile) {
        const data = raw as unknown as {
          type: "notification-token";
          token: string;
        };

        switch (data.type) {
          case "notification-token":
            config.notif_token = data.token;
            console.log(config);
            break;
        }
      }
    });

    return {
      send: (msg: { type: "ready" }) => {
        window.parent.postMessage({ mobile: true, ...msg }, "*");
      },
      config,
      notif: {
        register: (user_id: string) => {},
        send: (data: NOTIF_ARG) => {},
        onTap: (data: NOTIF_ARG) => {},
      },
    };
  }
  return {
    ...default_mobile,
  };
};
