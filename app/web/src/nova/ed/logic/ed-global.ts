import { NodeModel } from "@minoru/react-dnd-treeview";
import { page } from "dbgen";
import { deepClone } from "web-utils";
import { SAction } from "../../../../../srv/ws/sync/actions";
import { parseJs } from "../../../../../srv/ws/sync/editor/parser/parse-js";
import { clientStartSync } from "../../../utils/sync/ws-client";
import { IItem } from "../../../utils/types/item";
import { DCode, DComp, DPage } from "../../../utils/types/root";
import { GenMetaP, IMeta as LogicMeta } from "../../vi/utils/types";

export type IMeta = LogicMeta;

export const EmptySite = {
  id: "",
  name: "",
  domain: "",
  config: { api_url: "" },
  js: "",
  js_compiled: "",
  responsive: "" as "desktop-only" | "mobile-only" | "responsive",
  layout: {
    id: "--",
    snapshot: null as null | Uint8Array,
    meta: undefined as void | Record<string, IMeta>,
  },
  code: {
    snapshot: {} as
      | undefined
      | Record<
          string,
          {
            id_doc: number;
            bin: Uint8Array;
          }
        >,
    mode: "old" as "old" | "vsc",
  },
};

export type ESite = typeof EmptySite;
export type EPage = typeof EmptyPage;
export type EComp = typeof EmptyComp;
export type PropFieldKind = "visible" | "gen" | "value" | "option";
export type ISingleScope = {
  p: string[];
  n: string;
  s: null | Exclude<ReturnType<typeof parseJs>, undefined>;
};
export type IScope = Record<string, ISingleScope>;

export type IScopeComp = Record<
  string,
  {
    id: string;
    name: string;
    snapshot: Uint8Array;
    scope: IScope;
  }
>;
const EmptyPage = {
  id: "",
  name: "",
  url: "",
  snapshot: null as null | Uint8Array,
  comps: {} as Record<string, EComp>,
};

const EmptyComp = {
  id: "",
  snapshot: null as null | Uint8Array,
};

const target = {
  active_id: false as any,
  comp_id: false as any,
  instance_comp_id: false as any,
  instance_item_id: false as any,
};

export const active = {
  should_render_main: true,
  hover: { id: "" },
  script_nav: {
    list: [] as {
      item_id: string;
      comp_id?: string;
      instance?: { item_id: string; comp_id?: string };
    }[],
    idx: -1,
  },
  text: { id: "", content: "", timeout: null as any, el: null as any },
  get item_id() {
    if (target.active_id === false) {
      target.active_id = localStorage.getItem("prasi-active-id") || "";
    }
    return target.active_id || "";
  },
  set item_id(val: string) {
    localStorage.setItem("prasi-active-id", val || "");
    target.active_id = val || "";
  },
  get comp_id() {
    if (target.comp_id === false) {
      target.comp_id = localStorage.getItem("prasi-comp-id") || "";
    }
    return target.comp_id || "";
  },
  set comp_id(val: string) {
    localStorage.setItem("prasi-comp-id", val || "");
    target.comp_id = val || "";
  },
  instance: {
    get comp_id() {
      if (target.instance_comp_id === false) {
        target.instance_comp_id =
          localStorage.getItem("prasi-instance-comp-id") || "";
      }
      return target.instance_comp_id || "";
    },
    set comp_id(val: string) {
      localStorage.setItem("prasi-instance-comp-id", val || "");
      target.instance_comp_id = val || "";
    },
    get item_id() {
      if (target.instance_item_id === false) {
        target.instance_item_id =
          localStorage.getItem("prasi-instance-item-id") || "";
      }
      return target.instance_item_id || "";
    },
    set item_id(val: string) {
      localStorage.setItem("prasi-instance-item-id", val || "");
      target.instance_item_id = val || "";
    },
  },
};

export const EDGlobal = {
  mode: "" as "desktop" | "mobile",
  user: { id: "", username: "", client_id: "" },
  clients: {} as Record<string, { id: string; username: string }>,
  status: "init" as
    | "init"
    | "load-site"
    | "reload"
    | "site-not-found"
    | "page-not-found"
    | "ready",
  sync: null as unknown as Awaited<ReturnType<typeof clientStartSync>>,
  site: deepClone(EmptySite),
  site_dts: "",
  script: {
    site_types: {} as Record<string, string>,
    loaded: false,
    do_edit: async (newval: string, all?: boolean) => {},
    db: null as any,
    api: null as any,
    init_local_effect: {} as Record<string, boolean>,
  },
  page: {
    root_id: "root",
    cur: EmptyPage,
    doc: null as null | DPage,
    list: {} as Record<
      string,
      {
        page: EPage;
        doc: DPage;
        on_update?: (bin: Uint8Array, origin: any) => Promise<void>;
      }
    >,
    building: false,
    meta: {} as Record<string, IMeta>,
    entry: [] as string[],
    tree: [] as NodeModel<IMeta>[],
    render: () => {},
  },
  comp: {
    doc: null as null | DComp,
    item: null as null | IItem,
    loaded: {} as GenMetaP["comps"],
    list: {} as Record<
      string,
      {
        comp: EComp;
        doc: DComp;
        tree: NodeModel<IMeta>[];
        meta: Record<string, IMeta>;
        on_update: (bin: Uint8Array, origin: any) => Promise<void>;
      }
    >,
    group: {} as Record<string, Awaited<ReturnType<SAction["comp"]["group"]>>>,
  },
  code: {} as Record<string, { doc: null | DCode }>,
  global_prop: [] as string[],
  ui: {
    zoom: localStorage.zoom || "100%",
    should_render: false,
    side: { prop: true },
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
        name: "site",
        log: "",
        loading: false,
        error: false,
        show_log: false,
        list: {} as Record<string, string>,
      },
      page: {
        open: null as null | ((page_id: string) => void),
        form: null as null | Partial<page>,
      },
      script: {
        open: false,
        mode: "js" as "js" | "css" | "html",
        type: "item" as "item" | "prop-master" | "prop-instance",
        prop_kind: "" as PropFieldKind,
        prop_name: "",
        on_close: () => {},
        typings: { status: "ok" as "ok" | "loading" | "error", err_msg: "" },
        wb_render: () => {},
      },
      site: null as null | ((site_id: string) => void | Promise<void>),
      site_form: null as null | {
        group_id: string;
        id: string;
        name?: string;
        domain?: string;
        responsive?: string;
      },
      comp: {
        preview_id: "",
        open: null as null | ((comp_id: string) => void | Promise<void>),
      },
      comp_group: null as null | {
        mouse_event: React.MouseEvent<HTMLElement, MouseEvent>;
        on_pick?: (group_id: string) => void | Promise<void>;
        on_close?: () => void | Promise<void>;
      },
      api: { open: false },
    },
  },
};

export type PG = typeof EDGlobal & { render: () => void };
