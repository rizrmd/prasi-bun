import { TypedDoc, TypedMap } from "yjs-types";
import { MItem } from "../../../../web/src/utils/types/item";
import { DComp, DPage } from "../../../../web/src/utils/types/root";

export const docs = {
  site: {} as Record<
    string,
    {
      id: string;
      doc: DPage;
      um: Y.UndoManager;
    }
  >,
  page: {} as Record<
    string,
    {
      id: string;
      doc: DPage;
      um: Y.UndoManager;
    }
  >,
  comp: {} as Record<
    string,
    {
      id: string;
      doc: DComp;
      um: Y.UndoManager;
    }
  >,
};
