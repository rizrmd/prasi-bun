import { DCode, DComp, DPage } from "../../../../web/src/utils/types/root";

export const docs = {
  site: {} as Record<
    string,
    {
      id: string;
      doc: DPage;
      um: YJS.UndoManager;
    }
  >,
  page: {} as Record<
    string,
    {
      id: string;
      doc: DPage;
      um: YJS.UndoManager;
    }
  >,
  comp: {} as Record<
    string,
    {
      id: string;
      doc: DComp;
      um: YJS.UndoManager;
    }
  >,
  code: {} as Record<string, { id: string; build: Record<string, DCode> }>,
};
