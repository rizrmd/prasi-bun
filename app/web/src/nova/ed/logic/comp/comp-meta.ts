import { IMeta, PG, active } from "../ed-global";

export const getCompMeta = (p: PG, id: string, note?: string) => {
  if (active.comp_id) {
    const pmeta = p.page.meta[id];
    const cmeta = p.comp.list[active.comp_id].meta[id];

    if (!pmeta && cmeta) {
      return cmeta;
    }
  }
};
