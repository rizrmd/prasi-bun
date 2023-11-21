import { createId } from "@paralleldrive/cuid2";
import { IContent } from "../../../../utils/types/general";
import { IItem } from "../../../../utils/types/item";
import { FNComponent } from "../../../../utils/types/meta-fn";
import { EdMeta, PG } from "../ed-global";
import { deepClone } from "web-utils";

export const walkLoad = async (
  p: { map: PG["comp"]["map"] },
  item: IContent,
  loaded: Set<string>,
  loadComponent: (id: string) => Promise<boolean>
) => {
  if (item.type === "item" && item.component?.id) {
    const id = item.component?.id;
    const comp = item.component as FNComponent;

    if (id && comp) {
      const isFirstLoaded = !loaded.has(id);
      loaded.add(id);
      if (!p.map[id]) {
        await loadComponent(comp.id);
      }
      if (p.map[id] && isFirstLoaded) {
        await walkLoad(p, p.map[id].item, loaded, loadComponent);
      }
    }

    for (const [propName, prop] of Object.entries(comp.props || {})) {
      if (prop.meta?.type === "content-element") {
        const mprop = comp.props[propName];
        if (mprop) {
          const mcontent = mprop.content;
          if (mcontent) {
            await walkLoad(p, mcontent, loaded, loadComponent);
          }
        }
      }
    }
  }

  if (item.type !== "text") {
    await Promise.all(
      item.childs.map((e) => walkLoad(p, e, loaded, loadComponent))
    );
  }
};

export const walkMap = (
  p: {
    meta: Record<string, EdMeta>;
    comps: Record<string, { id: string; item: IItem }>;
  },
  arg: {
    isLayout: boolean;
    item: IContent;
    parent_item: { id: string };
    portal: {
      in: Record<string, EdMeta>;
      out: Record<string, EdMeta>;
    };
    each?: (meta: EdMeta) => void;
    parent_comp?: { id: string; comp_id: string };
  }
) => {
  const { parent_item, parent_comp } = arg;

  let override_id = "";
  const id = arg.item.id;

  if (parent_comp && id) {
    const cmeta = p.meta[parent_comp.id];
    if (cmeta && cmeta.item.type === "item") {
      const comp = cmeta.item.component;
      if (comp) {
        const ref_ids = comp.ref_ids;
        if (ref_ids) {
          let ref_id = ref_ids[id];
          if (!ref_id) {
            ref_id = createId();
            ref_ids[id] = ref_id;
          }
          override_id = ref_id;
        }
      }
    }
  }

  let item = arg.item;
  if (override_id) {
    item.id = override_id;
  }

  const item_comp = item.type === "item" ? item.component : null;

  if (item_comp && item_comp.id && parent_item.id !== "root") {
    const comp_ref = p.comps[item_comp.id];

    if (!comp_ref) {
      console.error("Component failed to load: ", item_comp.id);
      return;
    }
    const mcomp = comp_ref.item;

    if (mcomp) {
      let ref_ids: Record<string, string> = item_comp.ref_ids;
      if (!ref_ids) {
        ref_ids = {};
        item_comp.ref_ids = ref_ids;
      }
      const original_id = item.id;
      item = deepClone(mcomp);
      item.id = original_id;

      const meta: EdMeta = {
        item,
        parent_item,
        indexedScope: {},
        isLayout: arg.isLayout,
      };
      if (item.name.startsWith("⬅")) {
        arg.portal.in[item.name] = meta;
      }
      if (item.name.startsWith("⮕")) {
        arg.portal.out[item.name] = meta;
      }
      if (arg.each) arg.each(meta);
      p.meta[item.id] = meta;

      if (item_comp.props) {
        for (const [k, mprop] of Object.entries(item_comp.props)) {
          if (mprop.meta?.type === "content-element" && mprop.content) {
            walkMap(p, {
              isLayout: arg.isLayout,
              item: mprop.content,
              parent_item: { id: item.id },
              portal: arg.portal,
              parent_comp: { id: item.id, comp_id: item_comp.id },
              each: arg.each,
            });
          }
        }
      }

      for (const c of mcomp.childs) {
        walkMap(p, {
          isLayout: arg.isLayout,
          item: c,
          parent_item: { id: item.id },
          portal: arg.portal,
          parent_comp: { id: item.id, comp_id: item_comp.id },
          each: arg.each,
        });
      }
    }
    return;
  }

  const meta: EdMeta = {
    item,
    parent_item,
    indexedScope: {},
    parent_comp,
    isLayout: arg.isLayout,
  };
  if (item.name.startsWith("⬅")) {
    arg.portal.in[item.name] = meta;
  }
  if (item.name.startsWith("⮕")) {
    arg.portal.out[item.name] = meta;
  }
  if (arg.each) arg.each(meta);
  p.meta[item.id] = meta;

  if (item.type !== "text") {
    for (const c of item.childs) {
      if (c) {
        walkMap(p, {
          isLayout: arg.isLayout,
          item: c,
          parent_item: { id: item.id },
          portal: arg.portal,
          parent_comp,
          each: arg.each,
        });
      }
    }
  }
};
