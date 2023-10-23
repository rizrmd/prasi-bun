import { IItem } from "../../../../../../../utils/types/item";
import { PG } from "../../../../../logic/ed-global";

export const edActionAttach = (p: PG, item: IItem) => {
  p.ui.select.id = item.id;
  const pick = () => {
    p.ui.popup.comp = (comp_id) => {};
    p.render();
  };
  pick();
};
