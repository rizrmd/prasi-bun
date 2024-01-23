import { DCode, DComp, DPage } from "../../../../web/src/utils/types/root";

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
  code: {} as Record<string, { id: string; build: Record<string, DCode> }>,
};
