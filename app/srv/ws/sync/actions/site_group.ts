import { SyncConnection } from "../type";

export const site_group = async function (this: SyncConnection) {
  console.log(this.user);
  return "gruop";
};
