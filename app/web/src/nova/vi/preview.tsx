import { useGlobal } from "web-utils";
import { Loading } from "../../utils/ui/loading";
import { EDGlobal, PG, active } from "../ed/logic/ed-global";
import { reloadPage } from "../ed/logic/ed-route";
import { loadSite } from "../ed/logic/ed-site";
import { Vi } from "./vi";
import init from "wasm-gzip";

export const ViPreview = (arg: { pathname: string }) => {
  const p = useGlobal(EDGlobal, "EDITOR");

  viRoute(p);

  if (p.status !== "ready") {
    return <Loading note={p.status + "-page"} />;
  }

  return (
    <Vi
      meta={p.page.meta}
      api_url={p.site.config.api_url}
      site_id={p.site.id}
      page_id={p.page.cur.id}
      entry={p.page.entry}
      api={p.script.api}
      db={p.script.db}
      render_stat="disabled"
      script={{ init_local_effect: p.script.init_local_effect }}
    />
  );
};

const viRoute = async (p: PG) => {
  if (p.status === "ready" || p.status === "init") {
    if (p.status === "init") {
      await init();
    }

    if (!p.site.domain && !p.site.name) {
      p.status = "loading";
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

      await reloadPage(p, params.page_id, "load-route");
    }
  }
};
