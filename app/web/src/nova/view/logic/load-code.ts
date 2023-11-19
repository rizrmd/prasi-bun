import { VG } from "./global";

export const vLoadCode = async (v: VG) => {
  if (v.mode === "load-code") {
    v.mode = "loading-code";

    const { site_id, page_id } = v.current;
    const w = window as any;
    const promises = [
      new Promise<void>(async (resolve) => {
        const module = await importCJS(`/nova-load/site/${site_id}/index.js`);
        for (const [k, v] of Object.entries(module)) {
          w[k] = v;
        }
        resolve();
      }),
    ];

    const code_ids = await api.nova_load("page", page_id);
    for (const id of code_ids) {
      promises.push(
        new Promise<void>(async (resolve) => {
          const module = await importCJS(`/nova-load/code/${id}/index.js`);
          for (const [k, v] of Object.entries(module)) {
            w[k] = v;
          }
          resolve();
        })
      );
    }

    await Promise.all(promises);

    v.mode = "rebuild";
    v.render();
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
