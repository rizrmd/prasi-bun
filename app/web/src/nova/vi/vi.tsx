import { FC, Suspense, useEffect } from "react";
import { useGlobal } from "web-utils";
import { IMeta } from "../ed/logic/ed-global";
import { viLoad } from "./load/load";
import { VG, ViGlobal } from "./render/global";
import { render_stat } from "./render/render";
import { nav } from "./render/script/extract-nav";
import { ViRoot } from "./root";
import { ErrorBox } from "./utils/error-box";

const w = window as any;
export const Vi: FC<{
  meta: Record<string, IMeta>;
  mode: "mobile" | "desktop";
  comp_load?: (comp_id: string) => Promise<void>;
  entry: string[];
  api_url: string;
  site_id: string;
  page_id: string;
  api?: any;
  db?: any;
  layout?: VG["layout"];
  script?: { init_local_effect: Record<string, boolean> };
  visit?: VG["visit"];
  render_stat?: "enabled" | "disabled";
  on_status_changed?: (status: VG["status"]) => void;
  on_nav_loaded?: (arg: { urls: string[] }) => Promise<void>;
}> = ({
  meta,
  entry,
  api_url,
  site_id,
  api,
  mode,
  db,
  visit,
  script,
  page_id,
  render_stat: rs,
  on_status_changed,
  on_nav_loaded,
  layout,
}) => {
  const vi = useGlobal(ViGlobal, "VI");
  vi.mode = mode;
  vi.entry = entry;
  vi.on_nav_loaded = on_nav_loaded;

  w.isMobile = mode === "mobile";
  w.isDesktop = mode === "desktop";
  w.preload = (_urls: string | string[]) => {
    if (!vi.page.navs[page_id]) vi.page.navs[page_id] = new Set();
    const urls = typeof _urls === "string" ? [_urls] : _urls;
    for (const url of urls) {
      vi.page.navs[page_id].add(url);
    }
    clearTimeout(nav.timeout);
    nav.timeout = setTimeout(() => {
      if (vi.on_nav_loaded) {
        vi.on_nav_loaded({
          urls: Array.from(vi.page.navs[page_id]),
        });
      }
    }, 100);

    return "";
  };

  vi.layout = layout;
  vi.page.cur.id = page_id;
  vi.on_status_changes = on_status_changed;

  if (rs === "disabled") {
    render_stat.enabled = false;
  }

  if (vi.meta !== meta) {
    vi.meta = meta;
  }
  if (script) {
    vi.script.init_local_effect = script.init_local_effect;
  }
  vi.visit = visit;

  if (vi.status === "init") {
    vi.site.db = db;
    vi.site.api = api;
    viLoad(vi, { api_url, site_id });
  }

  if (on_nav_loaded) {
    useEffect(() => {
      setTimeout(() => {
        const nav = vi.page.navs[vi.page.cur.id];
        if (nav) {
          on_nav_loaded({
            urls: Array.from(nav),
          });
        }
      }, 500);
    }, [vi.page.cur.id]);
  }

  return (
    <ErrorBox>
      <Suspense>
        <ViRoot />
      </Suspense>
    </ErrorBox>
  );
};
