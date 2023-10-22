import { createId } from "@paralleldrive/cuid2";
import { MContent } from "../../../../utils/types/general";
import { IItem, MItem } from "../../../../utils/types/item";
import { DComp } from "../../../../utils/types/root";
import { MSection } from "../../../../utils/types/section";
import { EdMeta, PG } from "../ed-global";
import {
  FMCompDef,
  FMComponent,
  FNCompDef,
  FNComponent,
} from "../../../../utils/types/meta-fn";
import { syncronize } from "y-pojo";
import { TypedMap } from "yjs-types";

export const treeRebuild = async (p: PG) => {
  const root = p.page.doc?.getMap("map").get("root");
  if (root) {
    p.page.entry = [];
    p.page.tree = [];
    p.page.meta = {};

    const portal = {
      in: {} as Record<string, EdMeta>,
      out: {} as Record<string, EdMeta>,
    };
    const sections = root.get("childs");
    if (sections) {
      await Promise.all(
        sections.map(async (e) => {
          p.page.entry.push(e.get("id"));
          await walkMap(p, { mitem: e, parent_item: { id: "root" }, portal });
        })
      );

      for (const [k, portal_out] of Object.entries(portal.out)) {
        const name = k.replace(/⮕/gi, "").trim();
        const portal_in = portal.in[`⬅${name}`];
        if (portal_in) {
          for (const key of Object.keys(portal_in)) {
            delete (portal_in as any)[key];
          }
          for (const [k, v] of Object.entries(portal_out)) {
            (portal_in as any)[k] = v;
          }
        }
      }
    }
    p.render();
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
    portal: {
      in: Record<string, EdMeta>;
      out: Record<string, EdMeta>;
    };
    parent_item: EdMeta["parent_item"];
    parent_comp?: EdMeta["parent_comp"];
    skip_add_tree?: boolean;
  }
) => {
  const { mitem, parent_item, parent_comp } = arg;

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

  const item_comp = item.component;

  const metaNotFound = () => {
    if (!arg.skip_add_tree) {
      p.page.tree.push({
        id: item.id,
        parent: parent_item.id,
        text: item.name,
      });
    }
  };

  if (item_comp && item_comp.id && parent_item.id !== "root") {
    if (!p.comp.list[item_comp.id]) {
      if (!(await loadComponent(p, item_comp))) {
        console.log("not found");
        metaNotFound();
        return;
      }
    }

    const ref_comp = p.comp.list[item_comp.id];
    if (ref_comp) {
      const mcomp = ref_comp.doc.getMap("map").get("item");
      if (mcomp) {
        const ref_ids: Record<string, string> = {};

        mapItemComp({ parent_comp, item, mcomp, ref_ids });

        const meta: EdMeta = {
          item,
          mitem: mitem as MItem,
          parent_item,
          parent_comp,
        };
        p.page.meta[item.id] = meta;
        if (!arg.skip_add_tree) {
          p.page.tree.push({
            id: item.id,
            parent: parent_item.id,
            text: item.name,
            data: meta,
          });
        }

        const mprops = mcomp.get("component")?.get("props")?.toJSON() as Record<
          string,
          FNCompDef
        >;

        if (mprops) {
          const mitem_comp = mitem.get("component");
          if (mitem_comp) {
            const mitem_props = ensureMItemProps(mitem_comp, item_comp);
            if (mitem_props) {
              for (const [k, v] of Object.entries(mprops)) {
                const mprop = ensureMProp(mitem_props, k, v);
                item_comp.props[k] = v;
                if (mprop && v.meta?.type === "content-element") {
                  const mcontent = ensurePropContent(mprop, k);
                  if (mcontent) {
                    console.log(p.page.meta[item.id]);

                    await walkMap(p, {
                      mitem: mcontent,
                      parent_item: { id: item.id, mitem: mitem as MItem },
                      parent_comp: { ref_ids, mcomp },
                      portal: arg.portal,
                    });
                  }
                }
              }
            }
          }
        }

        const childs = mcomp.get("childs")?.map((e) => e) || [];
        for (const e of childs) {
          await walkMap(p, {
            mitem: e,
            parent_item: { id: item.id, mitem: mitem as MItem },
            parent_comp: { ref_ids, mcomp },
            skip_add_tree: true,
            portal: arg.portal,
          });
        }
        return;
      }
    }

    metaNotFound();
    return;
  }

  const meta: EdMeta = {
    item,
    mitem: mitem as MItem,
    parent_item,
    parent_comp,
  };

  if (item.name.startsWith("⬅")) {
    arg.portal.in[item.name] = meta;
  }
  if (item.name.startsWith("⮕")) {
    arg.portal.out[item.name] = meta;
  }

  p.page.meta[item.id] = meta;

  if (!arg.skip_add_tree) {
    p.page.tree.push({
      id: item.id,
      parent: parent_item.id,
      text: item.name,
      data: meta,
    });
  }

  const childs = mitem.get("childs")?.map((e) => e) || [];
  for (const e of childs) {
    await walkMap(p, {
      mitem: e,
      parent_item: { id: item.id, mitem: mitem as MItem },
      portal: arg.portal,
    });
  }
};

const loadComponent = async (p: PG, item_comp: FNComponent) => {
  const cur = await p.sync.comp.load(item_comp.id);
  if (cur && cur.snapshot) {
    const doc = new Y.Doc() as DComp;
    if (cur.snapshot) {
      Y.applyUpdate(doc as any, cur.snapshot);
      p.comp.list[item_comp.id] = { cur, doc };
      return true;
    }
  }
  return false;
};

const ensurePropContent = (mprop: FMCompDef, k: string) => {
  let mcontent = mprop.get("content");
  if (!mcontent) {
    const newcontent = new Y.Map();
    syncronize(newcontent, {
      id: createId(),
      name: k,
      type: "item",
      dim: { w: "full", h: "full" },
      childs: [],
      adv: {
        css: "",
      },
    });
    mprop.set("content", newcontent as MItem);
    mcontent = mprop.get("content");
  }
  return mcontent;
};

const ensureMProp = (
  mitem_props: TypedMap<Record<string, FMCompDef>>,
  k: string,
  v: FNCompDef
) => {
  let mprop = mitem_props.get(k);
  if (!mprop) {
    const newprop = new Y.Map();
    syncronize(newprop, v);
    mitem_props.set(k, newprop as FMCompDef);
    mprop = mitem_props.get(k);
  }
  return mprop;
};

const ensureMItemProps = (mitem_comp: FMComponent, item_comp: FNComponent) => {
  let mitem_props = mitem_comp.get("props");
  if (!mitem_props) {
    mitem_comp.set("props", new Y.Map() as any);
    mitem_props = mitem_comp.get("props");
  }
  if (!item_comp.props) {
    item_comp.props = {};
  }
  return mitem_props;
};

const mapItemComp = (arg: {
  parent_comp: EdMeta["parent_comp"];
  mcomp: MItem;
  item: IItem;
  ref_ids: Record<string, string>;
}) => {
  const { parent_comp, mcomp, item, ref_ids } = arg;
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
};
