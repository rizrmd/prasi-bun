import { EdMeta } from "../../ed/logic/ed-global";

export const ViewGlobal = {
  mode: "init" as "init" | "ready",
  meta: {} as Record<string, EdMeta>,
  entry: [] as string[],
};

export type VG = typeof ViewGlobal & { render: () => void };
