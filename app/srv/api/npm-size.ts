import { dir } from "dir";
import { stat } from "fs/promises";
import { apiContext } from "../../../pkgs/core/server/api/api-ctx";
import { g } from "utils/global";

export const _ = {
  url: "/npm-size/:mode/:id",
  async api(mode: "site" | "page", id: string) {
    const { req, res } = apiContext(this);
    try {
      const s = await stat(dir.data(`$/npm/${mode}/${id}/index.js`));
      return s.size.toString();
    } catch (e) {}
    return "-";
  },
};
