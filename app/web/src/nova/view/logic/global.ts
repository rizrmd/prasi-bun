import { ReactElement, ReactNode } from "react";
import { IMeta, IScope } from "../../ed/logic/ed-global";

export const ViewGlobal = {
  mode: "" as "desktop" | "mobile",
  status: "init" as "init" | "load-code" | "loading-code" | "ready" | "rebuild",
  current: { site_id: "", page_id: "" },
  layout: { show: false },
  meta: {} as Record<string, IMeta>,
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
    hidden: undefined as undefined | ((meta: IMeta) => boolean),
    active: undefined as
      | undefined
      | {
          get: (meta: IMeta) => boolean;
          set: (meta: IMeta) => void;
          text?: (arg: { meta: IMeta }) => ReactNode;
        },
    hover: undefined as
      | undefined
      | { get: (meta: IMeta) => boolean; set: (meta: IMeta) => void },
  },
};

export type VG = typeof ViewGlobal & { render: () => void };
