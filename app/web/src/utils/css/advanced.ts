import { responsiveVal } from "../../nova/ed/panel/side/style/tools/responsive-val";
import { MetaItem } from "../types/meta";
import { FNAdv } from "../types/meta-fn";

export const cssAdv = (
  cur: { adv?: FNAdv; type: MetaItem["type"] },
  mode: "mobile" | "desktop"
) => {
  const adv = responsiveVal<FNAdv>(cur, "adv", mode, {});

  if (typeof adv.css === "string") {
    const hasCSS = adv.css.trim();
    if (hasCSS) {
      return cx(
        css`
          ${adv.css}
        `,
        mode
      );
    }
  }
  return "";
};
