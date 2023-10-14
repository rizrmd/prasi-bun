
export type DBArg = {
  db: string;
  table: string;
  action: string;
  params: any[];
};

export const execQuery = async (args: DBArg, prisma: any) => {
  const { table, action, params } = args;

  const tableInstance = prisma[table];

  if (tableInstance) {
    if (action === "query" && table.startsWith("$query")) {
      try {
        const q = params.shift();
        q.sql = true;
        Object.freeze(q);
        return await tableInstance.bind(prisma)(q, ...params);
      } catch (e) {
        console.log(e);
        return e;
      }
    }

    const method = tableInstance[action];

    if (method) {
      try {
        const result = await method(...params);

        if (!result) {
          return JSON.stringify(result);
        }

        return result;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
  }
};
