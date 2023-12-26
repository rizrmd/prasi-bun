import { IItem } from "../../../../utils/types/item";
import { GenMetaP } from "../../utils/types";
import { genMeta } from "../meta";

export const initLoadComp = async (
  p: GenMetaP,
  item: IItem,
  load: (comp_ids: string[]) => Promise<void>,
  _loaded?: Set<string>
) => {
  const comp_ids = new Set<string>();
  genMeta(
    {
      ...p,
      on: {
        visit_component: ({ component }) => {
          if (component) {
            const { id } = component;
            if (!p.comps[id]) {
              if (!_loaded || (_loaded && !_loaded.has(id))) {
                comp_ids.add(id);
              }
            }
          }
        },
      },
      set_meta: false,
      note: "init-load-comp",
    },
    { item, ignore_first_component: true }
  );
  if (comp_ids.size > 0) {
    await load([...comp_ids]);

    let loaded = _loaded;
    if (!loaded) {
      loaded = new Set<string>();
    }
    comp_ids.forEach((id) => {
      if (loaded) loaded.add(id);
    });

    await initLoadComp(p, item, load, loaded);
  }
};
