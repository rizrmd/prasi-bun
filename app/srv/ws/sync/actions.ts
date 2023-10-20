import { component, site, page } from "dbgen";


export const SyncActions = {
  site: {
    list: () =>
      ({}) as Promise<
        Record<string, { id: string; name: string; domain: string }>
      >,
    group: () => ({}) as Promise<Record<string, string[]>>,
    load: (id: string) => ({}) as Promise<site>,
  },
  comp: {
    list: () => ({}) as Record<string, Exclude<component, "content_tree">>,
    group: () => ({}) as Record<string, string[]>,
    doc: (id: string) => ({}) as Uint8Array,
  },
  page: {
    list: (id_site: string) =>
      ({}) as Record<string, Exclude<page, "content_tree">>,
    load: (id: string) => ({}) as Uint8Array,
  },
};
