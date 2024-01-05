import { IItem } from "../../../utils/types/item";
import { IMeta } from "../../ed/logic/ed-global";
import { viParts } from "./parts";

export const ViGlobal = {
  ts: 0,
  status: "init" as "init" | "loading" | "ready",
  meta: {} as Record<string, IMeta>,
  tick: 0,
  site: {
    id: "",
    api_url: "",
    api: null as any,
    db: null as any,
  },
  script: {
    init_local_effect: undefined as undefined | Record<string, boolean>,
  },
  visit: undefined as
    | undefined
    | ((meta: IMeta, parts: ReturnType<typeof viParts>) => void),
};

export type VG = typeof ViGlobal & { render: () => void };
