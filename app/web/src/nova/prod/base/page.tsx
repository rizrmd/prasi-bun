import { get } from "idb-keyval";
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

export const loadPage = (page_id: string) => {
  if (typeof pendingPage[page_id] === "object") return pendingPage[page_id];

  pendingPage[page_id] = new Promise<{
    id: string;
    url: string;
    root: IRoot;
  }>(async (done) => {
    let returned = false;

    const cached = await get(`page-${page_id}`);
    if (cached) {
      done(cached);
      returned = true;
    }

    const res = (await (
      await fetch(base.url`_prasi/page/${page_id}`)
    ).json()) as {
      id: string;
      url: string;
      root: IRoot;
      content_tree?: IRoot;
    };

    if (!res.root && res.content_tree) {
      res.root = res.content_tree;
      delete res.content_tree;
    }

    if (!returned) done(res);
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
      })
    ).json()) as {
      id: string;
      url: string;
      root: IRoot;
    }[];

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
