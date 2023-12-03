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
  if (arg.type === "adv") {
    const { item_id, mode, comp_id, page_id, value } = arg;
    const src = decoder.decode(await gunzipAsync(value));

    let root = undefined as undefined | MRoot | MItem;
    let doc = undefined as undefined | Doc;
    if (page_id) {
      const ref = docs.page[page_id];
      if (ref) {
        root = ref.doc.getMap("map").get("root");
        doc = ref.doc as Doc;
      }
    }

    if (root) {
      const mitem = findId(root, item_id);

      if (mitem) {
        const adv = mitem.get("adv");

        if (adv) {
          doc?.transact(async () => {
            adv.set(mode, src);

            if (mode === "js") {
              const res = await transform(`render(${src})`, {
                jsx: "transform",
                format: "cjs",
                loader: "tsx",
                minify: true,
                sourcemap: "inline",
              });
              adv.set("jsBuilt", res.code);
            }
          });
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
