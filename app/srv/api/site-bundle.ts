import { createHash } from "crypto";
import { dir } from "dir";
import { readAsync } from "fs-jetpack";
import { apiContext } from "../../../pkgs/core/server/api/api-ctx";
const cache = {
  md5: "",
  content: null as any,
};

export const _ = {
  url: "/site-bundle/:mode",
  async api(mode: "md5" | "download") {
    const { req, res } = apiContext(this);

    const content = await readAsync(dir.path("app/srv/site.zip"), "buffer");

    if (content) {
      cache.md5 = createHash("md5").update(content).digest("hex");
      cache.content = content;
    }
    if (mode === "md5") {
      res.setHeader("Content-Type", "text/plain");
      return cache.md5;
    }

    res.setHeader("Content-Type", "application/zip");
    res.send(cache.content);
  },
};
