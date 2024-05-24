import { IItem } from "../../../../utils/types/item";
import { FNComponent } from "../../../../utils/types/meta-fn";
import { GenMetaP, IMeta } from "../../utils/types";
import { genMeta } from "../meta";

export const initLoadComp = async (
  p: GenMetaP,
  item: IItem,
  opt: {
    load: (comp_ids: string[]) => Promise<void>;
    visit?: ((meta: IMeta, item: IItem, shared: any) => void) | undefined;
    done?: (shared: any) => void;
  },
  _loaded?: Set<string>
) => {
  const comp_ids = new Set<string>();
  const shared = { root: item } as any;
  const comps = [] as FNComponent[];
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
            comps.push(component);
          }
        },
        visit(meta, vitem) {
          if (opt.visit) opt.visit(meta, vitem, shared);
        },
      },
      set_meta: false,
      note: "init-load-comp",
    },
    { item, ignore_first_component: true }
  );

  if (opt.done) opt.done(shared);
  let loaded = _loaded;
  if (!loaded) {
    loaded = new Set<string>();
  }
  if (comp_ids.size > 0) {
    await opt.load([...comp_ids]);

    comp_ids.forEach((id) => {
      if (loaded) loaded.add(id);
    });

    for (const id of [...loaded]) {
      const comp = p.comps[id];
      if (comp) {
        await initLoadComp(p, comp, opt, loaded);
      }
    }
  }

  for (const component of comps) {
    if (component.props) {
      for (const prop of Object.values(component.props)) {
        if (prop.meta?.type === "content-element" && prop.content) {
          await initLoadComp(p, prop.content, opt, loaded);
        }
      }
    }
  }
};
