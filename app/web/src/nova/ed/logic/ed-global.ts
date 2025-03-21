import { NodeModel } from "@minoru/react-dnd-treeview";
import { page } from "dbgen";
import { deepClone } from "web-utils";
import type { SAction } from "../../../../../srv/ws/sync/actions";
import type { parseJs } from "../../../../../srv/ws/sync/editor/parser/parse-js";
import { clientStartSync } from "../../../utils/sync/ws-client";
import { IItem } from "../../../utils/types/item";
import { DCode, DComp, DPage, IRoot } from "../../../utils/types/root";
import { GenMetaP, IMeta as LogicMeta } from "../../vi/utils/types";
import { createRouter } from "radix3";
import { FEntry } from "../panel/file/type";
export type IMeta = LogicMeta;

export const EmptySite = {
  id: "",
  name: "",
  domain: "",
  config: { api_url: "" },
  deploy_name: "",
  js: "",
  js_compiled: "",
  responsive: "" as "desktop-only" | "mobile-only" | "responsive",
  layout: {
    id: "--",
    meta: undefined as void | Record<string, IMeta>,
    entry: [] as string[],
  },
};

export type ESite = typeof EmptySite;
export type EPage = typeof EmptyPage;
export type EComp = typeof EmptyComp;
export type PropFieldKind =
  | "onChange"
  | "visible"
  | "gen"
  | "value"
  | "option"
  | "typings";
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
export const EmptyPage = {
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
  defer_render_main: false,
  hover: { id: "", tree: false },
  scope: {} as any,
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

export type CompListItem = {
  comp: EComp;
  doc: DComp;
  tree: NodeModel<IMeta>[];
  meta: Record<string, IMeta>;
  on_update: (bin: Uint8Array, origin: any) => Promise<void>;
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
    | "ready"
    | "no-site",
  preview: {
    url_cache: new Set<string>(),
    route_cache: createRouter<{ url: string; id: string }>(),
    page_cache: {} as Record<string, { root: IRoot; url: string }>,
    meta_cache: {} as Record<
      string,
      { entry: string[]; meta: Record<string, IMeta>; url: string }
    >,
  },
  sync: undefined as undefined | Awaited<ReturnType<typeof clientStartSync>>,
  site: deepClone(EmptySite),
  site_tstamp: Date.now(),
  site_exports: {} as Record<string, any>,
  site_dts: "",
  site_dts_entry: {} as any,
  prisma_ext: "",
  script: {
    site_types: {} as Record<string, string>,
    loaded: false,
    do_edit: async (newval: string, all?: boolean) => {},
    db: null as any,
    api: null as any,
    init_local_effect: {} as Record<string, boolean>,
  },
  page: {
    history: {
      id: "",
      show: false,
    },
    root_id: "root",
    cur: EmptyPage,
    doc: null as null | DPage,
    list: {} as Record<
      string,
      {
        page: EPage;
        doc: DPage;
        on_update?: (bin: Uint8Array, origin: any) => Promise<void>;
        update_timeout: any;
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
    list: {} as Record<string, CompListItem>,
    group: {} as Record<string, Awaited<ReturnType<SAction["comp"]["group"]>>>,
  },
  code: {} as Record<string, { doc: null | DCode }>,
  global_prop: [] as string[],
  ui: {
    deploy: { target: [] as { name: string; id: string, api_url:string }[], active: 0 },
    build: { status: "ready" as "ready" | "loading" | "error" },
    monaco: null as any,
    comp_editable: localStorage.getItem("prasi-comp-editable") === "yes",
    zoom: localStorage.zoom || "100%",
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
      open_all: false,
      open: {} as Record<string, string[]>,
    },
    popup: {
      file: {
        enabled: false,
        open: false,
        picker: {
          value: "",
          on_pick: false as boolean | ((file: string) => void | Promise<void>),
          multi: false,
        },
        path: "/",
        expanded: JSON.parse(
          localStorage.getItem("panel-file-expanded") || "{}"
        ) as Record<string, string[]>,
        entry: {} as Record<string, FEntry[]>,
        selected: new Set<string>(),

        action: null as null | {
          label: string;
          submit: () => void | Promise<void>;
        },

        file_renaming: "",
        file_ctx_menu_event: null as null | React.MouseEvent<
          HTMLElement,
          MouseEvent
        >,

        tree: [] as NodeModel<FEntry>[],
        tree_renaming: "",
        tree_ctx_path: "",
        tree_ctx_menu_event: null as null | React.MouseEvent<
          HTMLElement,
          MouseEvent
        >,

        preview: true,
        upload: {
          started: false,
          progress: {} as Record<string, number>,
        },
      },
      code: {
        init: false,
        open: false,
        name: "site",
        log: "",
        loading: false,
        rebuilding: false,
        startup_status: "init" as
          | "init"
          | "loading"
          | "disabled"
          | "stopped"
          | "running",
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
        lastMode: "js" as "js" | "css" | "html",
        type: "item" as "item" | "prop-master" | "prop-instance" | "comp-types",
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
        import: false,
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
