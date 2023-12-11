import { FC, ReactNode } from "react";
import { IMeta } from "../../ed/logic/ed-global";
import { ViContext, viParts } from "./parts";
import { ViScript } from "./script";
import { ErrorBox } from "../utils/error-box";

export const ViRender: FC<{
  ctx: ViContext;
  meta: IMeta;
  children?: ReactNode;
}> = ({ meta, children, ctx }) => {
  if (!meta) return null;

  if (meta.item.adv?.js || meta.item.component?.id) {
    return (
      <ErrorBox>
        <ViScript ctx={ctx} meta={meta} />
      </ErrorBox>
    );
  }

  const parts = viParts(meta);
  let renderChild = undefined;

  if (parts.shouldRenderChild) {
    renderChild = children
      ? children
      : meta.item.childs?.map((item) => {
          if (!item) return null;
          const { id } = item;
          return (
            <ErrorBox key={id}>
              <ViRender ctx={ctx} meta={ctx.meta[id]} />
            </ErrorBox>
          );
        });
  }

  return (
    <div {...parts.props} className={parts.className}>
      {renderChild}
    </div>
  );
};
