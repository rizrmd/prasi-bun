import { IMeta } from "../../ed/logic/ed-global";
import { ViContext } from "./parts";

export const viEvalProps = async (ctx: ViContext, meta: IMeta) => {
  if (meta.item.component?.props) {
    for (const [k, v] of Object.entries(meta.item.component.props)) {
    }
  }
};
