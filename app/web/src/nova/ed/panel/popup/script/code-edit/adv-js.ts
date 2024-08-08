import { codeBuild } from "../../../../../vi/render/script/code-build";
import { getMetaById } from "../../../../logic/active/get-meta";
import { active, PG } from "../../../../logic/ed-global";

export const codeEditAdvJs = async (p: PG, value: string) => {
  const meta = getMetaById(p, active.item_id);

  if (meta && meta.mitem) {
    const valueBuilt = (
      await codeBuild(
        { _: `render (${value})` },
        `[item: ${meta.item.name} - ${meta.item.id}]`
      )
    )["_"];

    meta.mitem.doc?.transact(() => {
      let mprop = meta.mitem?.get("adv");

      if (!mprop) {
        meta.mitem?.set("adv", new Y.Map() as any);
        mprop = meta.mitem?.get("adv");
      }

      if (mprop) {
        try {
          mprop.set("js", value);
          mprop.set("jsBuilt", valueBuilt);
        } catch (e: any) {
          return e.message;
        }
      }
    });
  }
};
