import { NodeModel } from "@minoru/react-dnd-treeview";
import { clientStartSync } from "../../../utils/sync/ws-client";
import { IContent, MContent } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { DComp, DPage, IRoot } from "../../../utils/types/root";
import { ISection } from "../../../utils/types/section";
import { IText, MText } from "../../../utils/types/text";
import { ReactElement } from "react";

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
    list: {} as Record<string, EPage>,
  },
  comp: {
    cur: EmptyComp,
    doc: null as null | DComp,
    item: null as null | IItem,
    list: {} as Record<string, { cur: EComp; doc: DComp }>,
  },
  ui: {
    tree: {
      search: "",
      open: {} as Record<string, string[]>,
    },
    popup: {
      comp: null as null | ((comp_id: string) => void | Promise<void>),
    },
  },
};

export type PG = typeof EDGlobal & { render: () => void };
