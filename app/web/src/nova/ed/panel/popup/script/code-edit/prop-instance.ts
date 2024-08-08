import { codeBuild } from "../../../../../vi/render/script/code-build";
import { getMetaById } from "../../../../logic/active/get-meta";
import { active, PG } from "../../../../logic/ed-global";

export const codeEditPropInstance = async (p: PG, value: string) => {
  const prop_name = p.ui.popup.script.prop_name;
  const meta = getMetaById(p, active.item_id);

  if (meta) {
    const mprop = meta.mitem?.get("component")?.get("props")?.get(prop_name);
    if (mprop) {
      try {
        const valueBuilt = (await codeBuild({ _: value }))["_"];
        mprop.doc?.transact(() => {
          mprop.set("value", value);
          mprop.set("valueBuilt", valueBuilt);
        });
      } catch (e: any) {
        return e.message;
      }
    }
  }
};
