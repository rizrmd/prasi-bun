import { Doc } from "yjs";
import { ISimpleMeta } from "../../../../../vi/utils/types";
import { IMeta, PG, active } from "../../../../logic/ed-global";
import { CodeLoc } from "./type";

const modif = {
  timeout: null as any,
  pending: [] as {
    type: "local" | "props" | "passprop";
    loc: CodeLoc;
    src: string;
  }[],
};

const modifyJS = (
  p: PG,
  type: "local" | "props" | "passprop",
  loc: CodeLoc,
  src: string
) => {
  modif.pending.push({ loc, type, src });

  clearTimeout(modif.timeout);
  modif.timeout = setTimeout(() => {
    const map = new Map<Doc, { meta: IMeta; loc: CodeLoc; src: string }[]>();

    for (const item of modif.pending) {
      const meta = getMetaByLoc(p, loc);

      if (meta && meta.mitem && meta.mitem.doc) {
        let mapset = map.get(meta.mitem.doc);
        if (!mapset) {
          map.set(meta.mitem.doc, []);
          mapset = map.get(meta.mitem.doc);
        }

        if (mapset) {
          mapset.push({ ...item, meta });
        }
      }
    }

    map.forEach((items, doc) => {
      doc.transact(() => {
        for (const item of items) {
          const { meta, src, loc } = item;
          if (loc.type === "item") {
            const js = meta.item.adv?.js;
            const script = meta.item.script;
            if (js && script) {
              const text = extractText(type, src);

              const def = script[type];
              if (text) {
                if (
                  type === "local" &&
                  def &&
                  typeof def.start === "number" &&
                  typeof def.end === "number"
                ) {
                  // const final = replaceRange(js, def.start, def.end, text);
                  def.end = def.start + text.length;
                }
              }
            }
          }
        }
      });
    });
    modif.pending.length = 0;
  }, 500);
};

const getMetaByLoc = (p: PG, loc: CodeLoc) => {
  let meta = undefined as IMeta | undefined;
  if (!active.comp_id) {
    meta = p.page.meta[loc.item_id];
  } else {
    const comp = p.comp.list[active.comp_id].meta;
    if (comp[loc.item_id]) {
      meta = comp[loc.item_id];
    }
  }

  if (loc.type === "item" && meta) {
    return meta;
  }
};

const extractText = (type: "local" | "props" | "passprop", src: string) => {
  if (type === "local") {
    const first = "type _local = ";
    return src
      .substring(
        src.indexOf(first) + first.length,
        src.indexOf("declare global {")
      )
      .trim();
  }
};

function replaceRange(
  s: string,
  start: number,
  end: number,
  substitute: string
) {
  return s.substring(0, start) + substitute + s.substring(end);
}
