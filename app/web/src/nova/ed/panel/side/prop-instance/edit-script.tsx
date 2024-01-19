import { MouseEventHandler } from "react";
import { FMCompDef } from "../../../../../utils/types/meta-fn";
import { PG, PropFieldKind } from "../../../logic/ed-global";

export const createEditScript = (
  p: PG,
  kind: PropFieldKind,
  mprop: FMCompDef,
  name: string
) => {
  return (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const meta = mprop.get("meta");
    if (meta) {
      p.ui.popup.script.mode = "js";
      p.ui.popup.script.open = true;
      p.ui.popup.script.type = "prop-instance";
      p.ui.popup.script.prop_kind = kind;
      p.ui.popup.script.prop_name = name;
      p.render();
    }
  };
};
