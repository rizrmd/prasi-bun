import { code } from "../../code";

export const initTypings = async (root_dir: string, id_site: string) => {
  code.internal.typings[id_site] = true as any;
};
