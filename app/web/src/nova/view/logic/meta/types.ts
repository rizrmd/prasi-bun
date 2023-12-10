import { IContent, MContent } from "../../../../utils/types/general";
import { IItem, MItem } from "../../../../utils/types/item";

export type GenMetaP = {
  meta: Record<string, IMeta>;
  comps: Record<string, { comp: IItem; mcomp?: MItem }>;
  on?: {
    visit_component?: (id: string) => void;
    visit?: (meta: IMeta) => void;
    item_exists?: (arg: { old: IMeta; new: IMeta }) => void;
    item_new?: (arg: { new: IMeta }) => void;
  };
  set_mitem?: boolean;
  set_meta?: boolean;
};

export type GenMetaArg = {
  item: IContent;
  is_root?: boolean;
  mitem?: MContent;
  jsx_prop?: IMeta["jsx_prop"];
  parent?: {
    item: IItem;
    mitem?: MItem;
    comp?: IItem;
    mcomp?: MItem;
    instance?: IItem;
    minstance?: MItem;
  };
};

export type IMeta = {
  item: IItem;
  mitem?: MItem;
  parent?: {
    id: string;
    instance_id?: string;
    comp_id?: string;
    minstance?: MItem;
    mcomp?: MItem;
  };
  jsx_prop?: {
    name: string;
    is_root: boolean;
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
