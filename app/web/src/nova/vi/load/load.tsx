import { VG } from "../render/global";
import { viLoadLegacy } from "./load-legacy";

export const viLoad = (vi: VG, arg: { site_id: string; api_url: string }) => {
  vi.status = "loading";
  if (vi.on_status_changes) {
    vi.on_status_changes(vi.status);
  }
  vi.site.id = arg.site_id;
  vi.site.api_url = arg.api_url;

  if (!vi.site.api && !vi.site.db) {
    vi.status = "ready";
    if (vi.on_status_changes) {
      vi.on_status_changes(vi.status);
    }
  }
};
