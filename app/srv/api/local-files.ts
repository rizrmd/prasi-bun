import { dir } from "dir";
import { apiContext } from "service-srv";

export const _ = {
  url: "/local-files",
  async api(arg: {
    id_site: string;
    mode: "list" | "write" | "read";
    path: string;
    content?: string;
  }) {
    const { req, res } = apiContext(this);

    const { mode, id_site, path, content } = arg;
    const root = dir.data(`/code/${id_site}/site/src`);
    switch (mode) {
      case "list": {
        const glob = new Bun.Glob("**");
        const files = [];
        for await (const file of glob.scan(root + path)) {
          files.push(file);
        }
        return files;
      }
      case "write": {
        await Bun.write(root + path, content || "", { createPath: true });
      }
      case "read": {
        try {
          return await Bun.file(root + path).text();
        } catch (e) {
          return null;
        }
      }
    }

    return "ok";
  },
};
