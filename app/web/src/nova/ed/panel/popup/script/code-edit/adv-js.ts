import { codeBuild } from "../../../../../vi/render/script/code-build";
import { getMetaById } from "../../../../logic/active/get-meta";
import { active, PG } from "../../../../logic/ed-global";

export const codeEditAdvJs = (p: PG, value: string) => {
  const meta = getMetaById(p, active.item_id);

  if (meta) {
    const mprop = meta.mitem?.get("adv");
    if (mprop) {
      try {
        const valueBuilt = codeBuild(
          { _: `render (${value})` },
          `[item: ${meta.item.name} - ${meta.item.id}]`
        )["_"];

        mprop.doc?.transact(() => {
          mprop.set("js", value);
          mprop.set("jsBuilt", valueBuilt);
        });
      } catch (e: any) {
        return e.message;
      }
    }
  }
};
