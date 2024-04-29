import { code } from "../../code";

export const initFrontEnd = async (root: string, id_site: string) => {
  const existing = code.internal.frontend[id_site];
  if (existing) {
    await existing.dispose();
  }
  
  code.internal.frontend[id_site] = true as any;
};
