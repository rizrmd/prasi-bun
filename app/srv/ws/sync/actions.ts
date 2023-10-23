import { component, page } from "dbgen";
import {
  EComp,
  EPage,
  ESite,
} from "../../../web/src/render/ed/logic/ed-global";

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
    load: async (id: string) => ({}) as ESite | void,
  },
  comp: {
    undo: async (id_comp: string) => {},
    redo: async (id_comp: string) => {},
    list: () => ({}) as Record<string, Exclude<component, "content_tree">>,
    group: () => ({}) as Record<string, string[]>,
    load: async (id: string) => ({}) as EComp | void,
  },
  page: {
    undo: async (id_page: string) => {},
    redo: async (id_page: string) => {},
    list: (id_site: string) =>
      ({}) as Record<string, Exclude<page, "content_tree">>,
    load: async (id: string) => ({}) as EPage | void,
  },
  yjs: {
    sv_local: async (mode: "page" | "comp", id: string, bin: Uint8Array) =>
      ({}) as { diff: Uint8Array; sv: Uint8Array } | void,
    diff_local: async (
      mode: "page" | "comp",
      id: string,
      bin: Uint8Array
    ) => {},
  },
};
