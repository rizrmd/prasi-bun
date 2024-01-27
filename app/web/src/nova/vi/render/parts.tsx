import { FC } from "react";
import { produceCSS } from "../../../utils/css/gen";
import { IContent } from "../../../utils/types/general";
import { IMeta } from "../../ed/logic/ed-global";
import { ViRender } from "./render";
import { VG } from "./global";

export type ViParts = {
  mode: "mobile" | "desktop";
  hover?: boolean;
  active?: boolean;
};

type PROPS = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const viParts = (
  vi: {
    mode: "desktop" | "mobile";
    meta: Record<string, IMeta>;
    layout?: {
      id: string;
      meta: Record<string, IMeta>;
      entry: string[];
    };
  },
  meta: IMeta,
  is_layout: boolean,
  passprop: any
) => {
  const item = meta.item;

  const props: PROPS = {
    className: produceCSS(item, {
      mode: vi.mode,
    }),
  };

  let text_props: PROPS = {};

  const childs = meta.item.childs;
  let children = undefined;

  if ((meta.item as IContent).type === "text") {
    children = null;
    props.dangerouslySetInnerHTML = { __html: meta.item.html || "" };
  } else {
    children =
      Array.isArray(childs) &&
      childs?.map((item) => {
        if (!item) return null;
        const { id } = item;

        const meta = is_layout ? vi.layout?.meta[id] : vi.meta[id];
        if (!meta) return null;

        return (
          <ViRender
            key={id}
            meta={meta}
            is_layout={is_layout}
            passprop={passprop}
          />
        );
      });
  }

  props.children = children;

  if (meta.item.adv?.js && !meta.item.adv.js.includes("children")) {
    delete props.children;
    delete props.dangerouslySetInnerHTML;
  }

  return {
    props,
    text_props,
  };
};
