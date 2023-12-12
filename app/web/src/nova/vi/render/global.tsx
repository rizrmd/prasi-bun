import { IMeta } from "../../ed/logic/ed-global";

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
};

export type VG = typeof ViGlobal & { render: () => void };
