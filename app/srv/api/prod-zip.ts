import { apiContext } from "service-srv";
import fs from "fs";
import path from "path";
import { gzipAsync } from "../ws/sync/entity/zlib";
import { validate } from "uuid";
import { dir } from "dir";
import { existsAsync, readAsync, exists } from "fs-jetpack";
import { code } from "../ws/sync/code/code";
import { encode, Packr } from "msgpackr";
import { binaryExtensions } from "../util/binary-ext";

// Create a custom Packr instance with larger buffer limits
const largePackr = new Packr({
  // Configure for large data handling
  useRecords: false,
  // Set reasonable chunk size for encoding
  maxStructureDepth: 64,
  // Additional options for large data
});

function encodeLargeData(data: any): Uint8Array {
  try {
    // Try standard encoding first
    return encode(data);
  } catch (e) {
    // If that fails, try with our custom packr
    console.warn(`Standard msgpack failed for large data, using custom packr: ${e.message}`);
    return largePackr.encode(data);
  }
}

// Additional helper for extremely large data - chunk the object before encoding
function encodeVeryLargeData(data: any): Uint8Array {
  // First try our large data encoder
  try {
    return encodeLargeData(data);
  } catch (e) {
    console.warn(`All msgpack encoders failed, implementing chunked encoding: ${e.message}`);

    // For extremely large objects, we need to chunk them
    const chunks: Uint8Array[] = [];

    // Split the result into manageable chunks
    const entries = Object.entries(data);
    const chunkSize = 1000; // Process 1000 properties at a time

    for (let i = 0; i < entries.length; i += chunkSize) {
      const chunk = Object.fromEntries(entries.slice(i, i + chunkSize));
      const encodedChunk = largePackr.encode(chunk);
      chunks.push(encodedChunk);
    }

    // Combine chunks with a simple framing protocol
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length + 4, 0); // 4 bytes for length prefix
    const result = new Uint8Array(totalLength);
    let offset = 0;

    for (const chunk of chunks) {
      // Write chunk length (4 bytes)
      const view = new DataView(result.buffer, offset, 4);
      view.setUint32(0, chunk.length, false); // big-endian
      offset += 4;

      // Write chunk data
      result.set(chunk, offset);
      offset += chunk.length;
    }

    return result;
  }
}

export const _ = {
  url: "/prod-zip/:site_id",
  async api(site_id: string) {
    const { req, res } = apiContext(this);

    let is_msgpack = req.query_parameters["msgpack"];

    // Add timeout handling for large file operations
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 230000); // 230 seconds (less than server timeout of 240)
    });

    const zipPromise = (async () => {
      if (validate(site_id)) {
        const mode = is_msgpack ? "binary" : "string";

        // Check public directory size first to estimate total size
        const public_data = readDirectoryRecursively(
          mode,
          code.path(site_id, "site", "src", "public")
        );

        // Estimate if this will be too large for msgpack
        const estimatedSize = Object.keys(public_data).length * 1000; // rough estimate
        if (estimatedSize > 100 * 1024 * 1024) { // 100MB estimate
          console.warn(`Large site detected for ${site_id}, estimated size: ${estimatedSize} bytes`);
        }
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

        let dataToCompress: Uint8Array;

        // Use optimized msgpack encoding for large data
        if (mode === "binary") {
          dataToCompress = encodeVeryLargeData(result);
        } else {
          // For string mode, still use JSON as it's more appropriate for text
          dataToCompress = new TextEncoder().encode(JSON.stringify(result));
        }

        return await gzipAsync(Buffer.from(dataToCompress));
      }
      return new Response("NOT FOUND", { status: 403 });
    })();

    try {
      const result = await Promise.race([zipPromise, timeoutPromise]);
      return result;
    } catch (e: any) {
      if (e.message === 'Request timeout') {
        return new Response(
          JSON.stringify({
            error: 'Request timeout - the site is too large to zip within the time limit',
            timeout: true
          }),
          {
            status: 408,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
      throw e;
    }
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
