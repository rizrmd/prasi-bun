import { ReactElement } from "react";
import { IContent } from "../../../utils/types/general";
import { EdMeta, PG } from "../../ed/logic/ed-global";
import { IRoot } from "../../../utils/types/root";

export const ViewGlobal = {
  mode: "" as "desktop" | "mobile",
  status: "init" as "init" | "load-code" | "loading-code" | "ready" | "rebuild",
  current: { site_id: "", page_id: "" },
  layout: { show: false },
  meta: {} as Record<string, EdMeta>,
  entry: [] as string[],
  bodyCache: null as null | ReactElement,
  component: {
    load: async (id_comp: string) => {},
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
      | { get: (item: IContent) => boolean; set: (id: string) => void },
    hover: undefined as
      | undefined
      | { get: (item: IContent) => boolean; set: (id: string) => void },
  },
};

export type VG = typeof ViewGlobal & { render: () => void };
