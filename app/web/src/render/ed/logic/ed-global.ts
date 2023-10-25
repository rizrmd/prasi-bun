import { NodeModel } from "@minoru/react-dnd-treeview";
import { ReactElement } from "react";
import { clientStartSync } from "../../../utils/sync/ws-client";
import { IItem, MItem } from "../../../utils/types/item";
import { DComp, DPage, IRoot } from "../../../utils/types/root";
import { ISection } from "../../../utils/types/section";
import { IText, MText } from "../../../utils/types/text";
import { SAction } from "../../../../../srv/ws/sync/actions";

const EmptySite = {
  id: "",
  name: "",
  domain: "",
  config: { api_url: "" },
  snapshot: null as null | Uint8Array,

  // js: "",
  // js_compiled: "",
};
export type ESite = typeof EmptySite;
export type EPage = typeof EmptyPage;
export type EComp = typeof EmptyComp;

const EmptyPage = {
  id: "",
  name: "",
  url: "",
  snapshot: null as null | Uint8Array,
};

const EmptyComp = {
  id: "",
  snapshot: null as null | Uint8Array,
};

const target = { active_id: false as any };
export const active = {
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
  parent_comp?: {
    mitem: MItem;
    mcomp: MItem;
  };
  el?: ReactElement;
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
    cur: EmptyPage,
    doc: null as null | DPage,
    root: null as null | IRoot,
    entry: [] as string[],
    tree: [] as NodeModel<EdMeta>[],
    meta: {} as Record<string, EdMeta>,
    list: {} as Record<string, { page: EPage; doc: DPage }>,
  },
  comp: {
    cur: EmptyComp,
    doc: null as null | DComp,
    item: null as null | IItem,
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
