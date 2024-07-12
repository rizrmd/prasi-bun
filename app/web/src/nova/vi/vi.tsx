import { FC, Suspense, useEffect } from "react";
import { useGlobal } from "web-utils";
import { IMeta } from "../ed/logic/ed-global";
import { viLoad } from "./load/load";
import { VG, ViGlobal } from "./render/global";
import { render_stat } from "./render/render";
import { nav } from "./render/script/extract-nav";
import { ViRoot } from "./root";
import { ErrorBox } from "./utils/error-box";
import { IItem } from "../../utils/types/item";

type PRELOAD = Exclude<VG["on_preload"], undefined>;
type PRELOAD_ARGS = Parameters<PRELOAD>[0];

const w = window as any;

if (!w.prasi_internal) {
  w.prasi_internal = { page: { id: "" } };
}

export const Vi: FC<{
  meta: Record<string, IMeta>;
  mode: "mobile" | "desktop";
  comp_load: (comp_id: string) => Promise<IItem>;
  entry: string[];
  preloaded?: (url: string) => boolean;
  api_url: string;
  site_id: string;
  page_id: string;
  api?: any;
  db?: any;
  layout?: VG["layout"];
  script: { init_local_effect: Record<string, boolean> };
  visit?: VG["visit"];
  render_stat?: "enabled" | "disabled";
  on_status_changed?: (status: VG["status"]) => void;
  on_preload?: VG["on_preload"];
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
  preloaded,
  page_id,
  render_stat: rs,
  on_status_changed,
  on_preload,
  layout,
  comp_load,
}) => {
  const vi = useGlobal(ViGlobal, "VI");
  vi.mode = mode;
  vi.entry = entry;
  vi.on_preload = on_preload;
  vi.comp.load = comp_load;

  if (page_id) w.prasi_internal.page.id = page_id;

  w.siteurl = (pathname: string, forceOriginal?: boolean) => {
    if (pathname.startsWith("http://") || pathname.startsWith("https://"))
      return pathname;

    try {
      if (["prasi.avolut.com"].includes(location.hostname)) {
        if (vi.site.api_url) {
          if (!vi.site_url) {
            vi.site_url = new URL(vi.site.api_url);
          }
        }
      } else {
        if (!vi.site_url) {
          if (forceOriginal && vi.site.api_url) {
            vi.site_url = new URL(vi.site.api_url);
          } else {
            vi.site_url = new URL(location.href);
          }
          vi.site_url.pathname = "";
        }
      }
    } catch (e) {}

    if (vi.site_url) {
      const u = vi.site_url;
      let path = pathname;
      if (!path.startsWith("/")) {
        path = "/" + path;
      }
      if (w.prasiContext.siteUrl) {
        path = w.prasiContext.siteUrl(path);
      }

      return `${u.protocol}//${u.host}${path}`;
    }

    return pathname;
  };
  w.isMobile = mode === "mobile";
  w.isDesktop = mode === "desktop";
  w.preloaded =
    preloaded ||
    ((url: string) => {
      false;
    });
  w.preload = (_urls: PRELOAD_ARGS["urls"], opt: PRELOAD_ARGS["opt"]) => {
    if (vi.on_preload) {
      return new Promise<void>((done) => {
        if (!vi.page.navs[page_id]) vi.page.navs[page_id] = new Set();
        const navs = vi.page.navs[page_id];
        const urls = typeof _urls === "string" ? [_urls] : _urls;
        let all_done = true;
        for (const url of urls) {
          if (!navs.has(url)) {
            navs.add(url);
            all_done = false;
          }
        }
        if (!all_done) {
          vi.page.preload.push(done);
          vi.on_preload?.({
            urls: Array.from(vi.page.navs[page_id]),
            opt: {
              on_load: (...arg) => {
                opt?.on_load?.(...arg);
                for (const done of vi.page.preload) {
                  done();
                }
                vi.page.preload = [];
                vi.render();
              },
            },
          });
        } else {
          done();
        }
      });
    }
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

  if (on_preload) {
    useEffect(() => {
      setTimeout(() => {
        const nav = vi.page.navs[vi.page.cur.id];
        if (nav) {
          on_preload({
            urls: Array.from(nav),
            opt: {
              on_load(pages) {},
            },
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
