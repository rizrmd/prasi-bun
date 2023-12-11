import { NodeModel } from "@minoru/react-dnd-treeview";
import { compress, decompress } from "wasm-gzip";
import { MItem } from "../../../../utils/types/item";
import { DComp } from "../../../../utils/types/root";
import { IMeta, IScope, PG, active } from "../ed-global";
import { treeRebuild } from "./build";
import {
  loadComponent,
  loadcomp,
  syncWalkLoad,
  syncWalkMap,
} from "./sync-walk";
import { waitUntil } from "web-utils";

export const loadCompSnapshot = async (
  p: PG,
  id_comp: string,
  snapshot: Uint8Array
) => {
  const doc = new Y.Doc() as DComp;
  Y.applyUpdate(doc as any, decompress(snapshot));
  const mitem = doc.getMap("map").get("root");
  if (mitem) {
    if (typeof p.comp.list[id_comp]?.on_update === "function") {
      doc.off("update", p.comp.list[id_comp].on_update);
    }

    p.comp.list[id_comp] = {
      comp: { id: id_comp, snapshot },
      doc,
    } as any;

    const { tree, meta } = await walkCompTree(p, mitem, id_comp);
    p.comp.list[id_comp] = {
      ...p.comp.list[id_comp],
      meta,
      tree,
      async on_update(bin, origin) {
        if (origin === "sv_remote" || origin === "local") {
          return;
        }

        const res = await p.sync.yjs.sv_local(
          "comp",
          id_comp,
          Buffer.from(compress(bin))
        );

        if (res) {
          const diff_local = Y.encodeStateAsUpdate(
            doc as any,
            decompress(res.sv)
          );
          Y.applyUpdate(doc as any, decompress(res.diff), "local");
          const mitem = doc.getMap("map").get("root");
          if (mitem) {
            const { tree, meta } = await walkCompTree(p, mitem, id_comp);
            p.comp.list[id_comp].tree = tree;
            p.comp.list[id_comp].meta = meta;
            await treeRebuild(p);

            if (active.comp_id === id_comp) {
              p.comp.tree = tree;
            }
          }
          await p.sync.yjs.diff_local(
            "comp",
            id_comp,
            Buffer.from(compress(diff_local))
          );
          p.render();
        }
      },
    };

    doc.on("update", p.comp.list[id_comp].on_update);
  }
};

const walkCompTree = async (p: PG, mitem: MItem, comp_id: string) => {
  const tree: NodeModel<IMeta>[] = [];
  const meta = {};
  const portal = {
    in: {} as Record<string, IMeta>,
    out: {} as Record<string, IMeta>,
  };
  syncWalkLoad(p, mitem, (id) => loadComponent(p, id));
  mitem.doc?.transact(() => {
    syncWalkMap(
      {
        note: "walk-comp",
        comps: p.comp.list,
        item_loading: p.ui.tree.item_loading,
        meta,
        tree,
        component_not_found(id) {
          setTimeout(() => {
            if (loadcomp.pending.has(id) || p.comp.list[id]) {
              waitUntil(() => !loadcomp.pending.has(id)).then(async () => {
                walkCompTree(p, mitem, comp_id);

                const { tree, meta } = await walkCompTree(p, mitem, comp_id);
                p.comp.list[comp_id].tree = tree;
                p.comp.list[comp_id].meta = meta;
                p.render();
              });
            }
          }, 100);
        },
      },
      {
        mitem,
        is_layout: false,
        parent_item: { id: "root" },
        portal,
        tree_root_id: "root",
      }
    );
  });

  return { tree, meta };
};
