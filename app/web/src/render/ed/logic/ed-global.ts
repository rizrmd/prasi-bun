import { NodeModel } from "@minoru/react-dnd-treeview";
import { clientStartSync } from "../../../utils/sync/client";
import { IContent, MContent } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { DPage, IRoot } from "../../../utils/types/root";
import { IText, MText } from "../../../utils/types/text";
import { NodeMeta } from "../../editor/logic/global";

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

const EmptyPage = {
  id: "",
  name: "",
  url: "",
  snapshot: null as null | Uint8Array,
};

export type EdMeta = {
  item: IItem | IText;
  mitem?: MItem | MText;
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
    current: EmptyPage,
    doc: null as null | DPage,
    root: null as null | IRoot,
    entry: [] as string[],
    tree: [] as NodeModel<EdMeta>[],
    meta: {} as Record<string, { item: IContent; mitem?: MContent }>,
  },
};

export type PG = typeof EDGlobal & { render: () => void };
