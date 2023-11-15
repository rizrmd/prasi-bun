import { w } from "../../utils/script/init-api";
import { Loader } from "../live/logic/global";

const base = `/_web/${(window as any).id_site}`;

const cache = { site: null as any, pages: [] as any, api: null };

export const siteLoader: Loader = {
  async site(p, id) {
    const res = (await load(`/site?prod=1`)) as {
      site: any;
      pages: any;
      api: any;
    };
    cache.site = res.site;
    cache.pages = res.pages;
    cache.api = res.api;

    if (typeof w.basepath === "undefined") w.basepath = "";
    w.serverurl = res.site.config.api_url;
    w.apiurl = res.site.config.api_url;

    w.prasiApi = {
      [res.site.config.api_url]: { apiEntry: res.api },
    };

    return res.site;
  },
  async comp(p, id) {
    const comp = (await load(`/comp/${id}`)) as any;
    p.comps.all[id] = comp;
    return comp;
  },
  npm(p, type, id) {
    if (type === "site") return `/_web/${cache.site.id}/npm-site/site.js`;
    return `/_web/${cache.site.id}/npm-page/${id}/page.js`;
  },
  async page(p, id) {
    const page = cache.pages.find((x: any) => x.id === id);
    if (page && !page.content_tree) {
      const res = (await load(`/page/${id}`)) as any;
      return res;
    }
    return null;
  },
  async pages(p, id) {
    return cache.pages;
  },
};

const load = async (url: string) => {
  console.log("loading", `${w.basepath}${base}${url}`);
  const res = await fetch(`${w.basepath}${base}${url}`);
  const text = await res.text();
  const json = JSON.parse(text);
  return json;
};
