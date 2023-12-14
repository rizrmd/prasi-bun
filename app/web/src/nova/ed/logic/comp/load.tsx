import { compress, decompress } from "wasm-gzip";
import { DComp } from "../../../../utils/types/root";
import { PG } from "../ed-global";

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
            await loadCompSnapshot(p, id_comp, cur.snapshot);
          }
        }
      }
      loadcomp.pending.clear();
      resolve(result.length > 0);
    }, 150);
  });
};

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

    p.comp.list[id_comp] = {
      ...p.comp.list[id_comp],
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
