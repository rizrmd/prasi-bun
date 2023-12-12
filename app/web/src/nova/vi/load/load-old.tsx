import importModule from "../../../render/editor/tools/dynamic-import";
import { createAPI, createDB, initApi } from "../../../utils/script/init-api";
import { VG } from "../render/global";

export const viLoadOld = async (vi: VG) => {
  const site = await db.site.findFirst({
    where: { id: vi.site.id },
    include: { component_site: true },
  });

  if (site) {
    if (site.component_site) {
      for (const cg of site.component_site) {
        const path = `/npm/site/${cg.id_site}/site.js`;
        await importModule(path);
      }
    }

    await initApi(site.config);

    const path = `/npm/site/${vi.site.id}/site.js`;
    await importModule(path);
    vi.site.db = createDB(vi.site.api_url);
    vi.site.api = createAPI(vi.site.api_url);

    const w = window as any;
    if (site.js_compiled) {
      const config = site.config as any;
      const exec = (fn: string, scopes: any) => {
        if (config.api_url && !scopes["api"]) {
          scopes["api"] = vi.site.api;
          scopes["db"] = vi.site.db;
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
        render: vi.render,
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
};
