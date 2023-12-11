import { produceCSS } from "../../../utils/css/gen";
import { IContent } from "../../../utils/types/general";
import { IMeta } from "../../ed/logic/ed-global";

export type ViContext = {
  meta: Record<string, IMeta>;
  tick: number;
};
export type ViParts = {
  mode: "mobile" | "desktop";
  hover?: boolean;
  active?: boolean;
};

export const viParts = (meta: IMeta, arg?: ViParts) => {
  const item = meta.item;
  const content = meta.item as unknown as IContent;

  const props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > = {};

  let shouldRenderChild = true;
  if (content.type === "text") {
    props.dangerouslySetInnerHTML = { __html: item.html || "" };
    shouldRenderChild = false;
  }

  return {
    className: produceCSS(item, {
      mode: arg?.mode || "desktop",
      hover: arg?.hover,
      active: arg?.active,
    }),
    shouldRenderChild,
    props,
  };
};
