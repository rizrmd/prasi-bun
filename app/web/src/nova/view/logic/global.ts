import { ReactElement } from "react";
import { EdMeta } from "../../ed/logic/ed-global";

export const ViewGlobal = {
  mode: "init" as "init" | "load-code" | "loading-code" | "ready" | "rebuild",
  current: { site_id: "", page_id: "" },
  meta: {} as Record<string, EdMeta>,
  entry: [] as string[],
  bodyCache: null as null | ReactElement,
};

export type VG = typeof ViewGlobal & { render: () => void };
