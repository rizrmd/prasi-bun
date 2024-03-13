export const prismaExtendType = `\
{
  _batch: {
    update: (
      table: string, 
      batch: { data: any, where: any }[]
    ) => Promise<void>;
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
    rels: (table: string) => Promise<{
      type: 'has-many' | 'has-one';
      to: {
        table: string, 
        fields: string[]
      };
      from: { 
        table: string, 
        fields: string[]
      }
    }>;
  }
}`;

const rel_types = `\
{
  
}`;
