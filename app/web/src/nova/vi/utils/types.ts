import { ReactNode } from "react";
import { parseJs } from "../../../../../srv/ws/sync/editor/parser/parse-js";
import { IContent } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { createViLocal } from "../render/script/local";
import { createViPassProp } from "../render/script/passprop";

export type GenMetaP = {
  meta: Record<string, IMeta>;
  comps: Record<string, { comp: IItem; smeta: Record<string, ISimpleMeta> }>;
  on?: {
    visit_component?: (id: string) => void;
    visit?: (meta: IMeta) => void;
    item_exists?: (arg: { old: IMeta; new: IMeta }) => void;
    item_new?: (arg: { new: IMeta }) => void;
  };
  smeta?: Record<string, ISimpleMeta>;
  set_meta?: boolean;
  note?: string;
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
  scope: IMeta["scope"]["def"];
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
  script?: Record<
    string,
    {
      result: ReactNode;
      Local: ReturnType<typeof createViLocal>;
      PassProp: ReturnType<typeof createViPassProp>;
    }
  >;
  scope: {
    def?: ReturnType<typeof parseJs>;
  };
  render?: () => void;
};
