import { IItem, MItem } from "../../../../utils/types/item";
import { MRoot } from "../../../../utils/types/root";
import { MSection } from "../../../../utils/types/section";
import { walk } from "../../../editor/logic/tree-logic";
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

const walkMap = async (
  p: PG,
  arg: { mitem: MItem | MSection; tree_parent_id: string }
) => {
  const { mitem, tree_parent_id } = arg;

  const item = {} as unknown as IItem;
  mitem.forEach((e, k) => {
    if (k !== "childs") {
      let val = e;
      if (typeof e === "object" && e) {
        if ((e as any).toJSON) {
          val = e.toJSON() as any;
        }
      }
      (item as any)[k] = val;
    } else {
      item[k] = [];
    }
  });

  const meta: EdMeta = {
    item,
    mitem: mitem as MItem,
  };

  p.page.meta[item.id] = meta;

  p.page.tree.push({
    id: item.id,
    parent: tree_parent_id,
    text: item.name,
    data: meta,
  });

  await Promise.all(
    mitem.get("childs")?.map(async (e, k) => {
      item.childs.push(e.get("id"));
      await walkMap(p, { mitem: e, tree_parent_id: item.id });
    }) || []
  );
};
