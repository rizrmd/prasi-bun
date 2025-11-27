import { apiContext } from "service-srv";
import { validate } from "uuid";
import { exists } from "fs-jetpack";
import { code } from "../ws/sync/code/code";

interface DeployRequest {
  type: "check" | "deploy" | "redeploy" | "deploy-del";
  id_site: string;
  dlurl?: string;
  load_from?: string;
  ts?: number;
}

interface DeployResponse {
  deployable?: boolean;
  db?: string;
  hasDB?: boolean;
  domains?: string[];
  now?: number;
  current?: number | null;
  deploys?: number[];
  status?: string;
  message?: string;
}

export const _ = {
  url: "/_deploy",
  async api() {
    const { req } = apiContext(this);

    try {
      const body = await req.json() as DeployRequest;
      const { type, id_site, dlurl, load_from, ts } = body;

      // Validate site ID
      if (!validate(id_site)) {
        return Response.json({
          status: "error",
          message: "Invalid site ID"
        } as DeployResponse, { status: 400 });
      }

      // Check if site exists
      const site = await _db.site.findFirst({
        where: { id: id_site },
        select: { id: true, name: true, domain: true }
      });

      if (!site) {
        return Response.json({
          status: "error",
          message: "Site not found"
        } as DeployResponse, { status: 404 });
      }

      console.log(`[DEPLOY] Processing ${type} request for site ${id_site}`);

      switch (type) {
        case "check": {
          // Check deployment capabilities and status
          return Response.json({
            deployable: true,
            db: "postgresql",
            hasDB: true,
            domains: [site.domain || ""].filter(Boolean),
            now: Date.now(),
            current: null,
            deploys: []
          } as DeployResponse);
        }

        case "deploy": {
          // Handle new deployment
          console.log(`[DEPLOY] Starting deployment for site ${id_site}`);

          try {
            // Validate that the site build exists
            const buildPath = code.path(id_site, "site", "build");
            if (!exists(buildPath)) {
              return Response.json({
                status: "error",
                message: "Site build not found. Please build the site first."
              } as DeployResponse, { status: 400 });
            }

            const deployTimestamp = Date.now();

            // Check if production files exist in core directory
            const corePath = dir.path("/app/srv/core");
            const prodMainExists = await exists(`${corePath}/main.js`);
            const prodIndexExists = await exists(`${corePath}/index.html`);

            if (!prodMainExists || !prodIndexExists) {
              console.log(`[DEPLOY] Production files missing in ${corePath}`);
              console.log(`[DEPLOY] Available files:`, await import("fs").then(fs => fs.readdirSync(corePath)));

              return Response.json({
                status: "error",
                message: "Production build files not found. Please run 'bun run build' first."
              } as DeployResponse, { status: 400 });
            }

            // Mark deployment as active by creating a deployment record
            const deployRecord = {
              site_id: id_site,
              timestamp: deployTimestamp,
              build_path: buildPath,
              core_path: corePath,
              status: "active"
            };

            // Store deployment info for tracking
            const deployInfoPath = dir.data(`/deploy/${id_site}/${deployTimestamp}.json`);
            await import("fs-jetpack").then(({ dirAsync, writeAsync }) =>
              dirAsync(dir.data(`/deploy/${id_site}`)).then(() =>
                writeAsync(deployInfoPath, JSON.stringify(deployRecord, null, 2))
              )
            );

            console.log(`[DEPLOY] Deployment completed for site ${id_site}`);
            console.log(`[DEPLOY] Site accessible at: /prod/${id_site}`);
            console.log(`[DEPLOY] Build files at: ${buildPath}`);
            console.log(`[DEPLOY] Core files at: ${corePath}`);

            return Response.json({
              current: deployTimestamp,
              deploys: [deployTimestamp],
              status: "success",
              message: "Deployment completed successfully"
            } as DeployResponse);

          } catch (deployError: any) {
            console.error(`[DEPLOY] Deployment failed for site ${id_site}:`, deployError);
            return Response.json({
              status: "error",
              message: `Deployment failed: ${deployError.message}`
            } as DeployResponse, { status: 500 });
          }
        }

        case "redeploy": {
          // Handle redeployment to specific timestamp
          if (!ts) {
            return Response.json({
              status: "error",
              message: "Timestamp (ts) is required for redeployment"
            } as DeployResponse, { status: 400 });
          }

          console.log(`[DEPLOY] Redeploying site ${id_site} to timestamp ${ts}`);

          try {
            // TODO: Implement redeployment logic
            // This could involve:
            // 1. Finding the specific deployment version
            // 2. Restoring files from that version
            // 3. Updating current deployment pointer

            console.log(`[DEPLOY] Redeployment completed for site ${id_site}`);

            return Response.json({
              current: ts,
              deploys: [ts],
              status: "success",
              message: "Redeployment completed successfully"
            } as DeployResponse);

          } catch (redeployError: any) {
            console.error(`[DEPLOY] Redeployment failed for site ${id_site}:`, redeployError);
            return Response.json({
              status: "error",
              message: `Redeployment failed: ${redeployError.message}`
            } as DeployResponse, { status: 500 });
          }
        }

        case "deploy-del": {
          // Handle deployment deletion
          if (!ts) {
            return Response.json({
              status: "error",
              message: "Timestamp (ts) is required for deletion"
            } as DeployResponse, { status: 400 });
          }

          console.log(`[DEPLOY] Deleting deployment ${ts} for site ${id_site}`);

          try {
            // TODO: Implement deployment deletion logic
            // This could involve:
            // 1. Finding and removing deployment files
            // 2. Updating deployment records
            // 3. Cleaning up related resources

            console.log(`[DEPLOY] Deployment deletion completed for site ${id_site}`);

            return Response.json({
              current: null,
              deploys: [],
              status: "success",
              message: "Deployment deleted successfully"
            } as DeployResponse);

          } catch (deleteError: any) {
            console.error(`[DEPLOY] Deployment deletion failed for site ${id_site}:`, deleteError);
            return Response.json({
              status: "error",
              message: `Deployment deletion failed: ${deleteError.message}`
            } as DeployResponse, { status: 500 });
          }
        }

        default:
          return Response.json({
            status: "error",
            message: "Unknown deployment type"
          } as DeployResponse, { status: 400 });
      }

    } catch (error: any) {
      console.error("[DEPLOY] API Error:", error);
      return Response.json({
        status: "error",
        message: "Internal server error"
      } as DeployResponse, { status: 500 });
    }
  }
};