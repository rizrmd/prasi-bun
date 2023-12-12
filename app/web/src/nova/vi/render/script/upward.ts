import { IMeta } from "../../../ed/logic/ed-global";
import { ViContext } from "../parts";

export const viScopeUpward = (ctx: ViContext, meta: IMeta) => {
  let cur = meta;

  if (cur && cur.parent) {
    while (cur.parent) {
      console.log(cur.scope);

      if (!ctx.meta[cur.parent.id]) break;
      cur = ctx.meta[cur.parent.id];
    }
  }

  return {};
};
