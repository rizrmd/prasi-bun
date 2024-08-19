import { apiContext } from "../../../../pkgs/core/server/api/api-ctx";
import { user } from "dbgen";
import { session } from "utils/session";

export const _ = {
  url: "/_session",
  async api() {
    const { req, res } = apiContext(this);
    const sdata = session.get<{
      user: user & {
        org: {
          id: string;
          name: string;
        }[];
      };
    }>(req);
    if (sdata) {
      let setDefaultCookie = true;
      const origin = req.headers.get("origin");
      if (origin) {
        const url = new URL(origin);
        if (url.port === "4550") {
          setDefaultCookie = false;
          res.setHeader("set-cookie", `${session.cookieKey}=${sdata.id};`);
        }
      }

      if (setDefaultCookie) {
        res.setHeader(
          "set-cookie",
          `${session.cookieKey}=${sdata.id}; SameSite=None; Secure; HttpOnly`
        );
      }
    }
    return sdata;
  },
};
