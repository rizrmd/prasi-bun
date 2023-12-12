import { IMeta } from "../../ed/logic/ed-global";
import { VG } from "./global";

export const viEvalProps = async (ctx: VG, meta: IMeta) => {
  if (meta.item.component?.props) {
    for (const [k, v] of Object.entries(meta.item.component.props)) {
    }
  }
};
