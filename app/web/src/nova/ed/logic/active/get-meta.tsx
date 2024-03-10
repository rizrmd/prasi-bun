import { PG, active } from "../ed-global";

export const getMetaById = (p: PG, id: string) => {
  if (active.comp_id) {
    if (p.comp.list[active.comp_id] && p.comp.list[active.comp_id].meta) {
      const meta = p.comp.list[active.comp_id].meta[id];
      if (meta) {
        return meta;
      } else if (p.comp.list[active.comp_id].meta) {
        for (const v of Object.values(p.comp.list[active.comp_id].meta)) {
          if (v.item.id === id) return v;
        }
      }
    }
  } else {
    return p.page.meta[id];
  }
};

export const getActiveMeta = (p: PG) => {
  const meta = getMetaById(p, active.item_id);
  if (meta) return meta;

  if (active.comp_id) {
    const comp = p.comp.list[active.comp_id];
    if (comp) {
      const first = comp.tree.find((e) => e.parent === "root");
      if (first && first.data?.item) return first.data;
    }
  }

  const first = p.page.tree.find((e) => e.parent === "root");
  if (first && first.data?.item) return first.data;
};
