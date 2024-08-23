import { produceCSS } from "../../../utils/css/gen";
import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { IMeta } from "../../ed/logic/ed-global";
import { ViRender } from "./render";

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
  passprop: any,
  depth: number
) => {
  const item = meta.item;

  let inherit = undefined;
  if (item.component?.style) {
    inherit = {
      style: item.component.style,
      className: produceCSS(item.component.style, { mode: vi.mode }),
    };
  }

  const props: PROPS & { inherit?: { style: IItem; className: string } } = {
    className: produceCSS(item, {
      mode: vi.mode,
    }),
    inherit,
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

        let meta = is_layout ? vi.layout?.meta[id] : vi.meta[id];

        if (!meta) {
          if (item.type === "item" && item.component?.id) {
            console.error(
              `Warning component ${item.name} - ${item.component.id} failed to load.`
            );
          }
          return null;
        }


        return (
          <ViRender
            key={id}
            meta={meta}
            is_layout={is_layout}
            passprop={{ ...passprop }}
            depth={depth + 1}
          />
        );
      });
  }

  props.children = children;

  if (meta.item.adv?.html) {
    delete props.children;
    props.dangerouslySetInnerHTML = { __html: meta.item.adv?.html };
  } else if (meta.item.adv?.js && !meta.item.adv.js.includes("children")) {
    delete props.children;
    delete props.dangerouslySetInnerHTML;
  }

  return {
    props,
    text_props,
  };
};
