import { IItem } from "../../../../../utils/types/item";
import { genMeta } from "../meta";
import { GenMetaP } from "../types";

export const initLoadComp = async (
  p: GenMetaP,
  item: IItem,
  load: (comp_ids: string[]) => Promise<void>
) => {
  const comp_ids: string[] = [];
  genMeta(
    {
      ...p,
      on: {
        visit_component: async (id) => {
          comp_ids.push(id);
          return { item: null as any };
        },
      },
      set_meta: false,
    },
    { item }
  );

  if (comp_ids.length > 0) {
    await load(comp_ids);
    await initLoadComp(p, item, load);
  }
};
