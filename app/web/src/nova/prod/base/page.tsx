import { base } from "./base";
import { IRoot } from "../../../utils/types/root";
import { decompressBlob } from "./util";
import { prodCache } from "./cache";
import { get, set } from "idb-keyval";

export const loadPage = (page_id: string) => {
  return new Promise<{
    id: string;
    url: string;
    root: IRoot;
  }>(async (done) => {
    let returned = false;
    const cached = await get(`page-${page_id}`, prodCache);
    if (cached) {
      done(cached);
      returned = true;
    }

    const raw = await (await fetch(base.url`_prasi/page/${page_id}`)).blob();
    const res = JSON.parse(await (await decompressBlob(raw)).text()) as {
      id: string;
      url: string;
      root: IRoot;
    };
    set(
      `page-${page_id}`,
      { id: page_id, url: res.url, root: res.root },
      prodCache
    );

    if (!returned) done(res);
  });
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
      const page = await get(`page-${id}`, prodCache);
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

    const raw = await (
      await fetch(base.url`_prasi/pages`, {
        method: "POST",
        body: JSON.stringify({ ids }),
      })
    ).blob();
    const res = JSON.parse(await (await decompressBlob(raw)).text()) as {
      id: string;
      url: string;
      root: IRoot;
    }[];

    for (const [k, v] of Object.entries(res)) {
      set(`page-${k}`, v, prodCache);
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

  return await loadPages(founds.map((e) => e?.id) as string[]);
};