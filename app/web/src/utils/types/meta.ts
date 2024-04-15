import type { parseJs } from "../../../../srv/ws/sync/editor/parser/parse-js";
import {
  FMAdv,
  FMBackground,
  FMBorder,
  FMComponent,
  FMDimension,
  FMFont,
  FMLayout,
  FMPadding,
  FNBackground,
  FNBorder,
  FNDimension,
  FNFont,
  FNPadding,
} from "./meta-fn";

export type MetaItem = {
  id: string;
  originalId?: string;
  type: "text" | "section" | "item";
  name: string;
  field?: string;
  html?: string;
  text?: string;
  hidden?: "only-editor" | "all" | false;
};

export type BasicItem = {
  padding?: FNPadding;
  bg?: FNBackground;
  font?: FNFont;
  dim?: FNDimension;
  border?: FNBorder;
  script?: ReturnType<typeof parseJs>;
  script_keyed?: Record<string, ReturnType<typeof parseJs>>;
  typings?: string;
};

export type MBasicItem = {
  padding?: FMPadding;
  bg?: FMBackground;
  font?: FMFont;
  component?: FMComponent;
  dim?: FMDimension;
  layout?: FMLayout;
  adv?: FMAdv;
  border?: FMBorder;
  script?: ReturnType<typeof parseJs>;
};
