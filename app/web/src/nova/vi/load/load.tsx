import { VG } from "../render/global";
import { viLoadLegacy } from "./load-legacy";

export const viLoad = (vi: VG, arg: { site_id: string; api_url: string }) => {
  vi.status = "loading";
  vi.site.id = arg.site_id;
  vi.site.api_url = arg.api_url;

  if (!vi.site.api && !vi.site.db) {
    viLoadLegacy({
      site: {
        id: vi.site.id,
        api_url: vi.site.api_url,
        api: {
          get() {
            return vi.site.api;
          },
          set(val) {
            vi.site.api = val;
          },
        },
        db: {
          get() {
            return vi.site.db;
          },
          set(val) {
            vi.site.db = val;
          },
        },
      },
      render: vi.render,
    }).then(() => {
      vi.status = "ready";
      vi.render();
    });
  } else {
    vi.status = "ready";
  }
};
