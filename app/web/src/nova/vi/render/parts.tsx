import { FC, ReactNode, Suspense } from "react";
import { produceCSS } from "../../../utils/css/gen";
import { IContent } from "../../../utils/types/general";
import { IMeta } from "../../ed/logic/ed-global";
import { ErrorBox } from "../utils/error-box";
import { VG } from "./global";
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
    meta: Record<string, IMeta>;
  },
  meta: IMeta
) => {
  const item = meta.item;

  const props: PROPS = {
    className: produceCSS(item, {
      mode: "desktop",
    }),
  };

  let text_props: PROPS = {};

  const childs = meta.item.childs;
  let children = undefined;
  if ((meta.item as IContent).type === "text") {
    children = <HTMLChild props={text_props} />;
  } else {
    children =
      Array.isArray(childs) &&
      childs?.map((item) => {
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
  props.children = children;

  return {
    props,
    text_props,
  };
};

const HTMLChild: FC<{ props: PROPS }> = ({ props }) => {
  return <span {...props} />;
};
