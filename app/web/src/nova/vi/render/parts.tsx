import { produceCSS } from "../../../utils/css/gen";
import { IContent } from "../../../utils/types/general";
import { IMeta } from "../../ed/logic/ed-global";

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
  > = {
    className: produceCSS(item, {
      mode: arg?.mode || "desktop",
      hover: arg?.hover,
      active: arg?.active,
    }),
  };

  let shouldRenderChild = true;
  if (content.type === "text" && !item.adv?.jsBuilt) {
    props.dangerouslySetInnerHTML = { __html: item.html || "" };
    shouldRenderChild = false;
  }
  
  if (content.adv?.html && !content.adv?.js) {
    props.dangerouslySetInnerHTML = { __html: content.adv.html };
    shouldRenderChild = false;
  }

  return {
    shouldRenderChild,
    props,
  };
};
