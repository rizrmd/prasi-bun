import { initLoadComp } from "../../../../web/src/nova/vi/meta/comp/init-comp-load";
import { genMeta } from "../../../../web/src/nova/vi/meta/meta";
import { GenMetaP } from "../../../../web/src/nova/vi/utils/types";
import { IItem } from "../../../../web/src/utils/types/item";
import { IRoot } from "../../../../web/src/utils/types/root";
import { docs } from "../entity/docs";
import { snapshot } from "../entity/snapshot";
import { SyncConnection } from "../type";
import { loadComponent, userSyncComponent } from "./load-component";
import { parseJs } from "./parser/parse-js";

export const prepContentTree = async (
  page_id: string,
  ctree: any,
  sync: SyncConnection
) => {
  const root = ctree as IRoot;

  root.id_page = page_id;
  root.component_ids = await loadCompForPage(ctree, sync);

  const comps: GenMetaP["comps"] = {};
  for (const id of root.component_ids) {
    const comp = docs.comp[id].doc.getMap("map").get("root")?.toJSON() as IItem;
    if (comp) comps[id] = comp;
  }

  const meta = {};
  genMeta(
    {
      comps,
      meta,
      on: {
        visit(meta, item) {
          if (item.adv?.js) {
            item.script = parseJs(item.adv.js);
          }
        },
      },
      mode: "page",
    },
    { item: root as unknown as IItem }
  );

  return root;
};

export const loadCompForPage = async (ctree: IRoot, sync: SyncConnection) => {
  const meta: GenMetaP["meta"] = {};
  const mcomps: GenMetaP["comps"] = {};
  const result = new Set<string>();
  const loading = {} as Record<string, Promise<void>>;
  const should_save = {} as Record<string, IItem>;
  if (ctree && ctree.childs) {
    for (const child of ctree.childs) {
      await initLoadComp(
        { comps: mcomps, meta, mode: "page" },
        child as unknown as IItem,
        {
          visit(meta, item, shared) {
            if (item.adv?.js) {
              let script = undefined;
              script = parseJs(item.adv.js);
              if (
                !item.script ||
                Object.keys(script || {}).length !==
                  Object.keys(item.script || {}).length
              ) {
                shared.should_save = true;
                item.script = script;
              }
            }
          },
          async done(shared) {
            if (shared.should_save && shared.root.component?.id) {
              should_save[shared.root.component.id] = shared.root;
            }
          },
          load: async (comp_ids) => {
            for (const id of comp_ids) {
              if (!docs.comp[id]) {
                if (typeof loading[id] === "undefined") {
                  loading[id] = new Promise<void>(async (resolve) => {
                    await loadComponent(id, sync);
                    resolve();
                  });
                }
                await loading[id];
              } else {
                userSyncComponent(sync, id);
              }

              if (docs.comp[id]) {
                result.add(id);
                mcomps[id] = docs.comp[id].doc
                  .getMap("map")
                  .get("root")
                  ?.toJSON() as IItem;
              }
            }
          },
        }
      );
    }
  }

  if (Object.keys(should_save).length > 0) {
    for (const [comp_id, v] of Object.entries(should_save)) {
      await _db.component.update({
        where: { id: comp_id },
        data: {
          content_tree: v,
          name: v.name,
        },
      });
      await snapshot.del("comp", comp_id);
      delete docs.comp[comp_id];
      await loadComponent(comp_id, sync);
    }
  }
  return [...result];
};
