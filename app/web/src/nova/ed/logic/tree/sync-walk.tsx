import { NodeModel } from "@minoru/react-dnd-treeview";
import { createId } from "@paralleldrive/cuid2";
import { TypedArray } from "yjs-types";
import { MContent } from "../../../../utils/types/general";
import { IItem, MItem } from "../../../../utils/types/item";
import { FNCompDef, FNComponent } from "../../../../utils/types/meta-fn";
import { MSection } from "../../../../utils/types/section";
import { EdMeta, IScope, PG } from "../ed-global";
import { loadCompSnapshot } from "./sync-walk-comp";
import {
  ensureMItemProps,
  ensureMProp,
  ensurePropContent,
} from "./sync-walk-utils";

const comp_added = new Set<string>();

export const syncWalkLoad = async (
  p: PG,
  mitem: MItem,
  loadComponent: (id: string) => Promise<boolean>
) => {
  const mcomp = mitem.get("component");
  if (mcomp) {
    const id = mcomp.get("id");
    if (id && !comp_added.has(id)) {
      comp_added.add(id);
      const comp = mcomp.toJSON() as FNComponent;
      if (!p.comp.list[id]) {
        loadComponent(comp.id);
      }

      const pcomp = p.comp.list[id];
      if (pcomp) {
        const pitem = pcomp.doc.getMap("map").get("root");
        if (pitem) {
          await syncWalkLoad(p, pitem, loadComponent);
        }
      }
      for (const [propName, prop] of Object.entries(comp.props || {})) {
        if (prop.meta?.type === "content-element") {
          const mprop = mcomp.get("props")?.get(propName);
          if (mprop) {
            const mcontent = ensurePropContent(mprop, propName);
            if (mcontent) {
              await syncWalkLoad(p, mcontent, loadComponent);
            }
          }
        }
      }
    }
  }

  for (const e of mitem.get("childs")?.map((e) => e) || []) {
    await syncWalkLoad(p, e, loadComponent);
  }
};

