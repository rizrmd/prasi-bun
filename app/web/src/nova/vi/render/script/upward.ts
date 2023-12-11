import { IMeta } from "../../../ed/logic/ed-global";
import { ViContext } from "../parts";

export const viScopeUpward = (ctx: ViContext, meta: IMeta) => {
  let cur = meta;

  // while (cur.parent) {
  //   if (cur.scope.def) {
  //     console.log(cur.item.id, cur.item.name, cur.scope);
  //   }
  //   cur = ctx.meta[cur.parent.id];
  // }

  return {};
};
