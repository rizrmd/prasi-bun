import { IItem } from "../../../../utils/types/item";
import { IMeta } from "../../utils/types";

type PrasiEdit = {
  update: (fn: () => Promise<void> | void) => void;
};

export const devItem = (meta: IMeta) => {
  return { ...meta.item, update: async () => {} } as IItem & PrasiEdit;
};
