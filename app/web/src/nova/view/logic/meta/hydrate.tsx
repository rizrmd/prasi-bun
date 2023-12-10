import { IItem, MItem } from "../../../../utils/types/item";
import { IRoot, MRoot } from "../../../../utils/types/root";
import { initLoadComp } from "./comp/init-load-comp";
import { genMeta } from "./meta";
import { GenMetaP } from "./types";

export const hydrateRoot = async (
  p: GenMetaP,
  mroot: MRoot | MItem,
  loadComponents: (comp_ids: string[]) => Promise<void>
) => {
  const root = mroot.toJSON() as IRoot;
  if (root.type === "root") {
    const mitems: MItem[] = [];
    (mroot as MRoot).get("childs")?.forEach(async (mitem) => {
      mitems.push(mitem);
    });

    await Promise.all(mitems.map((mitem) => hydrate(p, mitem, loadComponents)));
  } else {
    await hydrate(p, mroot as MItem, loadComponents);
  }
};

const hydrate = async (
  p: GenMetaP,
  mitem: MItem,
  loadComponents: (comp_ids: string[]) => Promise<void>
) => {
  const item = mitem.toJSON() as IItem;
  await initLoadComp(p, item, loadComponents);

  genMeta(
    {
      ...p,
    },
    { item, mitem }
  );
};
