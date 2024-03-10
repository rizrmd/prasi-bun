import { apiContext } from "../../../../pkgs/core/server/api/api-ctx";
import { session } from "utils/session";

export const _ = {
  url: "/_logout",
  async api() {
    const { res } = apiContext(this);
    res.setHeader("set-cookie", `${session.cookieKey}=X`);

    return res;
  },
};
