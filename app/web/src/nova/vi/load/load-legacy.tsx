import importModule from "../../../render/editor/tools/dynamic-import";
import { createAPI, createDB, initApi } from "../../../utils/script/init-api";

export const viLoadLegacy = async (vi: {
  site: {
    id: string;
    api_url: string;
    api: {
      get: () => any;
      set: (val: any) => void;
    };
    db: {
      get: () => any;
      set: (val: any) => void;
    };
  };
  render: any;
}) => {
  const w = window as any;

  if (!w.exports) {
    w.exports = {};
  }

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
    if (!vi.site.db.get()) {
      vi.site.db.set(createDB(vi.site.api_url));
    }
    if (!vi.site.api.get()) {
      vi.site.api.set(createAPI(vi.site.api_url));
    }

    const w = window as any;
    if (site.js_compiled) {
      const config = site.config as any;
      const exec = (fn: string, scopes: any) => {
        if (config.api_url && !scopes["api"]) {
          scopes["api"] = vi.site.api.get();
          scopes["db"] = vi.site.db.get();
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
