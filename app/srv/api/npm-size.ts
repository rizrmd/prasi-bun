import { dir } from "dir";
import { stat } from "fs/promises";
import { apiContext } from "service-srv";
import { g } from "utils/global";

export const _ = {
  url: "/npm-size/:mode/:id",
  async api(mode: "site" | "page", id: string) {
    const { req, res } = apiContext(this);
    try {
      const s = await stat(dir.path(`${g.datadir}/npm/${mode}/${id}/index.js`));
      return s.size.toString();
    } catch (e) {}
    return "-";
  },
};
