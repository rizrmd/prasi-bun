import mp from "@surfy/multipart-parser";

import { writeAsync } from "fs-jetpack";
import { g } from "utils/global";
import { apiContext } from "../server/api/api-ctx";
import { dir } from "../utils/dir";
export const _ = {
  url: "/_upload",
  async api(body: any) {
    const { req } = apiContext(this);
    let url = "";

    const raw = await req.arrayBuffer();

    // Validate the ArrayBuffer before conversion to prevent corruption
    if (!raw || raw.byteLength === 0) {
      throw new Error("Empty or invalid file upload");
    }

    // Add size limit to prevent memory exhaustion
    const MAX_UPLOAD_SIZE = 100 * 1024 * 1024; // 100MB
    if (raw.byteLength > MAX_UPLOAD_SIZE) {
      throw new Error(`File too large: ${raw.byteLength} bytes > ${MAX_UPLOAD_SIZE} bytes`);
    }

    // Safely convert ArrayBuffer to Buffer
    let buffer: Buffer;
    try {
      buffer = Buffer.from(raw);
    } catch (error) {
      throw new Error(`Failed to convert upload data: ${error.message}`);
    }

    const parts = mp(buffer) as Record<
      string,
      { fileName: string; mime: string; type: string; buffer: Buffer }
    >;

    for (const [name, part] of Object.entries(parts)) {
      const d = new Date();
      const path = `${d.getFullYear()}-${d.getMonth()}/${d.getDate()}/${d.getTime()}-${part.fileName
        ?.replace(/[\W_]+/g, "-")
        .toLowerCase()}`; 

      url = `/_file/${path}`;
      await writeAsync(dir.data(`/upload/${path}`), part.buffer);
    }

    return url;
  },
};
function toArrayBuffer(buffer: Buffer) {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
}
