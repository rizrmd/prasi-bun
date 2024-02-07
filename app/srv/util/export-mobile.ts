import { dir } from "dir";
import { g } from "utils/global";
import { writeAsync, dirAsync } from "fs-jetpack";
import { ExportMobileConfig } from "../../web/src/render/editor/panel/toolbar/center/mobile/config";

const mpath = (site_id: string, path?: string) =>
  dir.data(`/mobile/${site_id}/${path || ""}`);

export const exmobile = {
  config: {
    async modify(
      site_id: string,
      fn: (config: ExportMobileConfig) => ExportMobileConfig
    ) {
      const conf = await this.read(site_id);
      let result = fn(conf);
      this.write(site_id, result);
      return result;
    },
    write: async (site_id: string, config: ExportMobileConfig) => {
      const path = mpath(site_id, "config.json");
      await dirAsync(mpath(site_id));
      await writeAsync(path, config);
    },
    read: async (site_id: string) => {
      const path = mpath(site_id, "config.json");
      if (await Bun.file(path).exists()) {
        return await Bun.file(path).json();
      }

      return null;
    },
  },
};
