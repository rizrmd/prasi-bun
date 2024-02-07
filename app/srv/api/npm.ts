import crypto from "crypto";
import { dir } from "dir";
import { readAsync } from "fs-jetpack";
import mime from "mime-types";
import { apiContext } from "../../../pkgs/core/server/api/api-ctx";
import { glb } from "../global";
import { g } from "utils/global";

export const _ = {
  url: "/npm/:mode/:id/*",
  async api(mode: "site" | "page" | "apk-qr", id: string) {
    const { req, res, mode: _mode } = apiContext(this);

    if (mode === "apk-qr") {
      const file_apk = Bun.file(dir.data(`/prasi-wrap.apk`));
      if (!await file_apk.exists()) {
        return new Response('not found');
      }
      return new Response(file_apk);
    }

    let path = dir.data(`/npm/${mode}/${id}/${req.params._}`);

    const contentType = mime.lookup(path);
    if (contentType) res.setHeader("content-type", contentType);

    if (path.endsWith(`${mode}.js`)) {
      path = path.substring(0, path.length - `${mode}.js`.length) + `index.js`;

      if (glb.npm[mode][id]) {
        const npm = glb.npm[mode][id];
        if (npm) {
          res.setHeader("etag", npm.etag);
          res.setHeader("content-length", npm.file.byteLength.toString());

          if (npm.etag === req.headers.get("if-none-match")) {
            res.sendStatus(304);
            return;
          }

          res.send(npm.file);

          readAsync(path, "buffer").then((file) => {
            if (file && path.endsWith("index.js")) {
              glb.npm[mode][id] = {
                file,
                etag: crypto.createHash("md5").update(file).digest("hex"),
              };
            }
          });
          return;
        }
      }
    }

    if (path.length > dir.data(`/npm/${mode}/${id}`).length) {
      const file = await readAsync(path, "buffer");

      if (file) {
        if (path.endsWith("index.js")) {
          glb.npm[mode][id] = {
            file,
            etag: crypto.createHash("md5").update(file).digest("hex"),
          };
          const npm = glb.npm[mode][id];
          if (npm) {
            res.setHeader("etag", npm.etag);

            if (npm.etag === req.headers.get("if-none-match")) {
              res.sendStatus(304);
              return;
            }
          }
        }

        res.setHeader("content-length", file.byteLength.toString());
        res.send(file);
        return;
      } else {
        glb.npm[mode][id] = null;
      }
    }
    res.setHeader("etag", "empty");

    res.send("");
  },
};
