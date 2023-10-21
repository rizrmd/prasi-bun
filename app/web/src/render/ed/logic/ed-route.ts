import { IRoot } from "../../../utils/types/root";
import { PG } from "./ed-global";
import { produce } from "immer";
import { treeRebuild } from "./tree/build";
export const edRoute = async (p: PG) => {
  if (p.status === "ready") {
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

    if (p.page.current.id !== params.page_id || !p.page.current.snapshot) {
      p.status = "loading";
      const page = await p.sync.page.load(params.page_id);

      if (!page) {
        p.status = "page-not-found";
        p.render();
        return;
      }

      p.page.current = page;
      if (page.snapshot) {
        const doc = new Y.Doc();
        Y.applyUpdate(doc, page.snapshot);
        p.page.doc = doc as any;

        if (p.page.doc) {
          treeRebuild(p);
        }
      }
      p.status = "ready";
      p.render();
    }
  }
};
