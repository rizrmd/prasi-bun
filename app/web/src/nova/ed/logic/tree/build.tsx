import { PG, active } from "../ed-global";

export const treeRebuild = async (p: PG, arg?: { note?: string }) => {
  console.log(p.comp.list);
};

export const getMRoot = (p: PG) => {
  const root = p.page.doc?.getMap("map").get("root");
  if (root) {
    return p.page.root_id === "root"
      ? root
      : p.page.meta[p.page.root_id].mitem?.get("childs")?.get(0);
  }
};

export const getMetaById = (p: PG, id: string) => {
  if (active.comp_id) {
    if (p.comp.list[active.comp_id])
      return p.comp.list[active.comp_id].meta[id];
  } else {
    return p.page.meta[id];
  }
};
