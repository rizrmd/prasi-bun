import { apiContext } from "service-srv";
import fs from "fs";
import path from "path";
import { validate } from "uuid";
import { dir } from "dir";
import { existsAsync, readAsync, exists } from "fs-jetpack";
import { code } from "../ws/sync/code/code";
import { binaryExtensions } from "../util/binary-ext";

// Import archiver for zip creation
const archiver = require('archiver');

// Helper function to process file contents with reasonable size limits
function processFileContents(fileData: Record<string, any>, mode: "string" | "binary"): Record<string, any> {
  const processed: Record<string, any> = {};
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB per file limit
  const MAX_TOTAL_SIZE = 500 * 1024 * 1024; // 500MB total limit
  let totalSize = 0;

  for (const [fileName, content] of Object.entries(fileData)) {
    const contentSize = typeof content === 'string' ? content.length :
                       (content instanceof Uint8Array ? content.byteLength :
                       (content instanceof Buffer ? content.length : 0));

    // Skip files that are too large
    if (contentSize > MAX_FILE_SIZE) {
      console.warn(`Skipping large file: ${fileName} (${(contentSize / 1024 / 1024).toFixed(2)}MB > ${MAX_FILE_SIZE / 1024 / 1024}MB)`);
      continue;
    }

    // Check total size limit
    if (totalSize + contentSize > MAX_TOTAL_SIZE) {
      console.warn(`Skipping file due to total size limit: ${fileName}`);
      break;
    }

    processed[fileName] = content;
    totalSize += contentSize;
  }

  console.log(`Processed ${Object.keys(processed).length} files, total size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
  return processed;
}

// Helper function to encode large data structures
function encodeLargeData(data: any): Uint8Array {
  try {
    // Try to use TextEncoder to create JSON string, then convert to Uint8Array
    const jsonString = JSON.stringify(data);
    return new TextEncoder().encode(jsonString);
  } catch (error) {
    console.warn(`JSON encoding failed, trying fallback: ${error.message}`);

    // Fallback: create a simple structure that can always be encoded
    const fallbackData = {
      _encoding_error: true,
      _message: error.message,
      _data_type: typeof data,
      _keys: Array.isArray(data) ? 'array' : typeof data === 'object' && data !== null ? Object.keys(data) : 'primitive'
    };

    try {
      const jsonString = JSON.stringify(fallbackData);
      return new TextEncoder().encode(jsonString);
    } catch (fallbackError) {
      console.error(`Even fallback encoding failed: ${fallbackError.message}`);

      // Ultimate fallback: return a minimal error response
      const minimalResponse = JSON.stringify({
        _status: "encoding_failed",
        _error: "Could not encode data",
        _original_error: error.message
      });

      return new TextEncoder().encode(minimalResponse);
    }
  }
}

// Create a zip archive containing site files and metadata
async function createSiteZip(site_id: string, siteData: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });

    const chunks: Buffer[] = [];
    archive.on('data', (chunk: Buffer) => chunks.push(chunk));
    archive.on('end', () => resolve(Buffer.concat(chunks)));
    archive.on('error', reject);

    // Create a temporary directory structure in memory
    console.log(`Creating zip archive for site: ${site_id}`);

    try {
      // Create optimized metadata without content_tree to reduce size
      const metadata = {
        site: siteData.site,
        layouts: siteData.layouts.map(layout => ({
          id: layout.id,
          name: layout.name,
          url: layout.url,
          is_default_layout: layout.is_default_layout,
          // Exclude content_tree to reduce metadata size
        })),
        pages: siteData.pages.map(page => ({
          id: page.id,
          name: page.name,
          url: page.url,
          // Exclude content_tree to reduce metadata size
        })),
        components: siteData.comps.map(comp => ({
          id: comp.id,
          // Exclude content_tree to reduce metadata size
        })),
        created_at: new Date().toISOString(),
        site_id: site_id,
        optimization: {
          content_tree_removed: true,
          reason: "Reduce metadata file size from 635MB to manageable size",
          original_pages: siteData.pages.length,
          original_components: siteData.comps.length,
          original_layouts: siteData.layouts.length
        }
      };

      archive.append(JSON.stringify(metadata, null, 2), { name: 'metadata.json' });

      // Add separate content tree files to keep metadata small
      console.log(`Adding content tree files...`);

      // Add layout content trees
      if (siteData.layouts && siteData.layouts.length > 0) {
        const layoutContents = {};
        for (const layout of siteData.layouts) {
          if (layout.content_tree) {
            layoutContents[layout.id] = layout.content_tree;
          }
        }
        archive.append(JSON.stringify(layoutContents), { name: 'content/layout-content-trees.json' });
      }

      // Add page content trees
      if (siteData.pages && siteData.pages.length > 0) {
        const pageContents = {};
        for (const page of siteData.pages) {
          if (page.content_tree) {
            pageContents[page.id] = page.content_tree;
          }
        }
        archive.append(JSON.stringify(pageContents), { name: 'content/page-content-trees.json' });
      }

      // Add component content trees
      if (siteData.comps && siteData.comps.length > 0) {
        const componentContents = {};
        for (const comp of siteData.comps) {
          if (comp.content_tree) {
            componentContents[comp.id] = comp.content_tree;
          }
        }
        archive.append(JSON.stringify(componentContents), { name: 'content/component-content-trees.json' });
      }

      // Add public files
      if (siteData.public) {
        console.log(`Adding ${Object.keys(siteData.public).length} public files...`);
        for (const [filePath, content] of Object.entries(siteData.public)) {
          if (typeof content === 'string') {
            archive.append(content, { name: `public/${filePath}` });
          } else {
            archive.append(Buffer.from(content), { name: `public/${filePath}` });
          }
        }
      }

      // Add server build files
      if (siteData.code?.server) {
        console.log(`Adding ${Object.keys(siteData.code.server).length} server files...`);
        for (const [filePath, content] of Object.entries(siteData.code.server)) {
          if (typeof content === 'string') {
            archive.append(content, { name: `server/${filePath}` });
          } else {
            archive.append(Buffer.from(content), { name: `server/${filePath}` });
          }
        }
      }

      // Add site build files (now unlimited)
      if (siteData.code?.site) {
        const siteFiles = Object.entries(siteData.code.site);
        console.log(`Adding ${siteFiles.length} site files...`);
        for (const [filePath, content] of siteFiles) {
          if (typeof content === 'string') {
            archive.append(content, { name: `site/${filePath}` });
          } else {
            archive.append(Buffer.from(content), { name: `site/${filePath}` });
          }
        }

        // Add a file listing all included files
        const fileListing = {
          included: siteFiles.length,
          total: siteFiles.length,
          skipped: 0,
          files: siteFiles.map(([path]) => path)
        };
        archive.append(JSON.stringify(fileListing, null, 2), { name: 'site-files.json' });
      }

      // Add core files
      if (siteData.code?.core) {
        console.log(`Adding ${Object.keys(siteData.code.core).length} core files...`);
        for (const [filePath, content] of Object.entries(siteData.code.core)) {
          if (typeof content === 'string') {
            archive.append(content, { name: `core/${filePath}` });
          } else {
            archive.append(Buffer.from(content), { name: `core/${filePath}` });
          }
        }
      }

      archive.finalize();
    } catch (error) {
      reject(error);
    }
  });
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

        const MAX_FILES = 1000; // Limit number of files
        const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB per file

        for (const [fileName, fileContent] of Object.entries(fileData || {})) {
          const contentSize = typeof fileContent === 'string' ? fileContent.length :
                             (fileContent && fileContent.byteLength ? fileContent.byteLength : 0);

          // Skip files that are too large or if we've hit the file count limit
          if (contentSize > MAX_FILE_SIZE || fileCount >= MAX_FILES) {
            console.warn(`Skipping file: ${fileName} (${fileCount >= MAX_FILES ? 'file count limit' : 'too large'})`);
            continue;
          }

          safeFileData[fileName] = fileContent;
          fileCount++;
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

    const zipPromise = (async () => {
      if (validate(site_id)) {
        console.log(`Starting zip creation for site: ${site_id}`);

        // Add timeout and memory protection
        const MAX_EXECUTION_TIME = 120000; // 2 minutes timeout
        const startTime = Date.now();

        const checkTimeout = () => {
          if (Date.now() - startTime > MAX_EXECUTION_TIME) {
            throw new Error(`Zip creation timeout after ${MAX_EXECUTION_TIME / 1000} seconds`);
          }
        };

        // Fetch all the site data with timeout checks
        checkTimeout();
        const result: any = {};

        result.layouts = await _db.page.findMany({
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
        });

        checkTimeout();
        result.pages = await _db.page.findMany({
          where: {
            id_site: site_id,
            is_deleted: false,
            name: { not: { startsWith: "layout:" } },
          },
          select: { id: true, name: true, url: true, content_tree: true },
        });

        checkTimeout();
        result.comps = await _db.component.findMany({
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
        });

        checkTimeout();
        result.public = readDirectoryRecursively(
          "binary",
          code.path(site_id, "site", "src", "public")
        );

        checkTimeout();
        result.site = await _db.site.findFirst({
          where: { id: site_id },
          select: {
            id: true,
            name: true,
            config: true,
            responsive: true,
            domain: true,
          },
        });

        checkTimeout();
        result.code = {
          server: readDirectoryRecursively(
            "binary",
            code.path(site_id, "server", "build")
          ),
          site: readDirectoryRecursively(
            "binary",
            code.path(site_id, "site", "build")
          ),
          core: readDirectoryRecursively("binary", dir.path(`/app/srv/core`)),
        };

        // Create the zip file with timeout protection
        console.log(`Creating zip archive with ${Object.keys(result.public || {}).length} public files`);
        checkTimeout();
        const zipBuffer = await createSiteZip(site_id, result);

        console.log(`Zip created successfully: ${zipBuffer.length} bytes`);

        // Return the zip file with appropriate headers
        return new Response(zipBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'application/zip',
            'Content-Disposition': `attachment; filename="site-${site_id}-${Date.now()}.zip"`,
            'Cache-Control': 'no-cache',
          },
        });
      }
      return new Response("NOT FOUND", { status: 403 });
    })();

    try {
      const result = await zipPromise;
      return result;
    } catch (e: any) {
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
