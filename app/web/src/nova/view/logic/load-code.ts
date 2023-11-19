import { VG } from "./global";

export const codeLoaded = new Set<string>();
const codeMap = {
  page: {} as Record<string, string[]>,
  compGroup: {} as Record<string, string[]>,
  comp: {} as Record<string, string>,
};
export const vLoadCode = async (v: VG, forceLoad?: boolean) => {
  if (forceLoad) {
    codeLoaded.clear();
    v.status = "load-code";
    v.render();
  }

  if (v.status === "load-code") {
    v.status = "loading-code";

    const { site_id, page_id } = v.current;
    const w = window as any;

    if (!codeLoaded.has(site_id)) {
      codeLoaded.add(site_id);
      const module = await importCJS(`/nova-load/site/${site_id}/index.js`);
      for (const [k, v] of Object.entries(module)) {
        w[k] = v;
      }

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

      codeMap.comp = {};
      const comps = await db.component.findMany({
        where: { id_component_group: { in: Object.keys(codeMap.compGroup) } },
        select: { id: true, id_component_group: true },
      });
      for (const c of comps) {
        if (c.id && c.id_component_group) {
          codeMap.comp[c.id] = c.id_component_group;
        }
      }
    }

    const promises = [];
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

    v.status = "rebuild";
    v.render();
  }
};

export const loadCompCode = async (comp_id: string) => {
  const cgroup_id = codeMap.comp[comp_id];
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
  const res = await fetch(url);
  const src = await res.text();
  return evalCJS(src);
};

export const evalCJS = (src: string) => {
  if (src) {
    const module = { exports: { __esModule: true as true | undefined } };
    eval(`try {
        ${src}
      } catch(e) {
        console.error(e);
      }`);
    const result = { ...module.exports };
    if (result.__esModule) {
      delete result.__esModule;
    }
    return result;
  }
  return {};
};
