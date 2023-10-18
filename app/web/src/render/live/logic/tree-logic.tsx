import { produceCSS } from "../../../utils/css/gen";
import { IContent } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { FNCompDef } from "../../../utils/types/meta-fn";
import { instantiateComp, loadComponent } from "./comp";
import { ItemMeta, LiveGlobal, PG } from "./global";

export const rebuildTree = async (
  p: PG,
  _: { note: string; render?: boolean; reset?: boolean }
) => {
  if (!p.page?.content_tree) return;

  p.treePending = new Promise<void>(async (resolve) => {
    const treeMeta = p.treeMeta;
    if (p.page) {
      let childs = Object.values(p.page.content_tree?.childs || []);
      if (
        p.layout.section &&
        p.layout.content &&
        !p.page?.name.startsWith("layout:")
      ) {
        childs = [p.layout.section];

        p.layout.content.type = "item";
        if (p.layout.content.type === "item") {
          p.layout.content.childs = p.page.content_tree?.childs.map((e) => ({
            ...e,
            type: "item",
          })) as IItem[];
        }
      }

      await Promise.all(
        childs.map(async (item, idx) => {
          await walk(p, {
            treeMeta,
            item,
            parent_id: "root",
            idx,
            isLayout: !!(p.layout.section && p.layout.content),
          });
        }) || []
      );
    }

    resolve();
    p.treePending = null;

    if (_.render !== false) {
      p.render();
    }
  });
  await p.treePending;
};

const walk = async (
  p: PG,
  val: {
    treeMeta: (typeof LiveGlobal)["treeMeta"];
    item?: IContent;
    isLayout: boolean;
    parent_id: string;
    idx: number;
    parent_comp?: ItemMeta["parent_comp"];
  }
) => {
  const treeMeta = val.treeMeta;
  let item = val.item as IContent;

  if (item.hidden === "all") return;

  if (val.parent_comp) {
    const pchild_ids = val.parent_comp.comp?.child_ids;

    if (pchild_ids && item.originalId) {
      if (pchild_ids[item.originalId]) {
        item.id = pchild_ids[item.originalId];
      }
    }
  }

  if (item) {
    let comp: ItemMeta["comp"] = undefined as any;

    if (item.type === "item" && item.component?.id) {
      comp = {
        id: item.component.id,
        child_ids: {},
      };
    }

    const meta: ItemMeta = {
      item,
      parent_id: p.cachedParentID[item.id] || val.parent_id,
      parent_comp: val.parent_comp as any,
      className: produceCSS(item, {
        mode: p.mode,
      }),
      comp,
      indexedScope: treeMeta[item.id] ? treeMeta[item.id].indexedScope : {},
      isLayout: val.isLayout,
    };

    treeMeta[meta.item.id] = meta;

    if (item.type === "item" && item.component?.id) {
      const cid = item.component.id;
      let comp = p.comps.all[cid];
      if (!comp) {
        await loadComponent(p, cid);
        comp = p.comps.all[cid];
      }

      if (comp) {
        if (!p.compInstance[item.id]) {
          p.compInstance[item.id] = {};
        }
        const child_ids = p.compInstance[item.id];
        const itemnew = instantiateComp(
          p,
          item,
          { type: "i", item: comp },
          child_ids
        );

        for (const [k, v] of Object.entries(itemnew)) {
          if (k !== "id") (item as any)[k] = v;
        }

        const cprops = comp.content_tree.component?.props;
        const iprops = item.component.props;

        if (cprops && iprops) {
          for (const [name, mprop] of Object.entries(cprops)) {
            const jsx_prop = iprops[name];

            if (jsx_prop) {
              if (mprop.meta?.type === "content-element") {
                let icontent = jsx_prop.content;

                if (icontent)
                  await walk(p, {
                    treeMeta,
                    item: icontent,
                    parent_id: item.id,
                    parent_comp: val.parent_comp,
                    idx: mprop.idx,
                    isLayout: meta.isLayout,
                  });
              }
            }
          }
        }
      }

      await Promise.all(
        item.childs.map(async (child, idx) => {
          return await walk(p, {
            treeMeta,
            item: child,
            parent_comp: meta as any,
            parent_id: item.id,
            idx,
            isLayout: meta.isLayout,
          });
        })
      );
    } else {
      if (item.type !== "text" && Array.isArray(item.childs)) {
        await Promise.all(
          item.childs.map(async (child, idx) => {
            let isLayout = false;
            if (meta.isLayout && item.name !== "content") {
              isLayout = true;
            }
            return await walk(p, {
              treeMeta,
              idx,
              item: child,
              parent_comp: val.parent_comp,
              parent_id: item.id || "",
              isLayout,
            });
          })
        );
      }
    }
  }
};
