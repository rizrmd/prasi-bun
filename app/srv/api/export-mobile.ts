import { ExportMobileConfig } from "../../web/src/render/editor/panel/toolbar/center/mobile/config";
import { exmobile } from "../util/export-mobile";

export const _ = {
  url: "/export-mobile/:site_id/:action",
  async api(
    site_id: string,
    action:
      | "config"
      | "set-config"
      | "build-android"
      | "remove-android"
      | "build-ios"
      | "remove-ios",
    config?: ExportMobileConfig
  ) {
    if (action === "config") {
      return await exmobile.config.read(site_id);
    } else if (action === "set-config") {
      if (config) {
        return await exmobile.config.write(site_id, config);
      }
    } else if (action === "build-android") {
      let result = await exmobile.config.modify(site_id, (conf) => ({
        ...conf,
        android: true,
      }));
      return result;
    } else if (action === "remove-android") {
      let result = await exmobile.config.modify(site_id, (conf) => ({
        ...conf,
        android: false,
      }));
      return result;
    } else if (action === "build-ios") {
      let result = await exmobile.config.modify(site_id, (conf) => ({
        ...conf,
        ios: true,
      }));
      return result;
    } else if (action === "remove-ios") {
      let result = await exmobile.config.modify(site_id, (conf) => ({
        ...conf,
        ios: false,
      }));
      return result;
    }

    return "This is export-mobile.ts";
  },
};
