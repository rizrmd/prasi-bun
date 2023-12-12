import { IMeta } from "../../ed/logic/ed-global";

export const ViGlobal = {
  meta: {} as Record<string, IMeta>,
  tick: 0,
};

export type VG = typeof ViGlobal;
