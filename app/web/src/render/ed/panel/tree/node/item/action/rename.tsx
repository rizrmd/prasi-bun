import { IContent } from "../../../../../../../utils/types/general";
import { PG } from "../../../../../logic/ed-global";

export const edActionRename = (p: PG, item: IContent) => {
  p.ui.tree.rename_id = item.id;
  p.render();
};
