import { NodeModel } from "@minoru/react-dnd-treeview";
import { createId } from "@paralleldrive/cuid2";
import { compress, decompress } from "wasm-gzip";
import { IItem } from "../../../../utils/types/item";
import { DComp } from "../../../../utils/types/root";
import { initLoadComp } from "../../../vi/meta/comp/init-comp-load";
import { genMeta } from "../../../vi/meta/meta";
import { isTextEditing } from "../active/is-editing";
import { CompListItem, IMeta, PG } from "../ed-global";
import { assignMitem } from "../tree/assign-mitem";
import { treeRebuild } from "../tree/build";
import { pushTreeNode } from "../tree/build/push-tree";

export const loadcomp = {
  timeout: 0 as any,
  pending: new Set<string>(),
};

export const loadComponent = async (p: PG, id_comp: string, sync?: boolean) => {
  return new Promise<boolean>((resolve) => {
    if (p.comp.list[id_comp]) {
      resolve(true);
      return;
    }

    loadcomp.pending.add(id_comp);
    clearTimeout(loadcomp.timeout);
    loadcomp.timeout = setTimeout(async () => {
      const comps = await p.sync?.comp.load([...loadcomp.pending], sync);
      if (comps) {
        let result = Object.entries(comps);

        for (const [id_comp, comp] of result) {
          if (comp && comp.snapshot) {
            await loadCompSnapshot(p, id_comp, comp.snapshot);
          }
        }
        loadcomp.pending.clear();
        resolve(result.length > 0);
      } else {
        resolve(false);
      }
    }, 150);
  });
};

export const loadCompSnapshot = async (
  p: PG,
  comp_id: string,
  snapshot: Uint8Array
) => {
  if (p.comp.list[comp_id]) return;

  const doc = new Y.Doc() as DComp;
  Y.applyUpdate(doc as any, decompress(snapshot));
  const mitem = doc.getMap("map").get("root");
  if (mitem) {
    p.comp.loaded[comp_id] = mitem.toJSON() as IItem;
    const ref = p.comp.list[comp_id] as CompListItem | undefined;
    if (typeof ref?.on_update === "function") {
      doc.off("update", ref.on_update);
    }

    const updated = await updateComponentMeta(p, doc, comp_id);
    if (updated) {
      const { meta, tree } = updated;
      if (ref) {
        ref.meta = meta;
        ref.tree = tree;
      } else {
        p.comp.list[comp_id] = {
          comp: { id: comp_id, snapshot },
          doc,
          meta,
          tree,
          async on_update(bin, origin) {
            if (origin === "sv_remote" || origin === "local") {
              return;
            }

            const res = await p.sync?.yjs.sv_local(
              "comp",
              comp_id,
              Buffer.from(compress(bin))
            );

            if (res) {
              if (res.sv === res.diff && (res.sv as any) === "not-found") {
                console.warn("reload 5");

                location.reload()
              }

              const diff_local = Y.encodeStateAsUpdate(
                doc as any,
                decompress(res.sv)
              );
              Y.applyUpdate(doc as any, decompress(res.diff), "local");

              await p.sync?.yjs.diff_local(
                "comp",
                comp_id,
                Buffer.from(compress(diff_local))
              );
              const updated = await updateComponentMeta(
                p,
                p.comp.list[comp_id].doc,
                comp_id
              );
              if (updated) {
                p.comp.list[comp_id].meta = updated.meta;
                p.comp.list[comp_id].tree = updated.tree;
              }
              p.comp.loaded[comp_id] = doc
                .getMap("map")
                .get("root")
                ?.toJSON() as IItem;

              if (isTextEditing()) {
                return;
              }
              treeRebuild(p);
              p.render();
            }
          },
        };

        doc.on("update", p.comp.list[comp_id].on_update);
      }
    }
  }
};

export const updateComponentMeta = async (
  p: PG,
  doc: DComp,
  comp_id: string
) => {
  const mitem = doc.getMap("map").get("root");
  if (!mitem) return;

  const meta: Record<string, IMeta> = {};
  const tree: NodeModel<IMeta>[] = [];
  const item = mitem.toJSON() as IItem;

  p.comp.loaded[comp_id] = item;
  await initLoadComp(
    {
      comps: p.comp.loaded,
      meta,
      set_meta: false,
      mode: "comp",
    },
    item,
    {
      load: async (comp_ids: string[]) => {
        const ids = comp_ids.filter((id) => !p.comp.loaded[id]);
        const comps = await p.sync?.comp.load(ids, true);
        if (comps) {
          let result = Object.entries(comps);

          for (const [id_comp, comp] of result) {
            if (comp && comp.snapshot && !p.comp.list[id_comp]) {
              await loadCompSnapshot(p, id_comp, comp.snapshot);
            }
          }
        }
      },
    }
  );

  genMeta(
    {
      comps: p.comp.loaded,
      meta,
      mode: "comp",
      on: {
        async visit(m) {
          pushTreeNode(p, m, meta, tree);

          assignMitem({
            m,
            root: item,
            mitem,
            meta,
            new_prop_jsx(meta, mprops, prop_name, prop_val) {
              transact.list.push(() => {
                const map = new Y.Map();
                if (prop_val.content) prop_val.content.id = createId();
                syncronize(map, prop_val);
                mprops.set(prop_name, map as any);
              });
            },
          });
        },
      },
      note: "load-comp-scan-meta",
    },
    { item, ignore_first_component: true }
  );

  if (transact.list.length > 0) {
    p.page.doc?.transact(() => {
      for (const fn of transact.list) {
        fn();
      }
    });
  }

  p.comp.loaded[comp_id] = item;

  return { meta, tree, item };
};

const transact = {
  list: [] as (() => void)[],
};
