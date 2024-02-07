import { base } from "./base";
import { IRoot } from "../../../utils/types/root";
import { decompressBlob } from "./util";

export const loadPage = async (page_id: string) => {
  const raw = await (await fetch(base.url`_prasi/page/${page_id}`)).blob();
  const res = JSON.parse(await (await decompressBlob(raw)).text()) as IRoot;
  return res;
};