import { IItem } from "../../../../../../../utils/types/item";
import { PG } from "../../../../../logic/ed-global";

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
        await p.sync.comp.new({ group_id, item });
      },
    };
    p.render();
  }
};
