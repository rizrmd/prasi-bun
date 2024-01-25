import { useGlobal } from "web-utils";
import { Loading } from "../../utils/ui/loading";
import { EDGlobal, PG, active } from "../ed/logic/ed-global";
import { reloadPage } from "../ed/logic/ed-route";
import { loadSite } from "../ed/logic/ed-site";
import { Vi } from "./vi";
import init from "wasm-gzip";
import { w } from "../../utils/types/general";

export const ViPreview = (arg: { pathname: string }) => {
  const p = useGlobal(EDGlobal, "EDITOR");

  w.navigateOverride = (_href) => {
    if (_href && _href.startsWith("/")) {
      if (w.basepath.length > 1) {
        _href = `${w.basepath}${_href}`;
      }
      if (
        location.hostname === "prasi.app" ||
        location.hostname === "prasi.avolut.com" ||
        location.hostname.includes("ngrok") ||
        location.hostname === "localhost" ||
        location.hostname === "127.0.0.1" ||
        location.hostname === "10.0.2.2" // android localhost
      ) {
        if (location.pathname.startsWith("/vi") && !_href.startsWith("/vi")) {
          const patharr = location.pathname.split("/");
          _href = `/vi/${patharr[2]}${_href}`;
        }
      }
    }
    return _href;
  };

  viRoute(p);

  if (p.status !== "ready") {
    if (p.preview.show_loading) {
      return <Loading note={p.status + "-page"} />;
    } else {
      setTimeout(() => {
        p.preview.show_loading = true;
        p.render();
      }, 5000);

      return null;
    }
  }

  const mode = p.mode;

  return (
    <div className={cx("relative flex flex-1 items-center justify-center")}>
      <div
        className={cx(
          "absolute flex flex-col items-stretch flex-1 bg-white ",
          mode === "mobile"
            ? css`
                @media (min-width: 768px) {
                  border-left: 1px solid #ccc;
                  border-right: 1px solid #ccc;
                  width: 375px;
                  top: 0px;
                  overflow-x: hidden;
                  overflow-y: auto;
                  bottom: 0px;
                }
                @media (max-width: 767px) {
                  left: 0px;
                  right: 0px;
                  top: 0px;
                  bottom: 0px;
                  overflow-y: auto;
                }
              `
            : "inset-0 overflow-auto",

          css`
            contain: content;
          `
        )}
      >
        <Vi
          meta={p.page.meta}
          mode={p.mode}
          api_url={p.site.config.api_url}
          site_id={p.site.id}
          page_id={p.page.cur.id}
          entry={p.page.entry}
          api={p.script.api}
          db={p.script.db}
          render_stat="disabled"
          script={{ init_local_effect: p.script.init_local_effect }}
        />
      </div>
    </div>
  );
};

const viRoute = async (p: PG) => {
  if (p.status === "ready" || p.status === "init") {
    if (p.status === "init") {
      await init();
    }

    if (!p.site.domain && !p.site.name) {
      p.status = "load-site";
      const site = await p.sync.site.load(p.site.id);
      if (!site) {
        p.status = "site-not-found";
        p.render();
        return;
      }

      await loadSite(p, site, "from-route");
    }

    if (
      p.page.cur.id !== params.page_id ||
      !p.page.cur.snapshot ||
      !p.page.list[p.page.cur.id]
    ) {
      const page = p.page.list[params.page_id];
      if (page && p.page.doc && page.on_update) {
        p.page.doc.off("update", page.on_update);

        const cur = p.page.list[params.page_id];
        p.page.cur = cur.page;
        p.page.doc = cur.doc;
      }

      p.script.init_local_effect = {};
      await reloadPage(p, params.page_id, "load-route");
    }
  }
};
