import { ReactNode } from "react";
import { parseJs } from "../../../../../srv/ws/sync/editor/parser/parse-js";
import { IContent } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { createViLocal } from "../render/script/local";
import { createViPassProp } from "../render/script/passprop";

export type GenMetaP = {
  meta: Record<string, IMeta>;
  comps: Record<string, IItem>;
  on?: {
    visit_component?: (item: IItem) => void;
    visit?: (meta: IMeta, item: IItem) => void;
  };
  set_meta?: boolean;
  note?: string;
  mode: "page" | "comp";
};

export type GenMetaArg = {
  item: IContent;
  is_root?: boolean;
  jsx_prop?: IMeta["jsx_prop"];
  ignore_first_component?: boolean;
  parent?: {
    item: IItem;
    instance_id?: string;
    comp?: IItem;
    root_instances?: Record<string, Record<string, string>>;
  };
};

export type ISimpleMeta = {
  id: string;
  comp?: {
    id: string;
    instances: Record<string, Record<string, string>>;
  };
  parent?: {
    id: string;
    instance_id?: string;
    comp_id?: string;
  };
};

export type IMeta = {
  item: IItem;
  mitem?: MItem;
  parent?: {
    id: string;
    instance_id?: string;
    comp_id?: string;
  };
  instances?: Record<string, Record<string, string>>;
  jsx_prop?: {
    name: string;
    comp_id: string;
    is_root: boolean;
  };
  script?: {
    passprop?: any;
    result: ReactNode;
    Local: ReturnType<typeof createViLocal>;
    PassProp: ReturnType<typeof createViPassProp>;
  };
  render?: () => void;
};
