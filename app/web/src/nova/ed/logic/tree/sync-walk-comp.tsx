import { NodeModel } from "@minoru/react-dnd-treeview";
import { compress, decompress } from "wasm-gzip";
import { DComp } from "../../../../utils/types/root";
import { EdMeta, IScope, PG, active } from "../ed-global";
import { treeRebuild } from "./build";
import { loadComponent, syncWalkLoad, syncWalkMap } from "./sync-walk";
import { MItem } from "../../../../utils/types/item";

export const loadCompSnapshot = async (
  p: PG,
  id_comp: string,
  loaded: Set<string>,
  snapshot: Uint8Array,
  scope: IScope
) => {
  if (loaded.has(id_comp)) {
    return;
  }
  const doc = new Y.Doc() as DComp;
  Y.applyUpdate(doc as any, decompress(snapshot));
  const mitem = doc.getMap("map").get("root");
  if (mitem) {
    if (typeof p.comp.list[id_comp]?.on_update === "function") {
      doc.off("update", p.comp.list[id_comp].on_update);
    }

    const { tree, meta } = await walkCompTree(p, mitem, loaded);

    p.comp.list[id_comp] = {
      comp: { id: id_comp, snapshot },
      doc,
      scope: scope,
      meta,
      tree,
      async on_update(bin, origin) {
        if (origin === "sv_remote" || origin === "local") return;

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
            const { tree, meta } = await walkCompTree(p, mitem, loaded);
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

const walkCompTree = async (p: PG, mitem: MItem, loaded: Set<string>) => {
  const tree: NodeModel<EdMeta>[] = [];
  const meta = {};
  const portal = {
    in: {} as Record<string, EdMeta>,
    out: {} as Record<string, EdMeta>,
  };
  await syncWalkLoad(p, mitem, loaded, (id) => loadComponent(p, id, loaded));

  syncWalkMap(
    {
      comps: p.comp.list,
      item_loading: p.ui.tree.item_loading,
      meta,
      tree,
      warn_component_loaded: false,
    },
    {
      mitem,
      is_layout: false,
      parent_item: { id: "root" },
      portal,
      tree_root_id: "root",
    }
  );

  return { tree, meta };
};
