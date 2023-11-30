import { ReactElement, ReactNode } from "react";
import { IContent } from "../../../utils/types/general";
import { IText } from "../../../utils/types/text";
import { EdMeta } from "../../ed/logic/ed-global";

export const ViewGlobal = {
  mode: "" as "desktop" | "mobile",
  status: "init" as "init" | "load-code" | "loading-code" | "ready" | "rebuild",
  current: { site_id: "", page_id: "" },
  layout: { show: false },
  meta: {} as Record<string, EdMeta>,
  entry: [] as string[],
  body_cache: null as null | ReactElement,
  component: {
    load: async (id_comp: string) => { },
  },
  script: {
    api_url: "",
    db: null as any,
    api: null as any,
  },
  view: {
    hidden: undefined as undefined | ((item: IContent) => boolean),
    active: undefined as
      | undefined
      | {
        get: (item: IContent) => boolean;
        set: (id: string) => void;
        text?: (item: IText) => ReactNode
      },
    hover: undefined as
      | undefined
      | { get: (item: IContent) => boolean; set: (id: string) => void },
  },
};

export type VG = typeof ViewGlobal & { render: () => void };
