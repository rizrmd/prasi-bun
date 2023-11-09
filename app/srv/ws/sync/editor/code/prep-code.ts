export type DBCode = Exclude<Awaited<ReturnType<typeof getCode>>, null>;

export const prepCode = async (site_id: string, name: string) => {
  let code = await getCode(site_id);
  if (code) return code;
  let new_code = await db.code.create({
    data: {
      id_site: site_id,
    },
  });

  await db.code_file.create({
    data: {
      id_code: new_code.id,
      path: "index.tsx",
      content: `\
export const hello_world = () => {
  console.log('hello world')
}`,
    },
  });

  await db.code_file.create({
    data: {
      id_code: new_code.id,
      path: "package.json",
      content: JSON.stringify(
        {
          name: new_code.id,
          dependencies: {},
        },
        null,
        2
      ),
    },
  });

  code = await getCode(site_id);
  return code as DBCode;
};

const getCode = async (site_id: string) => {
  return await db.code.findFirst({
    where: {
      id_site: site_id,
    },
    select: {
      id: true,
      name: true,
      code_file: true,
    },
  });
};
