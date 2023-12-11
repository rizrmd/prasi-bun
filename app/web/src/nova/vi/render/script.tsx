import { FC, ReactNode } from "react";
import { IMeta } from "../../ed/logic/ed-global";
import { ViContext, viParts } from "./parts";
import { ViRender } from "./render";
import { ErrorBox } from "../utils/error-box";
import { ViLocal } from "./script/local";
import { viScopeUpward } from "./script/upward";

export const ViScript: FC<{ ctx: ViContext; meta: IMeta }> = ({
  ctx,
  meta,
}) => {
  viEvalScript(ctx, meta);
  if (meta.script) return <ErrorBox>{meta.script.el}</ErrorBox>;
  return null;
};

export const viEvalScript = async (ctx: ViContext, meta: IMeta) => {
  const childs = meta.item.childs;
  const parts = viParts(meta);

  let children = undefined;
  if (parts.shouldRenderChild) {
    children =
      Array.isArray(childs) &&
      childs.map(({ id }) => {
        return <ViRender key={id} ctx={ctx} meta={ctx.meta[id]} />;
      });
  }

  const scope = viScopeUpward(ctx, meta);

  const arg = {
    ...scope,
    children,
    props: parts.props,
    Local: ViLocal,
    newElement: () => {},
    render: (jsx: ReactNode) => {
      meta.script = { el: jsx };
    },
  };

  const fn = new Function(...Object.keys(arg), meta.item.adv?.jsBuilt || "");
  fn(...Object.values(arg));
};
