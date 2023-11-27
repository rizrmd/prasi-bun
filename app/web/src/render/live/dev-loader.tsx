import { LSite, Loader } from "./logic/global";

const cache = { site: null as any, pages: [] as any, api: null };
const config = { serverurl: "" };

export const devLoader: Loader = {
  async site(p, where) {
    config.serverurl = serverurl;
    const site = (await db.site.findFirst({
      where:
        where.type === "siteid" ? { id: where.id } : { domain: where.domain },
      select: {
        id: true,
        config: true,
        domain: true,
        name: true,
        js: true,
        responsive: true,
        js_compiled: true,
      },
    })) as unknown as LSite;

    if (!site) {
      return null;
    }

    const cgroups = await db.site_use_comp.findMany({
      where: { id_site: site.id },
      select: { use_id_site: true },
    });

    if (cgroups) {
      site.cgroup_ids = [];
      for (const id of cgroups.map((c: any) => c.use_id_site)) {
        site.cgroup_ids.push(id);
      }
    }

    const layout = await db.page.findFirst({
      where: {
        id_site: site.id,
        name: { startsWith: "layout:" },
        is_default_layout: true,
        is_deleted: false,
      },
      select: { content_tree: true, id: true },
    });

    if (layout) {
      const childs = (layout.content_tree as any).childs;
      if (childs && childs.length > 0) {
        site.layout = childs[0];
        site.layout_id = layout.id;
      }
    }

    cache.site = site;

    return site;
  },
  async comp(p, id) {
    const comp = await load(`${config.serverurl}/_web/comp/${id}`);
    p.comps.all[id] = comp;
    return comp;
  },
  npm(p, type, id) {
    if (type === "site") {
      return `${config.serverurl}/npm/site/${id}/site.js`;
    }
    return `${config.serverurl}/npm/page/${id}/page.js`;
  },
  async page(p, id) {
    return await load(`${config.serverurl}/_web/page/${id}`);
  },
  async pages(p, id) {
    let pages = [] as any;
    /** load pages */
    const pagesLocal = localStorage.getItem(`prasi-pages-[${id}]`);
    if (pagesLocal) {
      try {
        pages = JSON.parse(pagesLocal);
      } catch (e) {}
    }

    const loadPages = async () => {
      return await db.page.findMany({
        where: {
          id_site: cache.site.id,
          is_deleted: false,
          name: { not: { startsWith: "layout:" } },
        },
        select: {
          id: true,
          name: true,
          url: true,
        },
      });
    };

    if (pages.length === 0) {
      pages = await loadPages();
      localStorage.setItem(`prasi-pages-[${id}]`, JSON.stringify(pages));
    } else {
      loadPages().then((pages) => {
        localStorage.setItem(`prasi-pages-[${id}]`, JSON.stringify(pages));
      });
    }
    return pages;
  },
};

const load = async (url: string) => {
  const res = await fetch(url);
  try {
    const text = await res.text();
    const json = JSON.parse(text);
    return json;
  } catch (e) {
    return null;
  }
};
