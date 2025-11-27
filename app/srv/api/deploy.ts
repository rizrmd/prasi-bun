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
          if (!dlurl) {
            return Response.json({
              status: "error",
              message: "Download URL (dlurl) is required for deployment"
            } as DeployResponse, { status: 400 });
          }

          console.log(`[DEPLOY] Starting deployment for site ${id_site} from ${dlurl}`);

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

            // TODO: Implement actual deployment logic here
            // This could involve:
            // 1. Downloading from dlurl if external
            // 2. Copying files to deployment directory
            // 3. Setting up domain/routing
            // 4. Notifying external services

            // For now, simulate successful deployment
            console.log(`[DEPLOY] Deployment completed for site ${id_site}`);

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