import { codeBuild } from "../../../../../vi/render/script/code-build";
import { active, PG } from "../../../../logic/ed-global";

export const codeEditPropMaster = async (p: PG, value: string) => {
  const prop_kind = p.ui.popup.script.prop_kind;
  const prop_name = p.ui.popup.script.prop_name;
  const comp = p.comp.list[active.comp_id];

  if (comp) {
    const mprop = comp.doc
      .getMap("map")
      .get("root")
      ?.get("component")
      ?.get("props")
      ?.get(prop_name);
    if (mprop) {
      try {
        const valueBuilt = (await codeBuild({ _: value }))["_"];
        mprop.doc?.transact(() => {
          if (prop_kind === "value") {
            mprop.set("value", value);
            mprop.set("valueBuilt", valueBuilt);
          } else if (prop_kind === "onChange") {
            mprop.set("onChange", value);
            mprop.set("onChangeBuilt", valueBuilt);
          } else if (prop_kind === "gen") {
            mprop.set("gen", value);
            mprop.set("genBuilt", valueBuilt);
          } else if (prop_kind === "visible") {
            mprop.set("visible", value);
          } else if (prop_kind === "typings") {
            mprop.set("typings", value);
          } else if (prop_kind === "option") {
            const meta = mprop.get("meta");
            if (meta) {
              meta.set("options", value);
              meta.set("optionsBuilt", valueBuilt);
            }
          }
        });
      } catch (e: any) {
        return e.message;
      }
    }
  }
};
