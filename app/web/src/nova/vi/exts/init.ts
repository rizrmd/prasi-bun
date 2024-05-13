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

    if (window.parent) {
      const send = (msg: { type: "ready" }) => {
        window.parent.postMessage({ mobile: true, ...msg }, "*");
      };
      window.addEventListener("message", async ({ data: raw }) => {
        if (typeof raw === "object" && raw.mobile) {
          console.log(raw);
        }
      });
      send({ type: "ready" });
    }
    // await initExtNotif(vi, pe);
    pe.status = "ready";
  }
};
