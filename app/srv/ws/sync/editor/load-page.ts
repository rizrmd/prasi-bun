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
import { ArgParentMComp, parseJs } from "./parser/parse-js";
import { user } from "../entity/user";

const defaultActive = {
  select: "" as "" | "comp" | "item" | "section" | "text",
};
export const serverWalkLoad = async (
  mitem: MItem,
  scope_comps: IScopeComp,
  sync: SyncConnection,
  loaded: Set<string>
) => {
  if (typeof mitem.get !== "function") {
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
      } else {
        const conf = sync.conf;
        if (conf) {
          user.active.add({
            ...defaultActive,
            client_id: sync.client_id,
            user_id: sync.user_id,
            site_id: conf.site_id,
            page_id: conf.page_id,
            comp_id: comp.id,
          });
        }
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

export const serverWalkMap = (
  p: {
    sync: SyncConnection;
    scope: IScope;
    scope_comps: IScopeComp;
    note: string;
  },
  arg: {
    mitem: MItem;
    parent_ids: string[];
    parent_item: EdMeta["parent_item"];
    parent_mcomp?: ArgParentMComp;
    content_scope?: Record<string, string>;
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
        item,
        content_scope: arg.content_scope,
        mcomp: mitem,
        scope,
        mcontent(mcontent) {},
      });
      p.scope[item.id] = {
        p: arg.parent_ids,
        n: item.name,
        s: scope,
      };
      const js = item.adv?.js;
      if (typeof js === "string") {
        const s = parseJs(js, {
          item,
          content_scope: arg.content_scope,
        });
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

          const content_scope: Record<string, string> = {};

          extractMItemProps({
            item_comp,
            item,
            mitem,
            mcomp,
            scope,
            content_scope: arg.content_scope,
            mcontent(mcontent, prop_name) {
              const id = mcontent.get("id");
              if (id) {
                let cid = ref_ids[id] || id;
                parent_mcomp.jsx_props[prop_name] = {
                  id: cid,
                  mitem: mcontent,
                  parent_mcomp: arg.parent_mcomp,
                  parent_ids: [...arg.parent_ids, item.id],
                };

                content_scope[prop_name] = cid;
              }
            },
          });

          const pcomp = p.scope_comps[item_comp.id];
          pcomp.scope[item.id] = { p: ["root"], n: item.name, s: null };

          const js = item.adv?.js;
          if (typeof js === "string") {
            const res = parseJs(js, {
              item,
              content_scope: arg.content_scope,
            });
            if (res) {
              scope.local = res.local;
              scope.passprop = res.passprop;
            }
          }

          if (scope) pcomp.scope[item.id].s = scope;

          if (!p.scope[item.id]) {
            p.scope[item.id] = {
              p: arg.parent_ids,
              n: item.name,
              s: null,
            };
          }

          if (scope) {
            if (!p.scope[item.id].s) {
              p.scope[item.id].s = scope;
            } else {
              p.scope[item.id].s = { ...p.scope[item.id].s, ...scope };
            }
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
              content_scope,
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
        const scope = parseJs(js, {
          item,
          content_scope: arg.content_scope,
        });
        if (scope) pcomp.scope[id].s = scope;
      }
    }
  } else {
    if (!(item_comp && item_comp.id)) {
      p.scope[item.id] = { p: arg.parent_ids, n: item.name, s: null };
      const js = item.adv?.js;
      if (typeof js === "string") {
        const scope = parseJs(js, {
          item,
          content_scope: arg.content_scope,
        });
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
      content_scope: arg.content_scope,
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
