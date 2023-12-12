import { VG } from "../render/global";
import { viLoadLegacy } from "./load-legacy";

const w = window as any;

export const viLoad = (vi: VG, arg: { site_id: string; api_url: string }) => {
  vi.status = "loading";
  vi.site.id = arg.site_id;
  vi.site.api_url = arg.api_url;

  if (!w.exports) {
    w.exports = {};
  }

  viLoadLegacy(vi).then(() => {
    vi.status = "ready";
    vi.render();
  });
};
