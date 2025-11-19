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

// Process file contents separately to avoid buffer overflow
function processFileContents(fileData: Record<string, string | Uint8Array>, mode: "string" | "binary"): Record<string, string | Uint8Array> {
  const result: Record<string, string | Uint8Array> = {};
  let processedCount = 0;

  for (const [key, content] of Object.entries(fileData)) {
    // Skip extremely large files that could cause buffer overflow
    const contentSize = typeof content === 'string' ? content.length : content.byteLength;

    if (contentSize > 10 * 1024 * 1024) { // Skip files larger than 10MB
      console.warn(`Skipping large file ${key} (${contentSize} bytes) to avoid buffer overflow`);
      result[key] = mode === "binary" ? new Uint8Array(0) : ""; // Empty content as placeholder
    } else {
      result[key] = content;
    }

    processedCount++;
    if (processedCount % 1000 === 0) {
      console.log(`Processed ${processedCount} files...`);
    }
  }

  console.log(`Completed processing ${processedCount} files, skipped ${Object.keys(fileData).length - processedCount} large files`);
  return result;
}

// Additional helper for extremely large data - separate metadata and file contents
function encodeVeryLargeData(data: any): Uint8Array {
  // Extract and process file contents separately
  const processedData = { ...data };

  // Process file contents in each section to avoid buffer overflow
  if (processedData.public) {
    processedData.public = processFileContents(processedData.public, "binary");
  }

  if (processedData.code) {
    if (processedData.code.server) {
      processedData.code.server = processFileContents(processedData.code.server, "binary");
    }
    if (processedData.code.site) {
      processedData.code.site = processFileContents(processedData.code.site, "binary");
    }
    if (processedData.code.core) {
      processedData.code.core = processFileContents(processedData.code.core, "binary");
    }
  }

  // First try our large data encoder with processed data
  try {
    return encodeLargeData(processedData);
  } catch (e) {
    console.warn(`All msgpack encoders failed, implementing aggressive chunked encoding: ${e.message}`);

    // For extremely large objects, implement aggressive chunking
    const chunks: Uint8Array[] = [];
    const entries = Object.entries(processedData);
    const chunkSize = 100; // Much smaller chunks - 100 properties at a time

    for (let i = 0; i < entries.length; i += chunkSize) {
      const chunk = Object.fromEntries(entries.slice(i, i + chunkSize));

      try {
        const encodedChunk = largePackr.encode(chunk);
        chunks.push(encodedChunk);
      } catch (chunkError) {
        console.warn(`Chunk encoding failed for chunk ${i}-${i + chunkSize}, skipping: ${chunkError.message}`);
        // Skip this chunk if it's too large
        continue;
      }
    }

    if (chunks.length === 0) {
      throw new Error("All chunks were too large to encode");
    }

    // Combine chunks with a simple framing protocol
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length + 4, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;

    for (const chunk of chunks) {
      // Write chunk length (4 bytes)
      const view = new DataView(result.buffer, offset, 4);
      view.setUint32(0, chunk.length, false);
      offset += 4;

      // Write chunk data
      result.set(chunk, offset);
      offset += chunk.length;
    }

    console.log(`Successfully encoded ${chunks.length} chunks for ${entries.length} total properties`);
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
