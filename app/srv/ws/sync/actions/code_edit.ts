import { TransformResult, transform } from "esbuild";
import { g } from "utils/global";
import { Doc } from "yjs";
import { MContent } from "../../../../web/src/utils/types/general";
import { MItem } from "../../../../web/src/utils/types/item";
import { MRoot } from "../../../../web/src/utils/types/root";
import { SAction } from "../actions";
import { docs } from "../entity/docs";
import { gunzipAsync } from "../entity/zlib";
import { SyncConnection } from "../type";
import { parseJs } from "../editor/parser/parse-js";
const decoder = new TextDecoder();

export const code_edit: SAction["code"]["edit"] = async function (
  this: SyncConnection,
  arg
) {
  const src = decoder.decode(await gunzipAsync(arg.value));

  if (arg.type === "adv" || arg.type === "prop-instance") {
    const { item_id, comp_id, page_id } = arg;

    let root = undefined as undefined | MRoot | MItem;
    let doc = undefined as undefined | Doc;
    let save_to = "page";
    if (page_id) {
      const ref = docs.page[page_id];
      if (ref) {
        root = ref.doc.getMap("map").get("root");
        doc = ref.doc as Doc;
      }
    } else if (comp_id) {
      save_to = "comp";
      const ref = docs.comp[comp_id];
      if (ref) {
        root = ref.doc.getMap("map").get("root");
        doc = ref.doc as Doc;
      }
    }

    if (root) {
      const mitem = findId(root, item_id);

      if (mitem) {
        if (arg.type === "adv") {
          const mode = arg.mode;
          try {
            let res = undefined as undefined | TransformResult;
            if (mode === "js") {
              res = await transform(`render(${src})`, {
                jsx: "transform",
                format: "cjs",
                loader: "tsx",
              });
            }
            doc?.transact(() => {
              let adv = mitem.get("adv");
              if (!adv) {
                mitem.set("adv", new Y.Map() as any);
                adv = mitem.get("adv");
              }

              if (adv) {
                try {
                  if (adv) {
                    adv.set(mode, src);
                    if (mode === "js" && res) {
                      adv.set("jsBuilt", res.code);
                    }
                  }
                } catch (e) {
                  g.log.error(e);
                }

                if (mode === "js") {
                  const res = parseJs(adv.get("js")) || false;
                  if (res) {
                    mitem.set("script", res);
                  } else {
                    mitem.delete("script");
                  }
                }
              }
            });

            if (save_to === "comp") {
              await db.component.update({
                where: { id: comp_id },
                data: {
                  content_tree: root.toJSON(),
                },
              });
            } else {
              await db.page.update({
                where: { id: page_id },
                data: {
                  content_tree: root.toJSON(),
                },
              });
            }
          } catch (e: any) {
            return e.message.toString();
          }
        } else {
          const mprop = mitem
            .get("component")
            ?.get("props")
            ?.get(arg.prop_name);

          if (mprop) {
            try {
              const res = await transform(`return ${src}`, {
                jsx: "transform",
                format: "cjs",
                loader: "tsx",
              });

              doc?.transact(() => {
                mprop.set("value", src);
                mprop.set("valueBuilt", res.code.substring(6));
              });

              if (save_to === "comp") {
                await db.component.update({
                  where: { id: comp_id },
                  data: {
                    content_tree: root.toJSON(),
                  },
                });
              } else {
                await db.page.update({
                  where: { id: page_id },
                  data: {
                    content_tree: root.toJSON(),
                  },
                });
              }
            } catch (e: any) {
              return e.message.toString();
            }
          }
        }
      }
    }
  } else if (arg.type === "prop-master") {
    const { comp_id, prop_kind, prop_name } = arg;

    if (comp_id) {
      const ref = docs.comp[comp_id];
      if (ref) {
        const root = ref.doc.getMap("map").get("root");
        const doc = ref.doc as Doc;
        if (root) {
          const mprops = root.get("component")?.get("props");
          const mprop = mprops?.get(prop_name);
          if (mprop) {
            try {
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
              await db.component.update({
                where: { id: comp_id },
                data: {
                  content_tree: root.toJSON(),
                },
              });
            } catch (e: any) {
              return e.message.toString();
            }
          }
        }
      }
    }
  }
  return false;
};

const findId = (mitem: MContent | MRoot, id: string) => {
  let found: null | MItem = null;

  const m = mitem as MItem;
  if (m.get("id") === id) {
    return m;
  }

  const childs = m.get("childs");
  if (childs) {
    childs.forEach((child) => {
      const f = findId(child, id);
      if (f) {
        found = f;
      }
    });
  }

  if (!found) {
    const mprops = m.get("component")?.get("props");
    if (mprops) {
      mprops.forEach((mprop) => {
        if (mprop.get("meta")?.get("type") === "content-element") {
          const mcontent = mprop.get("content");
          if (mcontent) {
            const f = findId(mcontent, id);
            if (f) {
              found = f;
            }
          }
        }
      });
    }
  }

  if (found) return found;
};
