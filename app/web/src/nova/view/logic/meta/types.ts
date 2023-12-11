import { ReactNode } from "react";
import { IContent } from "../../../../utils/types/general";
import { IItem, MItem } from "../../../../utils/types/item";

export type GenMetaP = {
  meta: Record<string, IMeta>;
  comps: Record<string, { comp: IItem }>;
  on?: {
    visit_component?: (id: string) => void;
    visit?: (meta: IMeta) => void;
    item_exists?: (arg: { old: IMeta; new: IMeta }) => void;
    item_new?: (arg: { new: IMeta }) => void;
  };
  smeta?: Record<string, ISimpleMeta>;
  set_meta?: boolean;
};

export type GenMetaArg = {
  item: IContent;
  is_root?: boolean;
  jsx_prop?: IMeta["jsx_prop"];
  parent?: {
    item: IItem;
    comp?: IItem;
    instance?: IItem;
  };
};

export type ISimpleMeta = {
  id: string;
  comp?: {
    id: string;
    ref_ids: Record<string, string>;
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
  jsx_prop?: {
    name: string;
    comp_id: string;
    is_root: boolean;
  };
  script?: {
    el: ReactNode;
  };
  scope: {
    val?: any;
    def?: {
      props?: Record<string, { value: string; visible: boolean }>;
      local?: {
        name: string;
        idx: number;
        idxval: Record<string, number>;
        src: string;
      };
      pass?: Record<string, { src: string; idx: number }>;
    };
  };
};
