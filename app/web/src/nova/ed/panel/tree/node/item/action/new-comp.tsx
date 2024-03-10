import { IItem } from "../../../../../../../utils/types/item";
import { getMetaById } from "../../../../../logic/active/get-meta";
import { loadCompSnapshot } from "../../../../../logic/comp/load";
import { EComp, PG, active } from "../../../../../logic/ed-global";
import { treeRebuild } from "../../../../../logic/tree/build";
import { reloadCompPicker } from "../../../../popup/comp/comp-reload";

export const edActionNewComp = (
  p: PG,
  item: IItem,
  e: React.MouseEvent<HTMLElement, MouseEvent>
) => {
  const mitem = getMetaById(p, item.id)?.mitem;
  if (mitem) {
    p.ui.popup.comp_group = {
      mouse_event: e,
      async on_pick(group_id) {
        if (p.sync) {
          const item = mitem.toJSON() as IItem;
          let item_id = active.item_id;
          p.ui.tree.item_loading.push(item_id);
          let newcomp: void | EComp = undefined;
          if (active.comp_id) {
            newcomp = await p.sync.comp.new({
              group_id,
              item,
              comp_id: active.comp_id,
              item_id: active.item_id,
            });
          } else {
            newcomp = await p.sync.comp.new({
              group_id,
              item,
              page_id: p.page.cur.id,
              item_id: active.item_id,
            });
          }

          if (newcomp && newcomp.snapshot) {
            await loadCompSnapshot(p, newcomp.id, newcomp.snapshot);
            await treeRebuild(p);
          }

          p.ui.tree.item_loading = p.ui.tree.item_loading.filter(
            (e) => e !== item_id
          );
          p.render();
        }
        reloadCompPicker(p);
      },
    };
    p.render();
  }
};
