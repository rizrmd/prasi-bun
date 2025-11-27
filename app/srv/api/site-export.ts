import { apiContext } from "service-srv";
import { validate } from "uuid";
import { existsAsync, readAsync } from "fs-jetpack";
import { dir } from "dir";
import { code } from "../ws/sync/code/code";
import archiver from 'archiver';

export const _ = {
  url: "/site-export/:site_id",
  async api(site_id: string) {
    const { req, res } = apiContext(this);

    // Validate site ID
    if (!validate(site_id)) {
      return new Response("Invalid site ID", {
        status: 400,
        headers: { "Content-Type": "text/plain" }
      });
    }

    console.log(`[EXPORT] Starting export for site ${site_id}`);

    try {
      // Check if site exists
      const site = await _db.site.findFirst({
        where: { id: site_id },
        select: { id: true, name: true }
      });

      if (!site) {
        return new Response("Site not found", {
          status: 404,
          headers: { "Content-Type": "text/plain" }
        });
      }

      // Check if build exists
      const buildPath = code.path(site_id, "site", "build");
      const buildExists = await existsAsync(buildPath);

      if (!buildExists) {
        return new Response("Site build not found. Please build the site first.", {
          status: 400,
          headers: { "Content-Type": "text/plain" }
        });
      }

      // Create a zip archive containing the site files
      const zipBuffer = await createSiteExportZip(site_id, site.name);

      console.log(`[EXPORT] Export completed for site ${site_id}: ${zipBuffer.length} bytes`);

      // Return the zip file with appropriate headers
      return new Response(zipBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="site-${site.name}-${site_id}-${Date.now()}.zip"`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

    } catch (error: any) {
      console.error(`[EXPORT] Export failed for site ${site_id}:`, error);
      return new Response(`Export failed: ${error.message}`, {
        status: 500,
        headers: { "Content-Type": "text/plain" }
      });
    }
  }
};

// Helper function to create site export zip
async function createSiteExportZip(site_id: string, site_name: string): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });

    const chunks: Buffer[] = [];
    archive.on('data', (chunk: Buffer) => chunks.push(chunk));
    archive.on('end', () => resolve(Buffer.concat(chunks)));
    archive.on('error', reject);

    console.log(`[EXPORT] Creating export archive for site: ${site_name} (${site_id})`);

    try {
      // Add site build files
      const siteBuildPath = code.path(site_id, "site", "build");
      if (await existsAsync(siteBuildPath)) {
        console.log(`[EXPORT] Adding site build files...`);
        archive.directory(siteBuildPath, 'site');
      }

      // Add server build files if they exist
      const serverBuildPath = code.path(site_id, "server", "build");
      if (await existsAsync(serverBuildPath)) {
        console.log(`[EXPORT] Adding server build files...`);
        archive.directory(serverBuildPath, 'server');
      }

      // Add public files if they exist
      const publicPath = code.path(site_id, "site", "src", "public");
      if (await existsAsync(publicPath)) {
        console.log(`[EXPORT] Adding public files...`);
        archive.directory(publicPath, 'public');
      }

      // Add metadata file
      const metadata = {
        site_id,
        site_name,
        export_date: new Date().toISOString(),
        version: "1.0",
        description: `Exported site: ${site_name} (${site_id})`
      };

      archive.append(JSON.stringify(metadata, null, 2), { name: 'export-info.json' });

      // Add README file
      const readme = `# Site Export: ${site_name}

This zip file contains the complete export of your Prasi website.

## Contents:

- **site/**: Built frontend files ready for deployment
- **server/**: Backend server files (if applicable)
- **public/**: Static assets and public files
- **export-info.json**: Export metadata and information

## Deployment:

You can deploy this site using:
1. The site build files in the 'site/' directory
2. Upload to any static hosting service
3. Use the server files if you have custom backend logic

Export Date: ${new Date().toISOString()}
Site ID: ${site_id}
Site Name: ${site_name}
`;

      archive.append(readme, { name: 'README.md' });

      archive.finalize();

    } catch (error) {
      reject(error);
    }
  });
}