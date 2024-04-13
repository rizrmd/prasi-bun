import { get, set } from "idb-keyval";
import { IContent } from "../../../../utils/types/general";
import { IItem, MItem } from "../../../../utils/types/item";
import { FMCompDef } from "../../../../utils/types/meta-fn";
import { initLoadComp } from "../../../vi/meta/comp/init-comp-load";
import { genMeta } from "../../../vi/meta/meta";
import { nav } from "../../../vi/render/script/extract-nav";
import { loadCompSnapshot, loadComponent } from "../comp/load";
import { IMeta, PG, active } from "../ed-global";
import { assignMitem } from "./assign-mitem";
import { pushTreeNode } from "./build/push-tree";

export const treeCacheBuild = async (p: PG, page_id: string) => {
  const page_cache = p.preview.page_cache[page_id];

  if (page_cache) {
    const meta_cache = {
      meta: {} as Record<string, IMeta>,
      entry: [] as string[],
      url: page_cache.url,
    };

    await initLoadComp(
      {
        comps: p.comp.loaded,
        meta: meta_cache.meta,
        mode: "page",
      },
      page_cache.root as unknown as IItem,
      {
        async load(comp_ids) {
          if (!p.sync) return;

          const ids = comp_ids.filter((id) => !p.comp.loaded[id]);
          const comps = await p.sync.comp.load(ids, true);
          let result = Object.entries(comps);

          for (const [id_comp, comp] of result) {
            const cached = await get(`comp-${id_comp}`, nav.store);
            if (cached) {
              p.comp.loaded[id_comp] = cached;
            }
            if (comp && comp.snapshot && !p.comp.list[id_comp]) {
              if (p.comp.loaded[id_comp]) {
                loadCompSnapshot(p, id_comp, comp.snapshot).then(() => {
                  if (p.comp.loaded[id_comp]) {
                    set(`comp-${id_comp}`, p.comp.loaded[id_comp], nav.store);
                  }
                });
              } else {
                await loadCompSnapshot(p, id_comp, comp.snapshot);
                if (p.comp.loaded[id_comp]) {
                  set(`comp-${id_comp}`, p.comp.loaded[id_comp], nav.store);
                }
              }
            }
          }
        },
      }
    );

    for (const item of page_cache.root.childs) {
      meta_cache.entry.push(item.id);
      genMeta(
        {
          note: "cache-rebuild",
          comps: p.comp.loaded,
          meta: meta_cache.meta,
          mode: "page",
        },
        { item: item as IContent }
      );
    }
    p.preview.meta_cache[page_id] = meta_cache;
    set(`page-${page_id}`, meta_cache, nav.store);
  }
};

export const treeRebuild = async (p: PG, arg?: { note?: string }) => {
  if (document.activeElement) {
    const a = document.activeElement;
    if (a.tagName === "DIV" && a.getAttribute("contenteditable") === "true") {
      return;
    }
  }

  active.should_render_main = true;
  const is_layout =
    p.site.layout &&
    p.site.layout.id === p.page.cur.id &&
    arg?.note === "load-layout page-init";

  for (const [k, v] of Object.entries(p.comp.list)) {
    if (!p.comp.loaded[k]) {
      const mcomp = v.doc.getMap("map").get("root");
      const icomp = mcomp?.toJSON() as IItem | undefined;
      if (icomp) {
        p.comp.loaded[k] = icomp;
      }
    }
  }

  const mroot = p.page.doc?.getMap("map").get("root");
  const mitems: MItem[] = [];
  mroot?.get("childs")?.forEach((m) => mitems.push(m));

  const meta: Record<string, IMeta> = {};
  p.page.tree = [];

  for (const mitem of mitems) {
    const item = mitem.toJSON() as IItem;
    if (item) {
      await initLoadComp({ comps: p.comp.loaded, meta, mode: "page" }, item, {
        async load(comp_ids) {
          for (const id of comp_ids) {
            await loadComponent(p, id);
          }
        },
      });

      genMeta(
        {
          note: "tree-rebuild",
          comps: p.comp.loaded,
          meta,
          mode: "page",
          on: {
            async visit(m) {
              if (!is_layout) {
                if (m.parent?.instance_id !== m.parent?.id || m.jsx_prop) {
                  pushTreeNode(p, m, meta, p.page.tree);
                }

                assignMitem({
                  m,
                  root: item,
                  mitem,
                  meta,
                  new_prop_jsx(meta, mprops, prop_name, prop_val) {
                    if (!mprops.get(prop_name)) {
                      const map = new Y.Map();
                      syncronize(map, prop_val);
                      mprops.set(prop_name, map as FMCompDef);
                    }
                  },
                });
              }
            },
          },
        },
        { item }
      );
    }
  }

  if (is_layout) {
    p.site.layout.meta = meta;
  } else {
    let root_id = "root";
    if (p.site.layout && p.site.layout.meta) {
      for (const [_, v] of Object.entries(p.site.layout.meta)) {
        if (v.item.name === "content") {
          root_id = v.item.id;
          break;
        }
      }

      p.page.root_id = root_id;
    }

    if (p.site.layout && p.site.layout.id === p.page.cur.id) {
      p.page.meta = meta;
    } else {
      if (root_id !== "root") {
        for (const m of Object.values(meta)) {
          if (m.parent?.id === "root") {
            m.parent.id = root_id;
          }
        }
        p.page.meta = { ...p.site.layout.meta, ...meta };
      } else {
        p.page.meta = meta;
      }
    }
  }
};