export const syncWalkMap = (
  p: {
    note?: string;
    item_loading: PG["ui"]["tree"]["item_loading"];
    tree?: NodeModel<EdMeta>[];
    comps: PG["comp"]["list"];
    meta: Record<string, EdMeta>;
    component_not_found?: (comp_id: string) => void;
    scope?: null | IScope;
  },
  arg: {
    is_layout: boolean;
    mitem: MItem | MSection;
    portal: {
      in: Record<string, EdMeta>;
      out: Record<string, EdMeta>;
    };
    parent_item: EdMeta["parent_item"];
    parent_mcomp?: EdMeta["parent_mcomp"];
    jsx_prop_name?: string;
    jsx_prop_root?: boolean;
    skip_add_tree?: boolean;
    tree_root_id: string;
    each?: (meta: EdMeta) => void;
  }
) => {
  const { mitem, parent_item } = arg;
  if (typeof mitem.get !== "function") {
    return;
  }

  const item = {} as unknown as IItem;

  let override_id = "";
  const id = mitem.get("id");

  let skip_tree = arg.skip_add_tree;
  let skip_tree_child = skip_tree;
  if (id && p.item_loading.includes(id)) {
    skip_tree_child = true;
  }

  let mapped = false;
  if (arg.parent_mcomp && id) {
    const fcomp = arg.parent_mcomp.minstance.get("component");
    if (fcomp) {
      const ref_ids = fcomp.get("ref_ids");

      if (ref_ids) {
        let ref_id = ref_ids.get(id);

        if (!ref_id) {
          ref_id = createId();
          ref_ids.set(id, ref_id);
        }
        override_id = ref_id;
        mapItem(mitem, item, ref_ids.toJSON());
        mapped = true;
      }
    }
  }

  if (!mapped) {
    mapItem(mitem, item);
  }

  if (typeof item.name !== "string") return;

  if (override_id) {
    if (!item.originalId) item.originalId = item.id;
    item.id = override_id;
  }

  if (arg.jsx_prop_name) {
    const pitem = p.meta[arg.parent_item.id].item;
    if (pitem.type === "item" && pitem.component) {
      const pprop = pitem.component.props[arg.jsx_prop_name];
      if (pprop.content) {
        pprop.content.id = item.id;
      }
    }
  }

  const item_comp = item.component;
  const mitem_comp = mitem.get("component");
  const metaNotFound = () => {
    if (!skip_tree && p.tree) {
      p.tree.push({
        id: item.id,
        parent: arg.tree_root_id === parent_item.id ? "root" : parent_item.id,
        text: item.name,
      });
    }
  };

  if (item_comp && item_comp.id && parent_item.id !== "root") {
    if (!p.comps[item_comp.id]) {
      if (p.component_not_found) {
        p.component_not_found(item_comp.id);
      }
    }

    let ref_comp = p.comps[item_comp.id];

    if (ref_comp && mitem_comp) {
      const mcomp = ref_comp.doc.getMap("map").get("root");

      const minstance = arg.parent_mcomp
        ? arg.parent_mcomp.minstance
        : (mitem as MItem);

      let mref_ids = minstance.get("component")?.get("ref_ids");

      if (!mref_ids) {
        minstance.get("component")?.set("ref_ids", new Y.Map() as any);
        mref_ids = minstance.get("component")?.get("ref_ids");
      }

      if (mcomp) {
        const old_id = item.id;
        const ref_ids = mref_ids?.toJSON() || {};
        mapItem(mcomp, item, ref_ids);
        item.id = old_id;

        const meta: EdMeta = {
          item,
          mitem: mitem as MItem,
          parent_item,
          parent_mcomp: arg.parent_mcomp,
          indexed_scope: {},
          is_layout: arg.is_layout,
        };

        if (item.name.startsWith("⬅")) {
          arg.portal.in[item.name] = meta;
        }
        if (item.name.startsWith("⮕")) {
          arg.portal.out[item.name] = meta;
        }
        if (arg.each) arg.each(meta);
        p.meta[item.id] = meta;

        if (!skip_tree && p.tree) {
          p.tree.push({
            id: item.id,
            parent:
              arg.tree_root_id === parent_item.id ? "root" : parent_item.id,
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
                if (mprop) {
                  item_comp.props[k] = mprop.toJSON() as FNCompDef;
                  if (meta.item.type === "item" && meta.item.component) {
                    meta.item.component.props[k] = item_comp.props[k];
                  }

                  if (mprop && v.meta?.type === "content-element") {
                    const mcontent = ensurePropContent(mprop, k);
                    item_comp.props[k].content = mcontent?.toJSON() as IItem;
                    if (meta.item.type === "item" && meta.item.component) {
                      meta.item.component.props[k].content =
                        item_comp.props[k].content;
                    }

                    if (mcontent) {
                      syncWalkMap(p, {
                        is_layout: arg.is_layout,
                        tree_root_id: arg.tree_root_id,
                        mitem: mcontent,
                        jsx_prop_name: k,
                        jsx_prop_root: true,
                        parent_mcomp: { minstance, meta, mcomp },
                        parent_item: { id: item.id, mitem: mitem as MItem },
                        portal: arg.portal,
                        skip_add_tree: skip_tree_child,
                        each: arg.each,
                      });
                    }
                  }
                }
              }
            }
          }
        }

        const childs = mcomp.get("childs")?.map((e) => e) || [];

        for (const e of childs) {
          syncWalkMap(p, {
            is_layout: arg.is_layout,
            tree_root_id: arg.tree_root_id,
            mitem: e,
            parent_item: { id: item.id, mitem: mitem as MItem },
            parent_mcomp: { minstance, meta, mcomp },
            skip_add_tree: true,
            portal: arg.portal,
            each: arg.each,
          });
        }
        return;
      }
    }

    metaNotFound();
    return;
  }

  const meta: EdMeta = {
    is_layout: arg.is_layout,
    item,
    jsx_prop_name: arg.jsx_prop_name,
    jsx_prop_root: arg.jsx_prop_root,
    mitem: mitem as MItem,
    parent_item,
    parent_mcomp: arg.parent_mcomp,
    indexed_scope: {},
  };

  if (item.name.startsWith("⬅")) {
    arg.portal.in[item.name] = meta;
  }
  if (item.name.startsWith("⮕")) {
    arg.portal.out[item.name] = meta;
  }

  if (arg.each) arg.each(meta);
  p.meta[item.id] = meta;

  if (!skip_tree && p.tree) {
    p.tree.push({
      id: item.id,
      parent: arg.tree_root_id === parent_item.id ? "root" : parent_item.id,
      text: item.name,
      data: meta,
    });
  }

  const childs = mitem.get("childs")?.map((e) => e) || [];

  for (const e of childs) {
    syncWalkMap(p, {
      is_layout: arg.is_layout,
      tree_root_id: arg.tree_root_id,
      mitem: e,
      jsx_prop_name: arg.jsx_prop_name,
      parent_item: { id: item.id, mitem: mitem as MItem },
      parent_mcomp: arg.parent_mcomp,
      portal: arg.portal,
      skip_add_tree: skip_tree_child,
      each: arg.each,
    });
  }
};

export const loadcomp = {
  timeout: 0 as any,
  pending: new Set<string>(),
};

export const loadComponent = async (p: PG, id_comp: string) => {
  return new Promise<boolean>((resolve) => {
    if (p.comp.list[id_comp]) {
      resolve(true);
      return;
    }

    loadcomp.pending.add(id_comp);
    clearTimeout(loadcomp.timeout);
    loadcomp.timeout = setTimeout(async () => {
      const comps = await p.sync.comp.load([...loadcomp.pending]);
      let result = Object.entries(comps);

      for (const [id_comp, comp] of result) {
        for (const cur of Object.values(comp)) {
          if (cur && cur.snapshot) {
            await loadCompSnapshot(p, id_comp, cur.snapshot, cur.scope);
          }
        }
      }
      loadcomp.pending.clear();
      resolve(result.length > 0);
    }, 150);
  });
};

const mapItem = (
  mitem: MContent,
  item: any,
  ref_ids?: Record<string, string>
) => {
  mitem.forEach((e, k) => {
    if (k !== "childs") {
      let val = e;
      if (typeof e === "object" && e) {
        if ((e as any).toJSON) {
          val = e.toJSON() as any;
        }
      }
      if (k !== "originalId") item[k] = val;
    } else {
      item[k] = [];
      const childs = e as unknown as TypedArray<{}>;
      childs.forEach((c) => {
        if (typeof c.get === "function") {
          if (ref_ids) {
            const id = ref_ids[c.get("id")];
            if (id) {
              item[k].push({ id });
            }
          } else {
            item[k].push({ id: c.get("id") });
          }
        }
      });
    }
  });
};
