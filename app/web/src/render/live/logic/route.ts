import { w } from "../../../utils/types/general";
import importModule from "../../editor/tools/dynamic-import";
import { loadComponent } from "./comp";
import { LPage, PG } from "./global";
import { rebuildTree } from "./tree-logic";

export const routeLive = (p: PG, pathname: string) => {
  if (p.status !== "loading" && p.status !== "not-found") {
    let page_id = params.page_id;

    if (!page_id) {
      const found = p.route.lookup(pathname);
      if (!found) {
        p.status = "not-found";
      } else {
        if (!w.params) w.params = {};
        if (found.params) {
          for (const [k, v] of Object.entries(found.params)) {
            w.params[k] = v;
          }
        }
        page_id = found.id;
      }
    }

    if (page_id) {
      (window as any).pageid = page_id;
      const promises: Promise<void>[] = [];
      if (page_id !== p.page?.id) {
        p.page = p.pages[page_id];
        p.treeMeta = {};
        p.portal = {};
      }

      if (!p.page || !p.page.content_tree) {
        promises.push(loadNpmPage(p, page_id));
        promises.push(loadPage(p, page_id));
      }

      if (promises.length > 0) {
        p.status = "loading";
        Promise.all(promises).then(async () => {
          p.page = p.pages[page_id];
          if (p.page) {
            await pageLoaded(p);
            p.render();
          }
        });
      } else {
        if (!firstRender[page_id]) {
          firstRender[page_id] = true;
          pageLoaded(p).then(p.render);
        } else {
          pageLoaded(p);
        }
      }
    }
  }
};
const firstRender = {} as Record<string, true>;

const pageLoaded = async (p: PG) => {
  if (p.page) {
    await rebuildTree(p, { render: false, note: "render", reset: false });
    p.status = "ready";
  } else {
    p.status = "not-found";
  }
};

export const preload = async (p: PG, pathname: string) => {
  const found = p.route.lookup(pathname);
  if (found) {
    if (
      (!p.pages[found.id] ||
        (p.pages[found.id] && !p.pages[found.id].content_tree)) &&
      !p.pagePreload[found.id]
    ) {
      p.pagePreload[found.id] = true;
      const dbpage = await p.loader.page(p, found.id);
      if (dbpage) {
        p.pages[dbpage.id] = dbpage;
        const page = p.pages[dbpage.id];
        if (page && page.content_tree) {
          await loadComponent(p, page.content_tree);
        }
        delete p.pagePreload[found.id];
        await loadNpmPage(p, dbpage.id);
      }
    }
  }
};

const npmPageLoaded = {} as Record<string, true>;
const loadNpmPage = async (p: PG, id: string) => {
  try {
    if (!npmPageLoaded[id]) {
      npmPageLoaded[id] = true;
      if (typeof window.exports === "undefined") {
        window.exports = {};
      }
      await importModule(p.loader.npm(p, "page", id));
    }
  } catch (e) {
    console.error(e);
  }
};

const loading = {} as Record<string, Promise<LPage | null>>;

const loadPage = async (p: PG, id: string) => {
  if (!loading[id]) {
    loading[id] = p.loader.page(p, id);
  }

  const page = await loading[id];

  if (page) {
    p.pages[page.id] = {
      id: page.id,
      url: page.url,
      name: page.name,
      content_tree: page.content_tree as any,
      js: (page as any).js_compiled as any,
    };

    const cur = p.pages[page.id];
    if (cur && cur.content_tree) {
      await loadComponent(p, cur.content_tree);
    }
  }
};

export const extractNavigate = (str: string) => {
  return [
    ...findBetween(str, `navigate(`, `)`),
    ...findBetween(str, `href = `, `;`),
  ];
};

const findBetween = (text: string, opener: string, closer: string) => {
  let i = 0;
  let last = 0;
  const founds: string[] = [];
  while (true) {
    const startIndex = text.indexOf(opener, i);
    last = i;
    if (startIndex >= 0) {
      const char = text[startIndex + opener.length];
      if (char === '"' || char === "'" || char === "`") {
        const end = text.indexOf(
          `${char}${closer}`,
          startIndex + opener.length + 1
        );
        const found = text.substring(startIndex + opener.length + 1, end);
        i = end + 2 + closer.length;
        founds.push(found);
      }
    }

    if (last === i) {
      break;
    }
  }
  return founds;
};
