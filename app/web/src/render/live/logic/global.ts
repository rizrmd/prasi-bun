import { createRouter } from "radix3";
import { FC, ReactNode } from "react";
import { CompDoc } from "../../../base/global/content-editor";
import { IContent, MPage } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { PRASI_COMPONENT } from "../../../utils/types/render";
import { IRoot } from "../../../utils/types/root";
import { ISection } from "../../../utils/types/section";
import { IText } from "../../../utils/types/text";

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type ItemMeta = {
  item: IContent;
  scope?: any;
  indexedScope: Record<string, any>;
  comp?: {
    id: string;
    propval?: any;
    child_ids: Record<string, string>;
  };
  className?: string;
  parent_id: string;
  parent_comp?: WithRequired<ItemMeta, "comp"> & { item: IItem };
  memoize?: Record<string, {
    Local: FC<any>;
    PassProp: FC<any>;
  }>;
  isLayout: boolean;
  render?: () => void;
  mounted?: boolean;
  pendingRender?: boolean;
};

export type LPage = {
  id: string;
  name: string;
  url: string;
  content_tree?: IRoot;
  js: string;
};

export type LSite = {
  id: string;
  api_url: string;
  api_prasi: {
    port: string;
    db: string;
  };
  responsive: "all" | "mobile-only" | "desktop-only";
  domain: string;
  name: string;
  js: string;
  js_compiled: string;
  layout?: ISection;
  layout_id?: string;
  cgroup_ids?: string[];
  config?: any;
};
export type Loader = {
  site: (
    p: PG,
    where: { type: "domain"; domain: string } | { type: "siteid"; id: string }
  ) => Promise<LSite | null>;
  page: (p: PG, id: string) => Promise<LPage | null>;
  pages: (p: PG, site_id: string) => Promise<LPage[]>;
  npm: (p: PG, type: "site" | "page", id: string) => string;
  comp: (p: PG, id: string) => Promise<PRASI_COMPONENT>;
};
export const LiveGlobal = {
  liveSync: {
    ws: null as null | WebSocket,
    init: false,
    decompress: null as null | ((buf: Uint8Array) => Uint8Array),
  },
  prod: false,
  loader: undefined as unknown as Loader,
  mode: "" as "desktop" | "mobile",
  layout: {
    section: null as null | ISection,
    content: null as null | IItem | IText,
  },
  status: "init" as
    | "init"
    | "loading"
    | "reload"
    | "ready"
    | "not-found"
    | "error"
    | "tree-rebuild",
  site: {
    id: "",
    api_url: "",
    api_prasi: {
      port: "",
      db: "",
    },
    responsive: "all" as "all" | "mobile-only" | "desktop-only",
    domain: "",
    name: "",
    js: "",
    js_compiled: "",
  } as LSite,
  page: null as null | LPage,
  mpage: null as null | MPage,
  mpageLoaded: null as null | ((mpage: MPage) => void),
  pagePreload: {} as Record<string, true>,
  pages: {} as Record<string, LPage>,
  route: createRouter<{
    id: string;
    url: string;
  }>(),
  treePending: null as null | Promise<void>,
  treeMeta: {} as Record<string, ItemMeta>,
  cachedParentID: {} as Record<string, string>,
  portal: {} as Record<string, { el?: ReactNode; render: () => void }>,
  comps: {
    pending: {} as Record<string, Promise<PRASI_COMPONENT>>,
    resolve: {} as Record<string, (comp: PRASI_COMPONENT) => void>,
    all: {} as Record<string, PRASI_COMPONENT>,
  },
  script: {
    db: null as any,
    api: null as any,
  },
  compInstance: {} as Record<string, Record<string, string>>,
  ws: null as null | WebSocket,
  wsRetry: {
    fast: false,
    localIP: false,
    disabled: false,
    reconnecting: false,
  },
};

export type PG = typeof LiveGlobal & { render: () => void };
