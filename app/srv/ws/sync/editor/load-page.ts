import { createId } from "@paralleldrive/cuid2";
import { TypedArray } from "yjs-types";
import {
  EdMeta,
  IScope,
  IScopeComp,
} from "../../../../web/src/nova/ed/logic/ed-global";
import { ensurePropContent } from "../../../../web/src/nova/ed/logic/tree/sync-walk-utils";
import { MContent } from "../../../../web/src/utils/types/general";
import { IItem, MItem } from "../../../../web/src/utils/types/item";
import { FNComponent } from "../../../../web/src/utils/types/meta-fn";
import { docs } from "../entity/docs";
import { gzipAsync } from "../entity/zlib";
import { SyncConnection } from "../type";
import { loadComponent } from "./load-component";
import { extractMItemProps } from "./load-page-comp";
import { parseJs } from "./parser/parse-js";

export const serverWalkLoad = async (
  mitem: MItem,
  scope_comps: IScopeComp,
  sync: SyncConnection,
  loaded: Set<string>
) => {

  if (typeof mitem.get !== 'function') {
    return;
  }

  const mcomp = mitem.get("component");
  if (mcomp) {
    const id = mcomp.get("id");
    const comp = mcomp.toJSON() as FNComponent;
    if (id) {
      const isFirstLoaded = !loaded.has(id);
      loaded.add(id);
      if (!docs.comp[id]) {
        await loadComponent(id, sync);
      }

      const pcomp = docs.comp[id];
      if (pcomp) {
        const pitem = pcomp.doc.getMap("map").get("root");

        if (pitem) {
          const name = pitem.get("name");
          if (id && name) {
            const bin = Y.encodeStateAsUpdate(pcomp.doc as any);
            scope_comps[id] = {
              id: id,
              name,
              scope: {},
              snapshot: await gzipAsync(bin),
            };
            if (isFirstLoaded) {
              await serverWalkLoad(pitem, scope_comps, sync, loaded);
            }
          }
        }
      }
    }

    for (const [propName, prop] of Object.entries(comp.props || {})) {
      if (prop.meta?.type === "content-element") {
        const mprop = mcomp.get("props")?.get(propName);
        if (mprop) {
          const mcontent = ensurePropContent(mprop, propName);
          if (mcontent) {
            await serverWalkLoad(mcontent, scope_comps, sync, loaded);
          }
        }
      }
    }
  }

  for (const e of mitem.get("childs")?.map((e) => e) || []) {
    await serverWalkLoad(e, scope_comps, sync, loaded);
  }
};

