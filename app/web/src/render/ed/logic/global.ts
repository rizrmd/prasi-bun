import { clientStartSync } from "../../../utils/sync/client";

export const EDGlobal = {
  sync: null as unknown as ReturnType<typeof clientStartSync>,
};
