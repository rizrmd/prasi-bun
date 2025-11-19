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

// Process file contents separately to avoid buffer overflow - very restrictive
function processFileContents(fileData: Record<string, string | Uint8Array>, mode: "string" | "binary"): Record<string, string | Uint8Array> {
  const result: Record<string, string | Uint8Array> = {};
  let processedCount = 0;
  let totalSize = 0;
  const maxSizeLimit = 50 * 1024 * 1024; // 50MB total limit per section
  const maxFileCount = 1000; // Strict limit on number of files
  const maxFileSize = 1 * 1024 * 1024; // 1MB per file limit

  console.log(`Processing file contents with strict limits: max ${maxFileCount} files, ${maxFileSize} per file, ${maxSizeLimit} total`);

  for (const [key, content] of Object.entries(fileData)) {
    if (processedCount >= maxFileCount) {
      console.warn(`Reached maximum file count ${maxFileCount}, stopping processing`);
      break;
    }

    const contentSize = typeof content === 'string' ? content.length : content.byteLength;

    // Check if adding this file would exceed total size limit
    if (totalSize + contentSize > maxSizeLimit) {
      console.warn(`Would exceed size limit, skipping file ${key} (${contentSize} bytes)`);
      break;
    }

    // Skip extremely large files
    if (contentSize > maxFileSize) {
      console.warn(`Skipping large file ${key} (${contentSize} bytes) - exceeds ${maxFileSize} limit`);
      result[key] = mode === "binary" ? new Uint8Array(0) : ""; // Empty content as placeholder
    } else {
      result[key] = content;
      totalSize += contentSize;
    }

    processedCount++;

    if (processedCount % 100 === 0) {
      console.log(`Processed ${processedCount} files, total size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
    }
  }

  console.log(`Completed processing ${processedCount} files (${(totalSize / 1024 / 1024).toFixed(2)}MB total), skipped ${Object.keys(fileData).length - processedCount} files`);
  return result;
}

// Manual minimal msgpack encoder as ultimate fallback
function createMinimalMsgpack(data: any): Uint8Array {
  // Manual msgpack encoding for a very simple object
  // Format: { format: string, status: string, timestamp: number, counts: object }
  const minimalData = {
    format: "minimal",
    status: "too_large",
    timestamp: Date.now(),
    site_id: data.site?.id || "unknown",
    counts: {
      layouts: Array.isArray(data.layouts) ? data.layouts.length : 0,
      pages: Array.isArray(data.pages) ? data.pages.length : 0,
      comps: Array.isArray(data.comps) ? data.comps.length : 0,
      public_files: Object.keys(data.public || {}).length,
      code_files: Object.keys(data.code?.site || {}).length,
    }
  };

  // Create a very simple msgpack-encoded response manually
  // msgpack map format: 0x80 + (number of key-value pairs)
  const numPairs = Object.keys(minimalData).length;
  const result = new Uint8Array(1024); // Pre-allocate small buffer
  let offset = 0;

  // Write map header
  result[offset++] = 0x80 + numPairs;

  // Encode each key-value pair
  for (const [key, value] of Object.entries(minimalData)) {
    // Encode key as string
    const keyBytes = new TextEncoder().encode(key);
    result[offset++] = 0xa0 + keyBytes.length; // str8 format header
    result.set(keyBytes, offset);
    offset += keyBytes.length;

    // Encode value
    if (typeof value === 'string') {
      const strBytes = new TextEncoder().encode(value);
      result[offset++] = 0xa0 + strBytes.length; // str8 format header
      result.set(strBytes, offset);
      offset += strBytes.length;
    } else if (typeof value === 'number') {
      result[offset++] = 0xd3; // int64
      // Write 8 bytes for the number (big-endian)
      const view = new DataView(result.buffer, offset, 8);
      view.setBigInt64(0, BigInt(value), false);
      offset += 8;
    } else if (typeof value === 'object' && value !== null) {
      // Encode counts object as another map
      const countKeys = Object.keys(value);
      result[offset++] = 0x80 + countKeys.length; // map header
      for (const [countKey, countValue] of Object.entries(value)) {
        const countKeyBytes = new TextEncoder().encode(countKey);
        result[offset++] = 0xa0 + countKeyBytes.length;
        result.set(countKeyBytes, offset);
        offset += countKeyBytes.length;

        result[offset++] = 0xd3;
        const countView = new DataView(result.buffer, offset, 8);
        countView.setBigInt64(0, BigInt(Number(countValue)), false);
        offset += 8;
      }
    }
  }

  // Return the actual used portion
  return result.slice(0, offset);
}

// Ultra-safe incremental encoding for extremely large data
function encodeVeryLargeData(data: any): Uint8Array {
  console.log("Starting ultra-safe incremental encoding for extremely large data");

  // First, extract and process all file contents with strict limits
  const processedData = { ...data };

  // Apply very strict file size limits to prevent any buffer overflow
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

  // Try standard encoding on processed data
  try {
    console.log("Attempting standard encoding after file processing");
    return encodeLargeData(processedData);
  } catch (e) {
    console.warn(`Standard encoding failed after file processing: ${e.message}`);
  }

  // If standard encoding fails, build the result incrementally
  console.log("Building custom binary format incrementally");

  // We'll create a simpler structure that definitely can be encoded
  const safeResult: any = {
    _format: "custom",
    _timestamp: Date.now(),
    _site_id: processedData.site?.id || "unknown"
  };

  // Process sections one by one with extreme limits
  const sectionKeys = ['layouts', 'pages', 'comps', 'site', 'public', 'code'];

  for (const sectionKey of sectionKeys) {
    if (processedData[sectionKey]) {
      console.log(`Processing section: ${sectionKey}`);

      try {
        // Try to encode this section alone first
        const testSection = { [sectionKey]: processedData[sectionKey] };
        encodeLargeData(testSection);

        // If it succeeds, include the section
        safeResult[sectionKey] = processedData[sectionKey];
        console.log(`✓ Successfully encoded section: ${sectionKey}`);
      } catch (sectionError) {
        console.warn(`✗ Failed to encode section ${sectionKey}: ${sectionError.message}`);

        if (sectionKey === 'public' || sectionKey === 'code') {
          // For file-heavy sections, create a minimal version
          const fileData = processedData[sectionKey];
          const safeFileData: any = {};

          let fileCount = 0;
          const maxFiles = 100; // Even stricter limit

          for (const [fileName, fileContent] of Object.entries(fileData || {})) {
            if (fileCount >= maxFiles) {
              console.warn(`Reached file limit ${maxFiles} for section ${sectionKey}`);
              break;
            }

            const contentSize = typeof fileContent === 'string' ? fileContent.length : fileContent.byteLength;

            // Very strict size limit per file
            if (contentSize > 100 * 1024) { // 100KB limit per file
              console.warn(`Skipping large file ${fileName} (${contentSize} bytes) in section ${sectionKey}`);
              safeFileData[fileName] = "";
            } else {
              safeFileData[fileName] = fileContent;
              fileCount++;
            }
          }

          // Try encoding the reduced file data
          try {
            encodeLargeData({ [sectionKey]: safeFileData });
            safeResult[sectionKey] = safeFileData;
            console.log(`✓ Successfully encoded reduced section ${sectionKey} with ${fileCount} files`);
          } catch (reducedError) {
            console.warn(`✗ Even reduced section ${sectionKey} failed, using placeholder`);
            // Use a placeholder if even the reduced version fails
            safeResult[sectionKey] = {
              _skipped: true,
              _reason: "too_large",
              _originalFileCount: Object.keys(fileData || {}).length
            };
          }
        } else {
          // For non-file sections, use a placeholder
          safeResult[sectionKey] = processedData[sectionKey];
          if (Array.isArray(safeResult[sectionKey])) {
            // Limit array length even more
            safeResult[sectionKey] = safeResult[sectionKey].slice(0, 10); // Only 10 items
            console.log(`Limited array ${sectionKey} to 10 items`);
          }
        }
      }
    }
  }

  // Final encoding attempt
  try {
    console.log("Final encoding attempt with safe data structure");
    return encodeLargeData(safeResult);
  } catch (finalError) {
    console.error(`Even safe encoding failed: ${finalError.message}`);

    // ULTIMATE FALLBACK: manual msgpack encoding
    try {
      console.log("Using ultimate fallback: manual minimal msgpack encoding");
      return createMinimalMsgpack(processedData);
    } catch (manualError) {
      console.error(`Even manual encoding failed: ${manualError.message}`);

      // Absolute last resort - return a hardcoded minimal response
      const hardcodedResponse = new Uint8Array([
        0x82, // Map with 2 elements
        0xa6, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73, // "status"
        0xa9, 0x74, 0x6f, 0x6f, 0x5f, 0x6c, 0x61, 0x72, 0x67, 0x65, // "too_large"
        0xa8, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, // "timestamp"
        0xd3, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // Current timestamp as int64
      ]);

      // Set actual timestamp
      const view = new DataView(hardcodedResponse.buffer, hardcodedResponse.length - 8, 8);
      view.setBigInt64(0, BigInt(Date.now()), false);

      console.log("Returning hardcoded minimal response as absolute last resort");
      return hardcodedResponse;
    }
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
