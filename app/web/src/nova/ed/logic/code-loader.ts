import { PG } from "./ed-global";

export const loadCode = async (p: PG, ts?: number) => {
  const id_site = p.site.id;
  const url = `/prod/${id_site}/_prasi/code/index.js?ts=${ts}`;
  const fn = new Function(
    "callback",
    `
import("${url}")
  .catch((e) => console.error("Failed to load site code\\n\\n", e))
  .then(callback)`
  );
  try {
    Promise.all([
      fetch(`/prod/${id_site}/_prasi/typings.d.ts`)
        .catch(() => {})
        .then(async (res) => {
          if (res) {
            p.site_dts = await res.text();
            p.render();
          }
        }),
      fetch(`/prod/${id_site}/_prasi/type_def`)
        .catch(() => {})
        .then(async (res) => {
          if (res) {
            p.site_dts_entry = await res.json();
            p.render();
          }
        }),
      new Promise<any>((resolve) => {
        try {
          fn((exports: any) => {
            const w = window as any;
            for (const [k, v] of Object.entries(exports)) {
              w[k] = v;
              p.site_exports[k] = v;
            }
            resolve(exports);
          });
        } catch (e) {
          console.log("Failed to load site code", e);
        }
      }),
    ]);
  } catch (e) {
    console.log("Failed to load site code", e);
  }

  return {};
};
