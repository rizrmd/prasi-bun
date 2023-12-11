import { FC, ReactNode } from "react";
import { IMeta } from "../../ed/logic/ed-global";
import { ViContext, viParts } from "./parts";
import { ViScript } from "./script";

export const ViRender: FC<{
  ctx: ViContext;
  meta: IMeta;
  children?: ReactNode;
}> = ({ meta, children, ctx }) => {
  if (!meta) return null;

  if (meta.item.adv?.js || meta.item.component?.id) {
    return <ViScript ctx={ctx} meta={meta} />;
  }

  const parts = viParts(meta);
  let renderChild = undefined;

  if (parts.shouldRenderChild) {
    renderChild = children
      ? children
      : meta.item.childs?.map((item) => {
          if (!item) return null;
          const { id } = item;
          return <ViRender key={id} ctx={ctx} meta={ctx.meta[id]} />;
        });
  }

  return (
    <div {...parts.props} className={parts.className}>
      {renderChild}
    </div>
  );
};
