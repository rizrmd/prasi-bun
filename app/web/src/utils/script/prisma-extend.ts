export const prismaExtendType = `\
{
  _batch: {
    update: (
      batch: { 
        table: string, 
        data: any, 
        where: any 
      }[]
    ) => Promise<void>;
    upsert: (arg: {
      table: string;
      where: any;
      data: any[];
      mode?: "field" | "relation";
    }) => Promise<void>;
  };
  _schema: {
    tables: () => Promise<string[]>;
    columns: (table: string) => Promise<
      Record<
        string,
        {
          is_pk: boolean;
          type: string;
          optional: boolean;
          db_type: string;
          default?: any
        } 
      >
    >;
    rels: (table: string) => Promise<Record<string, {
      type: 'has-many' | 'has-one';
      to: {
        table: string, 
        fields: string[]
      };
      from: { 
        table: string, 
        fields: string[]
      }
    }>>;
  }
}`;
