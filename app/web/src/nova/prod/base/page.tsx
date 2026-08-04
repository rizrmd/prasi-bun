import { get, set } from "idb-keyval";
import { IRoot } from "../../../utils/types/root";
import { base } from "./base";

const pendingPage = {} as Record<
  string,
  Promise<{
    id: string;
    url: string;
    root: IRoot;
  }>
>;

const normalizePage = (res: any) => {
  if (!res) return res;
  if (!res.root && res.content_tree) {
    res.root = res.content_tree;
    delete res.content_tree;
  }
  return res;
};

export const loadPage = (page_id: string) => {
  if (typeof pendingPage[page_id] === "object") return pendingPage[page_id];

  pendingPage[page_id] = new Promise<{
    id: string;
    url: string;
    root: IRoot;
  }>(async (done, fail) => {
    try {
      // Prefer network so page content updates (e.g. kelola fixes) are visible.
      // Fall back to IndexedDB cache only if fetch fails.
      const res = normalizePage(
        (await (
          await fetch(base.url`_prasi/page/${page_id}`, {
            cache: "no-store",
          })
        ).json()) as {
          id: string;
          url: string;
          root: IRoot;
          content_tree?: IRoot;
        }
      );

      try {
        await set(`page-${page_id}`, res);
      } catch {
        /* ignore idb errors */
      }

      done(res);
    } catch (err) {
      try {
        const cached = await get(`page-${page_id}`);
        if (cached) {
          done(normalizePage(cached));
          return;
        }
      } catch {
        /* ignore */
      }
      fail(err);
    } finally {
      // Allow re-fetch on next navigation (don't pin stale content forever)
      setTimeout(() => {
        delete pendingPage[page_id];
      }, 1500);
    }
  });

  return pendingPage[page_id];
};

export const loadPages = (page_ids: string[]) => {
  return new Promise<
    {
      id: string;
      url: string;
      root: IRoot;
    }[]
  >(async (done) => {
    const result: any = {};
    const ids = [...new Set(page_ids)];
    let is_done = true;
    for (const id of ids) {
      const page = await get(`page-${id}`);
      if (page) {
        result[id] = page;
      } else {
        is_done = false;
        break;
      }
    }

    if (is_done) {
      done(result);
    }

    const res = (await (
      await fetch(base.url`_prasi/pages`, {
        method: "POST",
        body: JSON.stringify({ ids }),
        cache: "no-store",
      })
    ).json()) as {
      id: string;
      url: string;
      root: IRoot;
    }[];

    // refresh idb cache for each page
    try {
      for (const p of res || []) {
        if (p?.id) await set(`page-${p.id}`, normalizePage(p));
      }
    } catch {
      /* ignore */
    }

    if (!is_done) {
      done(res);
    }
  });
};

export const loadUrls = async (urls: string[]) => {
  const founds = urls
    .map((url) => {
      return base.route.router?.lookup(url);
    })
    .filter((e) => e && e.id);

  const result = await loadPages(founds.map((e) => e?.id) as string[]);
  return result;
};
