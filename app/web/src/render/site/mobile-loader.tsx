import { w } from "../../utils/types/general";
import { Loader } from "../live/logic/global";

const cache = {
  site: null as any,
  pages: [] as any,
  api: null,
  npm_pages: [] as string[],
};

export const mobileLoader: Loader = {
  async site(p, id) {
    const res = (await load(`/content/site/site.json`)) as any;
    cache.site = res;

    const pages = (await load(`/content/site/pages.json`)) as any;
    cache.pages = pages;

    const npm_pages = (await load(`/content/site/npm_pages.json`)) as any;
    cache.npm_pages = npm_pages;

    w.serverurl = res.config.api_url;
    w.apiurl = res.config.api_url;

    w.prasiApi = {
      [res.config.api_url]: { apiEntry: res.api },
    };

    return res;
  },
  async comp(p, id) {
    const comp = (await load(`/content/comps/${id}.json`)) as any;
    p.comps.all[id] = comp;
    return comp;
  },
  npm(p, type, id) {
    if (type === "site") return `/content/npm/site/index.js`;
    if (cache.npm_pages.includes(id)) {
      return `/content/npm/pages/${id}/index.js`;
    }
    return "";
  },
  async page(p, id) {
    const page = cache.pages.find((x: any) => x.id === id);
    if (page && !page.content_tree) {
      const res = (await load(`/content/pages/${id}.json`)) as any;

      return res;
    }
    return null;
  },
  async pages(p, id) {
    return cache.pages;
  },
};

const load = async (url: string) => {
  const res = await fetch(`${(w as any).mobilepath}${url}`);
  try {
    const text = await res.text();
    const json = JSON.parse(text);
    return json;
  } catch (e) {
    return null;
  }
};
