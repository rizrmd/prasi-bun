import { IItem } from "../../../../../../../utils/types/item";
import { PG, active } from "../../../../../logic/ed-global";
import { treeRebuild } from "../../../../../logic/tree/build";

export const edActionNewComp = (
  p: PG,
  item: IItem,
  e: React.MouseEvent<HTMLElement, MouseEvent>
) => {
  const mitem = p.page.meta[item.id].mitem;
  if (mitem) {
    p.ui.popup.comp_group = {
      mouse_event: e,
      async on_pick(group_id) {
        const item = mitem.toJSON() as IItem;
        let item_id = active.item_id;
        p.ui.tree.item_loading.push(item_id);
        await treeRebuild(p);
        if (active.comp_id) {
          await p.sync.comp.new({
            group_id,
            item,
            comp_id: active.comp_id,
            item_id: active.item_id,
          });
        } else {
          await p.sync.comp.new({
            group_id,
            item,
            page_id: p.page.cur.id,
            item_id: active.item_id,
          });
        }

        p.ui.tree.item_loading = p.ui.tree.item_loading.filter(
          (e) => e !== item_id
        );
        p.render();
      },
    };
    p.render();
  }
};
