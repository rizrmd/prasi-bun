import { apiContext } from "service-srv";
import fs from "fs";
import path from "path";
import { gzipAsync } from "../ws/sync/entity/zlib";
import { validate } from "uuid";
import { dir } from "dir";
import { existsAsync, readAsync, exists } from "fs-jetpack";
import { code } from "../ws/sync/code/code";
import { encode } from "msgpackr";
import { binaryExtensions } from "../util/binary-ext";
export const _ = {
  url: "/prod-zip/:site_id",
  async api(site_id: string) {
    const { req, res } = apiContext(this);

    let is_msgpack = req.query_parameters["msgpack"];

    if (validate(site_id)) {
      const mode = is_msgpack ? "binary" : "string";
      const public_data = readDirectoryRecursively(
        mode,
        code.path(site_id, "site", "src", "public")
      );
      const result = {
        layouts: await _db.page.findMany({
          where: {
            id_site: site_id,
            is_deleted: false,
            name: { startsWith: "layout:" },
          },
          select: {
            id: true,
            name: true,
            url: true,
            content_tree: true,
            is_default_layout: true,
          },
        }),
        pages: await _db.page.findMany({
          where: {
            id_site: site_id,
            is_deleted: false,
            name: { not: { startsWith: "layout:" } },
          },
          select: { id: true, name: true, url: true, content_tree: true },
        }),
        comps: await _db.component.findMany({
          where: {
            component_group: {
              OR: [
                {
                  id: "13143272-d4e3-4301-b790-2b3fd3e524e6",
                },
                { id: "cf81ff60-efe5-41d2-aa41-6f47549082b2" },
                {
                  component_site: { every: { id_site: site_id } },
                },
              ],
            },
          },
          select: { id: true, content_tree: true },
        }),
        public: public_data,
        site: await _db.site.findFirst({
          where: { id: site_id },
          select: {
            id: true,
            name: true,
            config: true,
            responsive: true,
            domain: true,
          },
        }),
        code: {
          server: readDirectoryRecursively(
            mode,
            code.path(site_id, "server", "build")
          ),
          site: readDirectoryRecursively(
            mode,
            code.path(site_id, "site", "build")
          ),
          core: readDirectoryRecursively(mode, dir.path(`/app/srv/core`)),
        },
      };

      return await gzipAsync(
        mode === "binary" ? encode(result) : JSON.stringify(result)
      );
    }
    return new Response("NOT FOUND", { status: 403 });
  },
};

export function readDirectoryRecursively(
  mode: "string" | "binary",
  dirPath: string,
  baseDir?: string[]
): Record<string, string | Uint8Array> {
  const result: Record<string, string | Uint8Array> = {};

  if (!exists(dirPath)) return result;
  const contents = fs.readdirSync(dirPath);

  for (const item of contents) {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isFile()) {
      let content: any = "";
      if (mode === "string") content = fs.readFileSync(itemPath, "utf-8");
      else {
        if (binaryExtensions.includes(itemPath.split(".").pop() || "")) {
          content = new Uint8Array(fs.readFileSync(itemPath));
        } else {
          content = fs.readFileSync(itemPath, "utf-8");
        }
      }
      result[[...(baseDir || []), item].join("/")] = content;
    } else if (stats.isDirectory()) {
      if (item !== "node_modules") {
        const subdirResult = readDirectoryRecursively(mode, itemPath, [
          ...(baseDir || []),
          item,
        ]);
        Object.assign(result, subdirResult);
      }
    }
  }

  return result;
}
