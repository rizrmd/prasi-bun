import { NodeModel } from "@minoru/react-dnd-treeview";
import { clientStartSync } from "../../../utils/sync/client";
import { IContent, MContent } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { DComp, DPage, IRoot } from "../../../utils/types/root";
import { IText, MText } from "../../../utils/types/text";
import { FNCompDef } from "../../../utils/types/meta-fn";
import { ISection } from "../../../utils/types/section";

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

export type EdMeta = {
  item: IItem | IText | ISection;
  mitem?: MItem | MText;
  parent_item: {
    id: string;
    mitem?: MItem;
  };
  parent_comp?: {
    ref_ids: Record<string, string>;
    mcomp: MItem;
  };
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
    meta: {} as Record<string, { item: IContent; mitem?: MContent }>,
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
      open: {} as Record<string, string[]>,
    },
  },
};

export type PG = typeof EDGlobal & { render: () => void };
