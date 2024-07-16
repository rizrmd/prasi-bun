import { apiProxy } from "../../../base/load/api/api-proxy";
import { loadApiProxyDef } from "../../../base/load/api/api-proxy-def";
import { dbProxy } from "../../../base/load/db/db-proxy";
import importModule from "../../ed/panel/side/style/tools/dynamic-import";
import { VG } from "../render/global";
import { viScriptArg } from "../render/script/arg";

export const viLoadLegacy = async (vi: {
  mode: VG["mode"];
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

  const site = await _db.site.findFirst({
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

    let api_url = vi.site.api_url;
    if (!api_url) api_url = ((site.config as any) || {}).api_url || "";
    if (!api_url) return;

    try {
      const apiURL = new URL(api_url);
      if (api_url && apiURL.hostname) {
        try {
          await loadApiProxyDef(api_url, true);
        } catch (e) {
          console.error("Failed to load API [Legacy]:", api_url);
        }
      }
    } catch (e) {}

    const path = `/npm/site/${vi.site.id}/site.js`;
    await importModule(path);
    if (!vi.site.db.get()) {
      vi.site.db.set(dbProxy(api_url));
    }

    if (!vi.site.api.get()) {
      vi.site.api.set(apiProxy(api_url));
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
        ...viScriptArg({ site: vi.site, mode: vi.mode }),
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
