import { clientStartSync } from "../../../utils/sync/client";

const EmptySite = {
  id: "",
  name: "",
  domain: "",
  js: "",
  js_compiled: "",
  config: { api_url: "" },
};
export type ESite = typeof EmptySite;
const EmptyPage = {
  id: "",
};

export const EDGlobal = {
  sync: null as unknown as Awaited<ReturnType<typeof clientStartSync>>,
  site: EmptySite,
  page: EmptyPage,
};

export type PG = typeof EDGlobal & { render: () => void };
