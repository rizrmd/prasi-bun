import { createAPI } from "../../../utils/script/init-api";
import { VG } from "../render/global";
import { viLoadOld } from "./load-old";

const w = window as any;

export const viLoad = (vi: VG, arg: { site_id: string; api_url: string }) => {
  vi.site.id = arg.site_id;
  vi.site.api_url = arg.api_url;

  if (!w.exports) {
    w.exports = {};
  }
  viLoadOld(vi).then(() => {
    vi.status = "ready";
    vi.render();
  });
};
