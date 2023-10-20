import { PG } from "./global";

export const edRoute = async (p: PG) => {
  if (!p.site.domain && !p.site.name) {
    const res = await p.sync.site.load(p.site.id);
    console.log(res);
  }
};
