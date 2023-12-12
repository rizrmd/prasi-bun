import { FC, ReactNode, Suspense } from "react";
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

          return (
            <ErrorBox key={id}>
              <Suspense>
                <ViRender ctx={ctx} meta={ctx.meta[id]} />
              </Suspense>
            </ErrorBox>
          );
        });
  }

  return <div {...parts.props}>{renderChild}</div>;
};
