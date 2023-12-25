import { NodeModel } from "@minoru/react-dnd-treeview";
import { compress, decompress } from "wasm-gzip";
import { IItem } from "../../../../utils/types/item";
import { DComp } from "../../../../utils/types/root";
import { genMeta } from "../../../vi/meta/meta";
import { IMeta, PG } from "../ed-global";
import { treeRebuild } from "../tree/build";
import { pushTreeNode } from "../tree/build/push-tree";
import { initLoadComp } from "../../../vi/meta/comp/init-comp-load";
import { ISimpleMeta } from "../../../vi/utils/types";
import { simplifyMeta } from "../../../vi/meta/simplify";

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
      const comps = await p.sync.comp.load([...loadcomp.pending], sync);
      let result = Object.entries(comps);

      for (const [id_comp, comp] of result) {
        if (comp && comp.snapshot) {
          await loadCompSnapshot(p, id_comp, comp.snapshot, comp.meta);
        }
      }
      loadcomp.pending.clear();
      resolve(result.length > 0);
    }, 150);
  });
};

export const loadCompSnapshot = async (
  p: PG,
  comp_id: string,
  snapshot: Uint8Array,
  smeta: Record<string, ISimpleMeta>
) => {
  if (p.comp.list[comp_id] && p.comp.list[comp_id].doc) {
    return;
  }
  const doc = new Y.Doc() as DComp;
  Y.applyUpdate(doc as any, decompress(snapshot));
  const mitem = doc.getMap("map").get("root");
  if (mitem) {
    if (typeof p.comp.list[comp_id]?.on_update === "function") {
      doc.off("update", p.comp.list[comp_id].on_update);
    }

    const updated = await updateComponentMeta(p, doc, comp_id, smeta);
    if (updated) {
      const { meta, tree } = updated;
      if (p.comp.list[comp_id]) {
        p.comp.list[comp_id].comp.meta = smeta;
        p.comp.list[comp_id].meta = meta;
        p.comp.list[comp_id].tree = tree;
      } else {
        p.comp.list[comp_id] = {
          comp: { id: comp_id, snapshot, meta: smeta },
          doc,
          meta,
          tree,
          async on_update(bin, origin) {
            if (origin === "sv_remote" || origin === "local") {
              return;
            }

            const res = await p.sync.yjs.sv_local(
              "comp",
              comp_id,
              Buffer.from(compress(bin))
            );

            if (res) {
              const diff_local = Y.encodeStateAsUpdate(
                doc as any,
                decompress(res.sv)
              );
              Y.applyUpdate(doc as any, decompress(res.diff), "local");

              await p.sync.yjs.diff_local(
                "comp",
                comp_id,
                Buffer.from(compress(diff_local))
              );
              const updated = await updateComponentMeta(
                p,
                p.comp.list[comp_id].doc,
                comp_id,
                smeta
              );
              if (updated) {
                p.comp.list[comp_id].meta = updated.meta;
                p.comp.list[comp_id].tree = updated.tree;
              }
              treeRebuild(p, { note: "load-comp" });
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
  comp_id: string,
  smeta: Record<string, ISimpleMeta>
) => {
  const mitem = doc.getMap("map").get("root");
  if (!mitem) return;

  const meta: Record<string, IMeta> = {};
  const tree: NodeModel<IMeta>[] = [];
  const item = mitem.toJSON() as IItem;

  p.comp.loaded[comp_id] = { comp: item, smeta };
  await initLoadComp(
    {
      comps: p.comp.loaded,
      meta,
      set_meta: false,
      smeta,
    },
    item,
    async (comp_ids: string[]) => {
      const ids = comp_ids.filter((id) => !p.comp.loaded[id]);
      const comps = await p.sync.comp.load(ids, true);
      let result = Object.entries(comps);

      for (const [id_comp, comp] of result) {
        if (comp && comp.snapshot) {
          await loadCompSnapshot(p, id_comp, comp.snapshot, comp.meta);
        }
      }
    }
  );

  genMeta(
    {
      comps: p.comp.loaded,
      meta,
      smeta,
      on: {
        visit(m) {
          pushTreeNode(p, m, meta, tree);

          if (m.parent) {
            if (m.parent.id === "root") {
              if (m.item.id === item.id) {
                m.mitem = mitem;
              }
            } else {
              const parent = meta[m.parent.id];
              if (parent && parent.mitem) {
                parent.mitem.get("childs")?.forEach((child) => {
                  const cid = child.get("id");
                  if (cid) {
                    if (
                      cid === m.item.id ||
                      (m.instances &&
                        m.instances[cid] &&
                        m.instances[cid][m.item.id])
                    ) {
                      m.mitem = child;
                    }
                  }
                });
              }
            }
          }
        },
      },
      note: "load-comp-scan-meta",
    },
    { item, ignore_first_component: true }
  );

  p.comp.loaded[comp_id] = { comp: item, smeta: simplifyMeta(meta) };

  return { meta, tree };
};
