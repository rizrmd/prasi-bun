import { format } from "date-fns";
import { PG } from "./ed-global";

export const loadFrontEnd = async (p: PG, ts?: number) => {
  
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
    await new Promise<any>((resolve) => {
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
    });
  } catch (e) {}
};
export const loadTypings = async (p: PG) => {
  const id_site = p.site.id;
  await Promise.all([
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
    fetch(`/prod/${id_site}/_prasi/prisma.ext`)
      .catch(() => {})
      .then(async (res) => {
        if (res) {
          p.prisma_ext = (await res.text()).replace("./prisma", "ts:prisma");
          p.render();
        }
      }),
  ]);
};

export const loadCode = async (p: PG, ts?: number) => {
  try {
    await Promise.all([loadTypings(p), loadFrontEnd(p, ts)]);
  } catch (e) {
    console.log("Failed to load site code", e);
  }
};
