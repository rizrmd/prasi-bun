import { TypedArray } from "yjs-types";
import { genMeta } from "../../../../web/src/nova/vi/meta/meta";
import { simplifyMeta } from "../../../../web/src/nova/vi/meta/simplify";
import { IMeta } from "../../../../web/src/nova/vi/utils/types";
import { IItem, MItem } from "../../../../web/src/utils/types/item";
import {
  FMComponent,
  FNComponent,
} from "../../../../web/src/utils/types/meta-fn";
import { MText } from "../../../../web/src/utils/types/text";
import { SAction } from "../actions";
import { loadComponent } from "../editor/load-component";
import { parseJs } from "../editor/parser/parse-js";
import { docs } from "../entity/docs";
import { SyncConnection } from "../type";
import { createId } from "@paralleldrive/cuid2";

export const comp_new: SAction["comp"]["new"] = async function (
  this: SyncConnection,
  arg
) {
  const { group_id, item, item_id, page_id, comp_id } = arg;

  const comp = await createComp(item, group_id);

  const walk = (mitem: MItem | MText) => {
    if (mitem.get("id") === item_id) {
      const map = new Y.Map() as FMComponent;
      syncronize(
        map as any,
        {
          id: comp.id,
          ref_ids: {},
          props: {},
        } as FNComponent
      );
      mitem.set("id", createId());
      mitem.set("originalId", item_id);
      mitem.set("component", map);
      mitem.set("childs", new Y.Array());
    }

    const childs = mitem.get("childs") as TypedArray<MItem | MText>;
    if (childs) walkArray(childs);
  };
  const walkArray = (mitems: TypedArray<MItem | MText>) => {
    mitems.forEach((item: MItem) => {
      const mcomp = item.get("component");
      if (mcomp && item.get("type") === "item") {
        mcomp.get("props")?.forEach((e) => {
          if (e.get("meta")?.get("type") === "content-element") {
            const content = e.get("content") as MItem;
            if (content) {
              walk(content);
            }
          }
        });
      }

      walk(item);
    });
  };
  if (page_id) {
    const doc = docs.page[page_id].doc;
    doc.transact(() => {
      const root = doc.getMap("map").get("root");
      if (root) {
        root.get("childs")?.forEach((e) => {
          walk(e);
        });
      }
    });
  } else if (comp_id) {
    const doc = docs.comp[comp_id].doc;
    doc.transact(() => {
      const root = doc.getMap("map").get("root");
      if (root) {
        root.get("childs")?.forEach((e) => {
          walk(e);
        });
      }
    });
  }

  if (comp) {
    const load = await loadComponent(comp.id, this);

    if (load) {
      const mitem = docs.comp[comp.id].doc.getMap("map").get("root");
      const citem = mitem?.toJSON() as IItem;
      const smeta: Record<string, IMeta> = {};
      genMeta(
        {
          comps: {},
          meta: smeta,
          on: {
            visit(meta) {
              if (typeof meta.item.adv?.js === "string") {
                meta.scope.def = parseJs(meta.item.adv?.js);
              }
            },
          },
        },
        { item: citem, ignore_first_component: true }
      );

      return {
        id: comp.id,
        meta: simplifyMeta(smeta),
        snapshot: load.snapshot,
      };
    }
  }
};

const createComp = async (item: any, group_id: string) => {
  const comp = await db.component.create({
    data: {
      name: item.name,
      content_tree: {},
      component_group: {
        connect: {
          id: group_id,
        },
      },
    },
  });

  if (comp) {
    item.component = {
      id: comp.id,
      props: {},
      ref_ids: {},
    };
    await db.component.update({
      where: { id: comp.id },
      data: { content_tree: item },
    });
    comp.content_tree = item;
  }
  return comp;
};
