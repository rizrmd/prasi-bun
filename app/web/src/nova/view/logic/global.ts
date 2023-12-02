import { ReactElement, ReactNode } from "react";
import { EdMeta, IScope } from "../../ed/logic/ed-global";

export const ViewGlobal = {
  mode: "" as "desktop" | "mobile",
  status: "init" as "init" | "load-code" | "loading-code" | "ready" | "rebuild",
  current: { site_id: "", page_id: "" },
  layout: { show: false },
  meta: {} as Record<string, EdMeta>,
  scope: null as null | IScope,
  entry: [] as string[],
  body_cache: null as null | ReactElement,
  component: {
    load: async (id_comp: string) => {},
  },
  script: {
    api_url: "",
    db: null as any,
    api: null as any,
  },
  view: {
    hidden: undefined as undefined | ((meta: EdMeta) => boolean),
    active: undefined as
      | undefined
      | {
          get: (meta: EdMeta) => boolean;
          set: (meta: EdMeta) => void;
          text?: (meta: EdMeta) => ReactNode;
        },
    hover: undefined as
      | undefined
      | { get: (meta: EdMeta) => boolean; set: (meta: EdMeta) => void },
  },
};

export type VG = typeof ViewGlobal & { render: () => void };
