import * as Y from "yjs";
import { TypedDoc, TypedMap } from "yjs-types";
import { MItem } from "../../../../web/src/utils/types/item";
import { DPage } from "../../../../web/src/utils/types/root";
export * as Y from "yjs";

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
      doc: TypedDoc<{ map: TypedMap<{ id: string; item: MItem }> }>;
      um: Y.UndoManager;
    }
  >,
};
