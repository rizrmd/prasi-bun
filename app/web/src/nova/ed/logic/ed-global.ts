import { NodeModel } from "@minoru/react-dnd-treeview";
import { FC, ReactElement } from "react";
import { deepClone } from "web-utils";
import { SAction } from "../../../../../srv/ws/sync/actions";
import { parseJs } from "../../../../../srv/ws/sync/editor/parser/parse-js";
import { clientStartSync } from "../../../utils/sync/ws-client";
import { IItem, MItem } from "../../../utils/types/item";
import { DComp, DPage, IRoot } from "../../../utils/types/root";
import { ISection } from "../../../utils/types/section";
import { IText, MText } from "../../../utils/types/text";

export const EmptySite = {
  id: "",
  name: "",
  domain: "",
  config: { api_url: "" },
  js: "",
  js_compiled: "",
  layout: undefined as undefined | IRoot,
};

export type ESite = typeof EmptySite;
export type EPage = typeof EmptyPage;
export type EComp = typeof EmptyComp;

const EmptyPage = {
  id: "",
  name: "",
  url: "",
  snapshot: null as null | Uint8Array,
  scope: {} as Record<string, { p: string[]; s: ReturnType<typeof parseJs> }>,
};

const EmptyComp = {
  id: "",
  snapshot: null as null | Uint8Array,
};

const target = { active_id: false as any };
export const active = {
  hover_id: "",
  get item_id() {
    if (target.active_id === false) {
      target.active_id = localStorage.getItem("prasi-active-id") || "";
    }
    return target.active_id;
  },
  set item_id(val: string) {
    localStorage.setItem("prasi-active-id", val);
    target.active_id = val;
  },
};

export type EdMeta = {
  item: IItem | IText | ISection;
  mitem?: MItem | MText;
  parent_item: {
    id: string;
    mitem?: MItem;
  };
  parent_comp?: { id: string; comp_id: string };
  parent_mcomp?: {
    mitem: MItem;
    mcomp: MItem;
  };
  el?: ReactElement;
  isLayout?: boolean;
  /** script related meta **/
  propval?: Record<string, any>;
  indexedScope: Record<string, any>;
  memoize?: Record<
    string,
    {
      Local: FC<any>;
      PassProp: FC<any>;
    }
  >;
  scope?: Record<string, any>;
  render?: () => void;
};

export const EDGlobal = {
  mode: "" as "desktop" | "mobile",
  user: { id: "", username: "", client_id: "" },
  clients: {} as Record<string, { id: string; username: string }>,
  status: "init" as
    | "init"
    | "loading"
    | "site-not-found"
    | "page-not-found"
    | "ready",
  sync: null as unknown as Awaited<ReturnType<typeof clientStartSync>>,
  site: deepClone(EmptySite),
  site_dts: "",
  script: {
    siteTypes: {} as Record<string, string>,
    loaded: false,
  },
  page: {
    cur: EmptyPage,
    doc: null as null | DPage,
    list: {} as Record<string, { page: EPage; doc: DPage }>,
    building: false,
    meta: {} as Record<string, EdMeta>,
    entry: [] as string[],
    tree: [] as NodeModel<EdMeta>[],
    render: () => {},
  },
  comp: {
    cur: EmptyComp,
    doc: null as null | DComp,
    item: null as null | IItem,
    map: {} as Record<string, { id: string; item: IItem }>,
    list: {} as Record<string, { comp: EComp; doc: DComp }>,
    group: {} as Record<string, Awaited<ReturnType<SAction["comp"]["group"]>>>,
  },
  ui: {
    layout: {
      left: parseInt(localStorage.getItem("prasi-layout-left") || "250"),
      right: parseInt(localStorage.getItem("prasi-layout-right") || "250"),
    },
    prevent_indent_hook: false,
    syncing: false,
    tree: {
      item_loading: [] as string[],
      search: "",
      search_ref: null as null | HTMLInputElement,
      search_mode: {
        Name: true,
        JS: false,
        HTML: false,
        CSS: false,
      },
      rename_id: "",
      open: {} as Record<string, string[]>,
    },
    popup: {
      code: {
        init: false,
        open: false,
        id: "",
        name: "site",
        log: "",
        loading: false,
        error: false,
        show_log: false,
        list: {} as Record<string, string>,
      },
      script: {
        open: false,
        mode: "js" as "js" | "css" | "html",
      },
      site: null as null | ((site_id: string) => void | Promise<void>),
      site_form: null as null | {
        group_id: string;
        id: string;
        name?: string;
        domain?: string;
        responsive?: string;
      },
      comp: null as null | ((comp_id: string) => void | Promise<void>),
      comp_group: null as null | {
        mouse_event: React.MouseEvent<HTMLElement, MouseEvent>;
        on_pick?: (group_id: string) => void | Promise<void>;
        on_close?: () => void | Promise<void>;
      },
    },
  },
};

export type PG = typeof EDGlobal & { render: () => void };
