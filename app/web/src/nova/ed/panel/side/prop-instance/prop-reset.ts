import { FMCompDef } from "../../../../../utils/types/meta-fn";
import { PG } from "../../../logic/ed-global";

export const reset = (
  p: PG,
  comp_id: string,
  mprop: FMCompDef,
  name: string
) => {
  if (comp_id) {
    const ref = p.comp.list[comp_id];

    if (ref.doc) {
      const mcprops = ref.doc
        .getMap("map")
        .get("root")
        ?.get("component")
        ?.get("props");
      const mcprop = mcprops?.get(name);
      if (mcprop) {
        mprop.doc?.transact(() => {
          mprop.set("value", mcprop.get("value"));
          mprop.set("valueBuilt", mcprop.get("valueBuilt"));
        });

        p.render();
      }
    }
  }
};
