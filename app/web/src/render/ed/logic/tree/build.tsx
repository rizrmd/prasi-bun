import { createId } from "@paralleldrive/cuid2";
import { MContent } from "../../../../utils/types/general";
import { IItem, MItem } from "../../../../utils/types/item";
import { DComp } from "../../../../utils/types/root";
import { MSection } from "../../../../utils/types/section";
import { EdMeta, PG } from "../ed-global";

export const treeRebuild = async (p: PG) => {
  const root = p.page.doc?.getMap("map").get("root");
  if (root) {
    p.page.entry = [];
    p.page.tree = [];
    p.page.meta = {};

    const sections = root.get("childs");
    if (sections) {
      await Promise.all(
        sections.map(async (e) => {
          p.page.entry.push(e.get("id"));
          await walkMap(p, { mitem: e, tree_parent_id: "root" });
        })
      );
      console.log(p.page);
    }
  }
};

const mapItem = (mitem: MContent, item: any) => {
  mitem.forEach((e, k) => {
    if (k !== "childs") {
      let val = e;
      if (typeof e === "object" && e) {
        if ((e as any).toJSON) {
          val = e.toJSON() as any;
        }
      }
      item[k] = val;
    } else {
      item[k] = [];
    }
  });
};

const walkMap = async (
  p: PG,
  arg: {
    mitem: MItem | MSection;
    tree_parent_id: string;
    parent_comp?: EdMeta["parent_comp"];
  }
) => {
  const { mitem, tree_parent_id, parent_comp } = arg;

  const item = {} as unknown as IItem;
  mapItem(mitem, item);

  // sesuaikan item instance id dengan parent comp
  if (parent_comp) {
    if (!parent_comp["ref_ids"][item.id]) {
      parent_comp["ref_ids"][item.id] = createId();
    }

    if (parent_comp["ref_ids"][item.id]) {
      item.id = parent_comp["ref_ids"][item.id];
    }
  }

  const metaNotFound = () => {
    p.page.tree.push({
      id: item.id,
      parent: tree_parent_id,
      text: item.name,
    });
  };

  const item_comp = item.component;
  if (item_comp && item_comp.id) {
    if (!p.comp.list[item_comp.id]) {
      let found = false;
      const cur = await p.sync.comp.load(item_comp.id);
      if (cur && cur.snapshot) {
        const doc = new Y.Doc() as DComp;
        if (cur.snapshot) {
          Y.applyUpdate(doc as any, cur.snapshot);
          p.comp.list[item_comp.id] = { cur, doc };
          found = true;
        }
      }

      if (!found) {
        metaNotFound();
        return;
      }
    }

    const ref_comp = p.comp.list[item_comp.id];
    if (ref_comp) {
      const mcomp = ref_comp.doc.getMap("map").get("item");
      if (mcomp) {
        const ref_ids: Record<string, string> = {};

        if (parent_comp) {
          let old_id = item.id;
          mapItem(mcomp, item);
          ref_ids[item.id] = old_id;
          item.id = old_id;
        } else {
          mapItem(mcomp, item);
          ref_ids[item.id] = createId();
          item.id = ref_ids[item.id];
        }

        await Promise.all(
          mcomp.get("childs")?.map(async (e) => {
            await walkMap(p, {
              mitem: e,
              tree_parent_id: item.id,
              parent_comp: { ref_ids, mcomp },
            });
          }) || []
        );
        return;
      }
    }

    metaNotFound();

    return;
  }

  const meta: EdMeta = {
    item,
    mitem: mitem as MItem,
    parent_comp,
  };

  p.page.meta[item.id] = meta;

  p.page.tree.push({
    id: item.id,
    parent: tree_parent_id,
    text: item.name,
    data: meta,
  });

  const mchilds = mitem.get("childs");
  if (mchilds) {
    await Promise.all(
      mchilds.map(async (e, k) => {
        item.childs.push(e.get("id"));
        await walkMap(p, { mitem: e, tree_parent_id: item.id });
      }) || []
    );
  }
};