type ArgParentMComp = EdMeta["parent_mcomp"] & {
  id: string;
  parent_ids: string[];
  jsx_props: Record<
    string,
    {
      id: string;
      mitem: MItem;
      parent_mcomp?: ArgParentMComp;
      parent_ids: string[];
    }
  >;
};
export const serverWalkMap = (
  p: {
    sync: SyncConnection;
    scope: IScope;
    scope_comps: IScopeComp;
  },
  arg: {
    mitem: MItem;
    parent_ids: string[];
    parent_item: EdMeta["parent_item"];
    parent_mcomp?: ArgParentMComp;
  }
) => {
  const { mitem, parent_item, parent_mcomp } = arg;

  let override_id = "";
  const id = mitem.get("id");

  if (parent_mcomp && id) {
    const fcomp = parent_mcomp.mitem.get("component");
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

  const item = {} as unknown as IItem;
  mapItem(mitem, item);
  if (override_id) {
    item.originalId = item.id;
    item.id = override_id;
  }

  const item_comp = item.component;
  const mitem_comp = mitem.get("component");
  if (item_comp && item_comp.id) {
    if (parent_item.id === "root") {
      const scope = { props: {} } as Exclude<
        ReturnType<typeof parseJs>,
        undefined
      >;
      extractMItemProps({
        item_comp,
        mitem,
        mcomp: mitem,
        scope,
        mcontent(mcontent) { },
      });
      p.scope[item.id] = {
        p: arg.parent_ids,
        n: item.name,
        s: scope,
      };
      const js = item.adv?.js;
      if (typeof js === "string") {
        const s = parseJs(js);
        const ps = p.scope[item.id].s;
        if (ps) {
          if (s?.local) ps.local = s.local;
          if (s?.passprop) ps.passprop = s.passprop;
        }
      }
    } else {
      if (!docs.comp[item_comp.id]) {
        console.error("Component failed to load:", item_comp.id);
        return;
      }

      if (!p.scope_comps[item_comp.id]) {
        console.error("Failed to assign component:", item_comp.id);
        return;
      }

      const ref_comp = docs.comp[item_comp.id];

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

          const scope = { props: {} } as Exclude<
            ReturnType<typeof parseJs>,
            undefined
          >;

          const parent_mcomp: ArgParentMComp = {
            parent_ids: ["root", item.id],
            id: item_comp.id,
            mitem: mitem as MItem,
            mcomp,
            jsx_props: {},
          };

          extractMItemProps({
            item_comp,
            mitem,
            mcomp,
            scope,
            mcontent(mcontent, prop_name) {
              const id = mcontent.get("id");
              if (id) {
                parent_mcomp.jsx_props[prop_name] = {
                  id,
                  mitem: mcontent,
                  parent_mcomp: arg.parent_mcomp,
                  parent_ids: [...arg.parent_ids, item.id],
                };
              }
            },
          });

          const pcomp = p.scope_comps[item_comp.id];
          pcomp.scope[item.id] = { p: ["root"], n: item.name, s: null };

          const js = item.adv?.js;
          if (typeof js === "string") {
            const res = parseJs(js);
            if (res) {
              scope.local = res.local;
              scope.passprop = res.passprop;
            }
          }

          if (scope) pcomp.scope[item.id].s = scope;

          if (!arg.parent_mcomp) {
            p.scope[item.id] = {
              p: arg.parent_ids,
              n: item.name,
              s: null,
            };
            if (scope) p.scope[item.id].s = scope;
          }

          const childs = mcomp.get("childs")?.map((e) => e) || [];
          for (const e of childs) {
            serverWalkMap(p, {
              mitem: e,
              parent_ids: [...arg.parent_ids, item.id],
              parent_item: {
                id: item.id,
                mitem: mitem as MItem,
              },
              parent_mcomp,
            });
          }
        }
      }
      return;
    }
  }

  if (arg.parent_mcomp) {
    let id = item.originalId || item.id;
    const pcomp = p.scope_comps[arg.parent_mcomp.id];

    if (pcomp) {
      pcomp.scope[id] = {
        p: arg.parent_mcomp.parent_ids,
        n: item.name,
        s: null,
      };

      const js = item.adv?.js;
      if (typeof js === "string") {
        const scope = parseJs(js);
        if (scope) pcomp.scope[id].s = scope;
      }

      if (item.name.startsWith("jsx=")) {
        const name = item.name.substring(4).trim();
        if (arg.parent_mcomp.jsx_props[name]) {
          const jsx = arg.parent_mcomp.jsx_props[name];
          serverWalkMap(p, {
            mitem: jsx.mitem,
            parent_item: { id: item.id, mitem: mitem as MItem },
            parent_mcomp: jsx.parent_mcomp
              ? {
                ...jsx.parent_mcomp,
                parent_ids: [
                  ...(arg.parent_ids || []),
                  mitem.get("id") || "",
                ],
              }
              : undefined,
            parent_ids: [...arg.parent_ids, mitem.get("id") || ""],
          });
        }
      }
    }
  } else {
    if (!(item_comp && item_comp.id)) {
      p.scope[item.id] = { p: arg.parent_ids, n: item.name, s: null };
      const js = item.adv?.js;
      if (typeof js === "string") {
        const scope = parseJs(js);
        if (scope) p.scope[item.id].s = scope;
      }
    }
  }

  const childs = mitem.get("childs")?.map((e) => e) || [];
  for (const e of childs) {
    serverWalkMap(p, {
      mitem: e,
      parent_item: { id: item.id, mitem: mitem as MItem },
      parent_mcomp: !!arg.parent_mcomp
        ? {
          ...arg.parent_mcomp,
          parent_ids: [...(arg.parent_mcomp?.parent_ids || []), item.id],
        }
        : undefined,
      parent_ids: [...arg.parent_ids, item.id],
    });
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
