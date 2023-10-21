import { clientStartSync } from "../../../utils/sync/client";
import { IItem } from "../../../utils/types/item";
import { DPage, IRoot } from "../../../utils/types/root";

const EmptySite = {
  id: "",
  name: "",
  domain: "",
  js: "",
  js_compiled: "",
  config: { api_url: "" },
};
export type ESite = typeof EmptySite;
export type EPage = typeof EmptyPage;

const EmptyPage = {
  id: "",
  name: "",
  url: "",
  snapshot: null as null | Uint8Array,
};

export const EDGlobal = {
  status: "init" as
    | "init"
    | "loading"
    | "site-not-found"
    | "page-not-found"
    | "ready",
  sync: null as unknown as Awaited<ReturnType<typeof clientStartSync>>,
  site: EmptySite,
  page: {
    current: EmptyPage,
    doc: null as null | DPage,
    root: null as null | IRoot,
  },
};

export type PG = typeof EDGlobal & { render: () => void };
