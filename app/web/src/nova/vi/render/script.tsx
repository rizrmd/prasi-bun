import { FC } from "react";
import { IMeta } from "../../ed/logic/ed-global";
import { ViContext, viParts } from "./parts";
import { ViRender } from "./render";

export const ViScript: FC<{ ctx: ViContext; meta: IMeta }> = ({
  ctx,
  meta,
}) => {
  const childs = meta.item.childs;
  const parts = viParts(meta);

  let renderChild = undefined;
  if (parts.shouldRenderChild) {
    renderChild =
      Array.isArray(childs) &&
      childs.map(({ id }) => {
        return <ViRender key={id} ctx={ctx} meta={ctx.meta[id]} />;
      });
  }

  return (
    <div {...parts.props} className={parts.className}>
      {renderChild}
    </div>
  );
};

export const viEvalScript = async (ctx: ViContext, meta: IMeta) => {};
