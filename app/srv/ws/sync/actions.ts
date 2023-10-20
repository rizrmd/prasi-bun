import { component, site, page } from "dbgen";
import { ESite } from "../../../web/src/render/ed/logic/ed-global";

/* 
   WARNING:
   CHANGING FUNCTION NAME / OBJECT STRUCTURE 
   WILL *BREAK* OFFLINE STORAGE --
   ONLY ADDITION IS ALLOWED 
*/

export type SAction = typeof SyncActions;

export const SyncActions = {
  site: {
    list: async () =>
      ({}) as Record<string, { id: string; name: string; domain: string }>,
    group: async () => ({}) as Record<string, string[]>,
    load: async (id: string) => ({}) as ESite | undefined,
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
