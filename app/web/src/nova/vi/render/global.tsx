import { IMeta } from "../../ed/logic/ed-global";
import { viParts } from "./parts";

export const ViGlobal = {
  status: "init" as "init" | "loading" | "ready",
  meta: {} as Record<string, IMeta>,
  tick: 0,
  site: {
    id: "",
    api_url: "",
    api: null as any,
    db: null as any,
  },
  visit: undefined as
    | undefined
    | ((meta: IMeta, parts: ReturnType<typeof viParts>) => void),
};

export type VG = typeof ViGlobal & { render: () => void };
