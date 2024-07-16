import { MItem } from "../../../../../utils/types/item";
import { FNAdv } from "../../../../../utils/types/meta-fn";
import { PG } from "../../../logic/ed-global";

export const edMonacoDefaultVal = (p: PG, adv: FNAdv, mitem: MItem) => {
  let val = "";

  if (p.ui.popup.script.type === "item") {
    const mode = p.ui.popup.script.mode;
    val = (typeof adv[mode] === "string" ? adv[mode] : "") as any;

    if (val === "") {
      if (mode === "js") {
        val = `\
<div {...props} className={cx(props.className, "")}>
  {children}
</div>`;
      } else if (mode === "css") {
        val = `\
& {
  display: flex;

  // &.mobile {}
  // &.desktop {}
  // &:hover {}
}`;
      }
    }
  } else if (
    p.ui.popup.script.type === "prop-master" ||
    p.ui.popup.script.type === "prop-instance"
  ) {
    const mprops = mitem?.get("component")?.get("props");
    if (mprops) {
      const mprop = mprops.get(p.ui.popup.script.prop_name);
      if (mprop) {
        const kind = p.ui.popup.script.prop_kind;

        if (kind === "value") {
          val = mprop.get("value");
        } else if (kind === "onChange") {
          val =
            mprop.get("onChange") ||
            `\
({ name, value, item }: { name: string; value: string; item: PrasiItem }) => {
  // on prop changed
}`;
        } else if (kind === "gen") {
          val =
            mprop.get("gen") ||
            `\
[
  // suggeestion
  async () => { 
    return { 
      label: '',
      list: [],  
    }
  },
  // generate
  async (opt: string) => {
    return \`""\`;
  },
]`;
        } else if (kind === "visible") {
          val = mprop.get("visible") || "true";
        } else if (kind === "typings") {
          val = mprop.get("typings") || "const typings = {}";
        } else if (kind === "option") {
          val =
            mprop.get("meta")?.get("options") ||
            `\
[
  {
    label: "yes",
    value: "y"
  },
  {
    label: "no",
    value: "n"
  },
]`;
        }
      }
    }
  }

  return val;
};
