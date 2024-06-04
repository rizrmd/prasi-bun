import { Prisma, PrismaClient } from "./prisma";

export type PrismaExtend = {
  _batch: {
    update: <T extends Prisma.ModelName>(
      batch: {
        table: T;
        data: Exclude<
          Parameters<PrismaClient[T]["update"]>[0],
          undefined
        >["data"];
        where: Exclude<
          Parameters<PrismaClient[T]["findMany"]>[0],
          undefined
        >["where"];
      }[]
    ) => Promise<void>;
    upsert: <T extends Prisma.ModelName>(arg: {
      table: T;
      where: Exclude<
        Parameters<PrismaClient[T]["findMany"]>[0],
        undefined
      >["where"];
      data: Exclude<
        Parameters<PrismaClient[T]["create"]>[0],
        undefined
      >["data"][];
      mode?: "field" | "relation";
    }) => Promise<void>;
  };
  _schema: {
    tables: () => Promise<Prisma.ModelName[]>;
    columns: (table: Prisma.ModelName) => Promise<
      Record<
        string,
        {
          is_pk: boolean;
          type: string;
          optional: boolean;
          db_type: string;
          default?: any;
        }
      >
    >;
    rels: (table: Prisma.ModelName) => Promise<
      Record<
        string,
        {
          type: "has-many" | "has-one";
          to: {
            table: Prisma.ModelName;
            fields: string[];
          };
          from: {
            table: Prisma.ModelName;
            fields: string[];
          };
        }
      >
    >;
  };
};
