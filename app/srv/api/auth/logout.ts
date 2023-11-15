import { apiContext } from "service-srv";
import { session } from "utils/session";

export const _ = {
  url: "/_logout",
  async api() {
    const { res } = apiContext(this);
    res.setHeader("set-cookie", `${session.cookieKey}=X`);
  },
};
