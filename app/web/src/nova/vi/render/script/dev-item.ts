import { IMeta } from "../../utils/types";

export const devItem = (meta: IMeta) => {
  console.log(meta);
  return meta.item;
}