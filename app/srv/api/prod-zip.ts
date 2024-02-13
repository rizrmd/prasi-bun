import { apiContext } from "service-srv";
import { code } from "../ws/sync/editor/code/util-code";
import fs from "fs";
import path from "path";
import { gzipAsync } from "../ws/sync/entity/zlib";
import { validate } from "uuid";
import { dir } from "dir";

export const _ = {
  url: "/prod-zip/:site_id",
  async api(site_id: string) {
    const { req, res } = apiContext(this);

    if (validate(site_id)) {
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
              component_site: { some: { id_site: site_id } },
            },
          },
          select: { id: true, content_tree: true },
        }),
        site: await _db.component.findFirst({ where: { id: site_id } }),
        code: {
          server: readDirectoryRecursively(
            code.path(site_id, "server", "build")
          ),
          site: readDirectoryRecursively(code.path(site_id, "site", "build")),
          core: readDirectoryRecursively(dir.data(`prod`)),
        },
      };

      return await gzipAsync(JSON.stringify(result));
    }
    return new Response("NOT FOUND", { status: 403 });
  },
};

export function readDirectoryRecursively(
  dirPath: string,
  baseDir?: string[]
): Record<string, string> {
  const result: Record<string, string> = {};

  const contents = fs.readdirSync(dirPath);

  for (const item of contents) {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isFile()) {
      const content = fs.readFileSync(itemPath, "utf-8");
      result[[...(baseDir || []), item].join("/")] = content;
    } else if (stats.isDirectory()) {
      if (item !== "node_modules") {
        const subdirResult = readDirectoryRecursively(itemPath, [
          ...(baseDir || []),
          item,
        ]);
        Object.assign(result, subdirResult);
      }
    }
  }

  return result;
}
