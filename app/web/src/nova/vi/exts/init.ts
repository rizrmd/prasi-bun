import { VG } from "../render/global";
import { initExtNotif } from "./notif";
import { prasi_ext } from "./types";

export const initExts = async (vi: VG) => {
  let pe = prasi_ext[vi.site.id];

  if (!pe) {
    prasi_ext[vi.site.id] = {
      status: "init",
    };
    pe = prasi_ext[vi.site.id];
  }

  if (pe.status === "init") {
    pe.status = "loading";

    if (window.parent !== window) {
      const send = (msg: { type: "ready" }) => {
        window.parent.postMessage({ mobile: true, ...msg }, "*");
      };
      window.addEventListener("message", async ({ data: raw }) => {
        console.log(raw);
        if (typeof raw === "object" && raw.mobile) {
        }
      });
      send({ type: "ready" });
    }
    await initExtNotif(vi, pe);
    pe.status = "ready";
  }
};
