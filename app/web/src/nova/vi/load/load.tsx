import { VG } from "../render/global";

export const viLoad = (vi: VG, arg: { site_id: string; api_url: string }) => {
  vi.status = "loading";
  if (vi.on_status_changes) {
    vi.on_status_changes(vi.status);
  }
  vi.site.id = arg.site_id;
  vi.site.api_url = arg.api_url;

  vi.status = "ready";
  if (vi.on_status_changes) {
    vi.on_status_changes(vi.status);
  }
};
