import { FC, ReactNode, Suspense } from "react";
import { useGlobal } from "web-utils";
import { IMeta } from "../../ed/logic/ed-global";
import { ErrorBox } from "../utils/error-box";
import { ViGlobal } from "./global";
import { viParts } from "./parts";
import { ViScript } from "./script";

export const ViRender: FC<{
  meta: IMeta;
  children?: ReactNode;
}> = ({ meta, children }) => {
  if (!meta) return null;

  if (meta.item.hidden) return null;

  if (meta.item.adv?.js || meta.item.component?.id) {
    return <ViScript meta={meta}>{children}</ViScript>;
  }

  return <ViChild meta={meta}>{children}</ViChild>;
};

export const ViChild: FC<{
  meta: IMeta;
  children?: ReactNode;
}> = ({ meta, children }) => {
  const vi = useGlobal(ViGlobal, "VI");
  const parts = viParts(meta);
  if (vi.visit) vi.visit(meta, parts);

  let renderChild = undefined;

  if (parts.shouldRenderChild) {
    renderChild = children
      ? children
      : meta.item.childs?.map((item) => {
          if (!item) return null;
          const { id } = item;

          return (
            <ErrorBox key={id} meta={meta}>
              <Suspense>
                <ViRender meta={vi.meta[id]} />
              </Suspense>
            </ErrorBox>
          );
        });
  }

  return <div {...parts.props} children={renderChild} />;
};
