import { ActionCtx } from "../type";

export const site_group = async function (this: ActionCtx) {
  console.log(this.user);
  return "gruop";
};
