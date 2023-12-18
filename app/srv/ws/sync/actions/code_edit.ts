import { Doc } from "yjs";
import { MContent } from "../../../../web/src/utils/types/general";
import { MItem } from "../../../../web/src/utils/types/item";
import { MRoot } from "../../../../web/src/utils/types/root";
import { SAction } from "../actions";
import { docs } from "../entity/docs";
import { gunzipAsync } from "../entity/zlib";
import { SyncConnection } from "../type";
import { transform } from "esbuild";
const decoder = new TextDecoder();

export const code_edit: SAction["code"]["edit"] = async function (
  this: SyncConnection,
  arg
) {
  const src = decoder.decode(await gunzipAsync(arg.value));

  if (arg.type === "adv") {
    const { item_id, mode, comp_id, page_id, value } = arg;

    let root = undefined as undefined | MRoot | MItem;
    let doc = undefined as undefined | Doc;
    if (page_id) {
      const ref = docs.page[page_id];
      if (ref) {
        root = ref.doc.getMap("map").get("root");
        doc = ref.doc as Doc;
      }
    } else if (comp_id) {
      const ref = docs.comp[comp_id];
      if (ref) {
        root = ref.doc.getMap("map").get("root");
        doc = ref.doc as Doc;
      }
    }

    if (root) {
      const mitem = findId(root, item_id);

      if (mitem) {
        let adv = mitem.get("adv");
        if (!adv) {
          mitem.set("adv", new Y.Map() as any);
          adv = mitem.get("adv");
        }

        if (adv) {
          const res = await transform(`render(${src})`, {
            jsx: "transform",
            format: "cjs",
            loader: "tsx",
            minify: true,
            sourcemap: "inline",
          });

          doc?.transact(() => {
            if (adv) {
              adv.set(mode, src);
              if (mode === "js") {
                adv.set("jsBuilt", res.code);
              }
            }
          });
        }
      }
    }
  } else {
    const { comp_id, prop_kind, prop_name, value } = arg;
    if (comp_id) {
      const ref = docs.comp[comp_id];
      if (ref) {
        const root = ref.doc.getMap("map").get("root");
        const doc = ref.doc as Doc;
        if (root) {
          const mprops = root.get("component")?.get("props");
          const mprop = mprops?.get(prop_name);
          if (mprop) {
            const res = await transform(`return ${src}`, {
              jsx: "transform",
              format: "cjs",
              loader: "tsx",
            });
            doc?.transact(() => {
              if (prop_kind === "value") {
                mprop.set("value", src);
                mprop.set("valueBuilt", res.code.substring(6));
              } else if (prop_kind === "gen") {
                mprop.set("gen", src);
                mprop.set("genBuilt", res.code.substring(6));
              } else if (prop_kind === "visible") {
                mprop.set("visible", src);
              } else if (prop_kind === "option") {
                const meta = mprop.get("meta");
                if (meta) {
                  meta.set("options", src);
                  meta.set("optionsBuilt", res.code.substring(6));
                }
              }
            });
          }
        }
      }
    }
  }

  return false;
};

const findId = (mitem: MContent | MRoot, id: string) => {
  if ((mitem as MItem).get("id") === id) {
    return mitem as MItem;
  }

  const childs = (mitem as MItem).get("childs");
  if (childs) {
    let found: null | MItem = null;
    childs.forEach((child) => {
      const f = findId(child, id);
      if (f) {
        found = f;
      }
    });

    if (found) return found;
  }
};
