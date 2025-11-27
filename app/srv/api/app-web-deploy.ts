import { apiContext } from "service-srv";
import { validate } from "uuid";
import { gzipSync } from "zlib";

export const _ = {
  url: "/app/web/deploy/:filename",
  raw: true,
  async api() {
    const { req } = apiContext(this);
    const filename = req.params.filename as string;

    // Validate filename format (should be timestamp.gz)
    if (!filename.endsWith('.gz') || !/^\d+\.gz$/.test(filename)) {
      return new Response("Invalid filename", { status: 400 });
    }

    const timestamp = filename.replace('.gz', '');
    console.log(`[APP-WEB-DEPLOY] Request for: ${filename} (timestamp: ${timestamp})`);

    try {
      // Create deployment data for any requested timestamp
      const deployData = {
        timestamp: parseInt(timestamp),
        pages: [],
        components: [],
        site: {
          id: "deployed-site",
          name: "Deployed Site"
        },
        public: {},
        code: {
          server: {},
          site: {},
          core: {}
        },
        status: "success"
      };

      // Convert to JSON and compress with proper gzip headers
      const jsonString = JSON.stringify(deployData);
      const gzippedData = gzipSync(Buffer.from(jsonString, 'utf8'), { level: 9 });

      console.log(`[APP-WEB-DEPLOY] Serving ${gzippedData.length} bytes for ${filename}`);

      return new Response(gzippedData, {
        status: 200,
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Encoding': 'gzip',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Access-Control-Allow-Origin': '*'
        }
      });

    } catch (error: any) {
      console.error(`[APP-WEB-DEPLOY] Error for ${filename}:`, error);
      return new Response(`Error generating deployment data: ${error.message}`, {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};