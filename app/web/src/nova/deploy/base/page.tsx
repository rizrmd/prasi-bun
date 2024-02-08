import { base } from "./base";
import { IRoot } from "../../../utils/types/root";
import { decompressBlob } from "./util";

export const loadPage = async (page_id: string) => {
  const raw = await (await fetch(base.url`_prasi/page/${page_id}`)).blob();
  const res = JSON.parse(await (await decompressBlob(raw)).text()) as IRoot;
  return res;
};

export const loadPages = async (page_ids: string[]) => {
  const raw = await (
    await fetch(base.url`_prasi/pages`, {
      method: "POST",
      body: JSON.stringify({ ids: [...new Set(page_ids)] }),
    })
  ).blob();
  const res = JSON.parse(await (await decompressBlob(raw)).text()) as {
    id: string;
    url: string;
    root: IRoot;
  }[];
  return res;
};

export const loadUrls = async (urls: string[]) => {
  const founds = urls
    .map((url) => {
      return base.route.router?.lookup(url);
    })
    .filter((e) => e && e.id);

  return await loadPages(founds.map((e) => e?.id) as string[]);
};
