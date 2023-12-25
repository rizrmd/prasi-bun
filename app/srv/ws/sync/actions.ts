import { component, page } from "dbgen";
import {
  EComp,
  EPage,
  ESite,
  PropFieldKind,
} from "../../../web/src/nova/ed/logic/ed-global";
import { IItem } from "../../../web/src/utils/types/item";
import { site_group } from "./actions/site_group";
import { ParsedScope, parseJs } from "./editor/parser/parse-js";
import { ISimpleMeta } from "../../../web/src/nova/vi/utils/types";

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
    group: async () => ({}) as ReturnType<typeof site_group>,
    load: async (id: string) => ({}) as ESite | void,
    update: async (
      id: string,
      site: Partial<
        Omit<ESite, "js" | "js_compiled"> & {
          js: Buffer;
          js_compiled: Buffer;
        }
      >
    ) => {},
  },
  comp: {
    new: async (arg: {
      group_id: string;
      page_id?: string;
      comp_id?: string;
      item_id: string;
      item: IItem;
    }) => ({}) as EComp | void,
    list: async () =>
      ({}) as Record<string, Exclude<component, "content_tree">>,
    group: async (id_site: string) =>
      ({}) as Record<string, { id: string; name: string; comps: string[] }>,
    load: async (ids: string[], sync?: boolean) =>
      ({}) as Record<string, EComp>,
  },
  page: {
    list: async (id_site: string) =>
      ({}) as Record<string, Exclude<page, "content_tree">>,
    load: async (id: string) => ({}) as EPage | void,
  },
  yjs: {
    um: async (
      mode: "page" | "comp" | "site",
      action: "undo" | "redo",
      id: string
    ) => {},
    sv_local: async (
      mode: "page" | "comp" | "site",
      id: string,
      bin: Uint8Array
    ) => ({}) as { diff: Uint8Array; sv: Uint8Array } | void,
    diff_local: async (
      mode: "page" | "comp" | "site",
      id: string,
      bin: Uint8Array
    ) => {},
    sv_remote: async (
      mode: "page" | "comp" | "site",
      id: string,
      sv: Uint8Array,
      diff: Uint8Array
    ) => ({}) as { diff: Uint8Array } | void,
  },
  activity: async (
    name: "site",
    action:
      | {
          type: "join";
          id: string;
        }
      | {
          type: "code";
          id: string;
          name: string;
          action: "open" | "close";
        }
  ) => ({}) as any,
  client: {
    info: async (client_ids: string[]) =>
      ({}) as Record<string, { id: string; username: string }>,
  },
  code: {
    edit: async (
      arg:
        | {
            type: "adv";
            mode: "js" | "css" | "html";
            item_id: string;
            page_id?: string;
            comp_id?: string;
            value: Uint8Array;
          }
        | {
            type: "prop-master";
            comp_id: string;
            prop_name: string;
            prop_kind: PropFieldKind;
            value: Uint8Array;
          }
        | {
            type: "prop-instance";
            item_id: string;
            page_id?: string;
            comp_id?: string;
            prop_name: string;
            value: Uint8Array;
          }
    ) => ({}) as boolean | ParsedScope,
    parse: async (code: string | Record<string, string>) =>
      ({}) as Record<string, ReturnType<typeof parseJs>>,
  },
};
