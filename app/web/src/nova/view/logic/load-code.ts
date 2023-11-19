import { VG } from "./global";

export const codeLoaded = new Set<string>();
const codeMap = {
  page: {} as Record<string, string[]>,
  compGroup: {} as Record<string, string[]>,
};
export const vLoadCode = async (v: VG, forceLoad?: boolean) => {
  if (forceLoad) {
    codeLoaded.clear();
    v.mode = "load-code";
    v.render();
  }

  if (v.mode === "load-code") {
    v.mode = "loading-code";

    const { site_id, page_id } = v.current;
    const w = window as any;
    const promises = [
      new Promise<void>(async (resolve) => {
        if (!codeLoaded.has(site_id)) {
          codeLoaded.add(site_id);
          const module = await importCJS(`/nova-load/site/${site_id}/index.js`);
          for (const [k, v] of Object.entries(module)) {
            w[k] = v;
          }
        }
        resolve();
      }),
    ];
    const code_ids: string[] = [];
    const code = await db.code.findMany({
      where: { id_site: site_id, name: { notIn: ["site", "SSR"] } },
      select: { code_assign: true },
    });

    codeMap.compGroup = {};
    codeMap.page = {};
    for (const c of code) {
      c.code_assign.forEach((e) => {
        if (e.id_page) {
          if (!codeMap.page[e.id_page]) codeMap.page[e.id_page] = [];
          codeMap.page[e.id_page].push(e.id_code);
        }
        if (e.id_component_group) {
          if (!codeMap.compGroup[e.id_component_group])
            codeMap.compGroup[e.id_component_group] = [];
          codeMap.page[e.id_component_group].push(e.id_code);
        }
      });
    }

    if (codeMap.page[page_id]) {
      for (const id of codeMap.page[page_id]) {
        promises.push(
          new Promise<void>(async (resolve) => {
            if (!codeLoaded.has(id)) {
              codeLoaded.add(id);
              const module = await importCJS(`/nova-load/code/${id}/index.js`);
              for (const [k, v] of Object.entries(module)) {
                w[k] = v;
              }
            }
            resolve();
          })
        );
      }
    }

    await Promise.all(promises);

    v.mode = "rebuild";
    v.render();
  }
};

const loadCGroupCode = async (cgroup_id: string) => {
  if (codeMap.compGroup[cgroup_id]) {
    const promises = [];
    const w = window as any;
    for (const id of codeMap.compGroup[cgroup_id]) {
      promises.push(
        new Promise<void>(async (resolve) => {
          if (!codeLoaded.has(id)) {
            codeLoaded.add(id);
            const module = await importCJS(`/nova-load/code/${id}/index.js`);
            for (const [k, v] of Object.entries(module)) {
              w[k] = v;
            }
          }
          resolve();
        })
      );
    }
    await Promise.all(promises);
  }
};

const importCJS = async (url: string) => {
  const module = { exports: { __esModule: true as true | undefined } };
  const res = await fetch(url);

  const src = await res.text();
  if (src) {
    const fn = new Function("module", src);
    await fn(module);

    const result = { ...module.exports };
    if (result.__esModule) {
      delete result.__esModule;
    }

    return result;
  }

  return {};
};
