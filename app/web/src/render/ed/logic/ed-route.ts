import { PG } from "./ed-global";

export const edRoute = async (p: PG) => {
  if (p.status === "init") {
    if (!p.site.domain && !p.site.name) {
      p.status = "loading";
      const site = await p.sync.site.load(p.site.id);
      if (!site) {
        p.status = "site-not-found";
        p.render();
        return;
      }

      p.site = site;
    }

    if (p.site) {
      console.log(p.site);
    }
  }
};
