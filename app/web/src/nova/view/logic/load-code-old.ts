import importModule from "../../../render/editor/tools/dynamic-import";
import { devLoader } from "../../../render/live/dev-loader";
import { createAPI, createDB, initApi } from "../../../utils/script/init-api";
import { VG } from "./global";

export const oldLoadCode = async (v: VG) => {
  const site = await db.site.findFirst({
    where: { id: v.current.site_id },
    include: { component_site: true },
  });

  const loader = devLoader;
  const p = {} as any;
  if (site) {
    const w = window as any;
    if (!w.exports) w.exports = {};

    if (site.component_site) {
      for (const cg of site.component_site) {
        await importModule(loader.npm(p, "site", cg.id_component_group));
      }
    }

    await initApi(site.config);
    await importModule(loader.npm(p, "site", site.id));
    if (site.js_compiled) {
      const config = site.config as any;
      const exec = (fn: string, scopes: any) => {
        if (config.api_url && !scopes["api"]) {
          scopes["api"] = createAPI(config.api_url);
          scopes["db"] = createDB(config.api_url);
        }
        scopes.params = w.params;
        scopes.module = {};
        const f = new Function(...Object.keys(scopes), fn);
        const res = f(...Object.values(scopes));
        return res;
      };
      const scope = {
        types: {},
        exports: w.exports,
        load: importModule,
        render: p.render,
        module: {
          exports: {} as any,
        },
      };
      await exec(site.js_compiled, scope);
      if (scope.module.exports) {
        for (const [k, v] of Object.entries(scope.module.exports)) {
          w.exports[k] = v;
        }
      }
    }
  }

  v.status = "rebuild";
  v.render();
};
