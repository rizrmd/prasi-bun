import { createId } from "@paralleldrive/cuid2";
import { decompress } from "wasm-gzip";
import { syncronize } from "y-pojo";
import { TypedArray, TypedMap } from "yjs-types";
import { MContent } from "../../../../utils/types/general";
import { IItem, MItem } from "../../../../utils/types/item";
import {
  FMCompDef,
  FMComponent,
  FNCompDef,
  FNComponent,
} from "../../../../utils/types/meta-fn";
import { DComp } from "../../../../utils/types/root";
import { MSection } from "../../../../utils/types/section";
import { EdMeta, PG } from "../ed-global";

export const treeRebuild = async (p: PG, arg?: { note?: string }) => {
  const doc = p.page.doc;
  if (!doc) return;

  const root = doc.getMap("map").get("root");
  if (root) {
    p.page.building = true;
    p.render();

    const sections = root.get("childs");
    if (sections) {
      const loaded = new Set<string>();
      await Promise.all(
        sections.map((e) => {
          return walkLoad(p, e, loaded);
        })
      );
    }
    doc.transact(async () => {
      p.page.entry = [];
      p.page.tree = [];
      p.page.meta = {};

      const portal = {
        in: {} as Record<string, EdMeta>,
        out: {} as Record<string, EdMeta>,
      };
      const sections = root.get("childs");
      if (sections) {
        sections.map((e) => {
          p.page.entry.push(e.get("id"));
          walkMap(p, { mitem: e, parent_item: { id: "root" }, portal });
        });

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
    });

    p.page.building = false;
    p.render();
    p.page.render();
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
      if (!item[k]) item[k] = [];
      const childs = e as unknown as TypedArray<{}>;
      childs.forEach((c) => {
        item[k].push({ id: c.get("id") });
      });
    }
  });
};

const walkLoad = async (p: PG, mitem: MItem, loaded: Set<string>) => {
  const mcomp = mitem.get("component");
  if (mcomp) {
    const id = mcomp.get("id");
    const comp = mcomp.toJSON() as FNComponent;
    if (id) {
      loaded.add(id);
      if (!p.comp.list[id]) {
        await loadComponent(p, comp.id);
      }

      const pcomp = p.comp.list[id];
      if (pcomp) {
        const pitem = pcomp.doc.getMap("map").get("root");
        if (pitem && !loaded.has(id)) {
          await walkLoad(p, pitem, loaded);
        }
      }
    }

    for (const [propName, prop] of Object.entries(comp.props || {})) {
      if (prop.meta?.type === "content-element") {
        const mprop = mcomp.get("props")?.get(propName);
        if (mprop) {
          const mcontent = ensurePropContent(mprop, propName);
          if (mcontent) {
            await walkLoad(p, mcontent, loaded);
          }
        }
      }
    }
  }

  for (const e of mitem.get("childs")?.map((e) => e) || []) {
    await walkLoad(p, e, loaded);
  }
};

const walkMap = (
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
  let override_id = "";
  const id = mitem.get("id");

  let skip_tree = arg.skip_add_tree;
  let skip_tree_child = skip_tree;
  if (id && p.ui.tree.item_loading.includes(id)) {
    skip_tree_child = true;
  }

  if (parent_comp && id) {
    const fcomp = parent_comp.mitem.get("component");
    if (fcomp) {
      const ref_ids = fcomp.get("ref_ids");

      if (ref_ids) {
        let ref_id = ref_ids.get(id);

        if (!ref_id) {
          ref_id = createId();
          ref_ids.set(id, ref_id);
        }
        override_id = ref_id;
      }
    }
  }

  mapItem(mitem, item);

  if (override_id) {
    item.id = override_id;
  }

  const item_comp = item.component;
  const mitem_comp = mitem.get("component");
  const metaNotFound = () => {
    if (!skip_tree) {
      p.page.tree.push({
        id: item.id,
        parent: parent_item.id,
        text: item.name,
      });
    }
  };

  if (item_comp && item_comp.id && parent_item.id !== "root") {
    if (!p.comp.list[item_comp.id]) {
      return;
    }

    const ref_comp = p.comp.list[item_comp.id];

    if (ref_comp && mitem_comp) {
      const mcomp = ref_comp.doc.getMap("map").get("root");

      if (mcomp) {
        let ref_ids: Record<string, string> = item_comp.ref_ids;
        if (!ref_ids) {
          mitem_comp.set("ref_ids", new Y.Map() as any);
          ref_ids = {};
        }
        const original_id = item.id;
        mapItem(mcomp, item);
        item.id = original_id;

        const meta: EdMeta = {
          item,
          mitem: mitem as MItem,
          parent_item,
          parent_comp,
        };
        p.page.meta[item.id] = meta;

        if (!skip_tree) {
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
                    walkMap(p, {
                      mitem: mcontent,
                      parent_item: { id: item.id, mitem: mitem as MItem },
                      parent_comp: { mitem: mitem as MItem, mcomp },
                      portal: arg.portal,
                      skip_add_tree: skip_tree_child,
                    });
                  }
                }
              }
            }
          }
        }

        const childs = mcomp.get("childs")?.map((e) => e) || [];
        for (const e of childs) {
          walkMap(p, {
            mitem: e,
            parent_item: { id: item.id, mitem: mitem as MItem },
            parent_comp: { mitem: mitem as MItem, mcomp },
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

  if (!skip_tree) {
    p.page.tree.push({
      id: item.id,
      parent: parent_item.id,
      text: item.name,
      data: meta,
    });
  }

  const childs = mitem.get("childs")?.map((e) => e) || [];
  for (const e of childs) {
    walkMap(p, {
      mitem: e,
      parent_item: { id: item.id, mitem: mitem as MItem },
      parent_comp: arg.parent_comp,
      portal: arg.portal,
      skip_add_tree: skip_tree_child,
    });
  }
};

export const loadComponent = async (p: PG, id_comp: string) => {
  const cur = await p.sync.comp.load(id_comp);
  if (cur && cur.snapshot) {
    const doc = new Y.Doc() as DComp;
    if (cur.snapshot) {
      Y.applyUpdate(doc as any, decompress(cur.snapshot));
      p.comp.map[id_comp] = {
        id: id_comp,
        item: doc.getMap("map").get("root")?.toJSON() as IItem,
      };
      p.comp.list[id_comp] = { comp: cur, doc };
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
