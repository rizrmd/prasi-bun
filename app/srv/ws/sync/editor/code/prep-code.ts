import { dir } from "dir";
import { g } from "utils/global";
import { dirAsync } from "fs-jetpack";
import { docs } from "../../entity/docs";
export type DBCode = Exclude<Awaited<ReturnType<typeof getCode>>, null>;

export const prepCode = async (site_id: string, name: string) => {
  let code = await getCode(site_id, name);

  const pkgfile = Bun.file(
    dir.path(`${g.datadir}/site/code/${site_id}/package.json`)
  );
  if (!(await pkgfile.exists())) {
    await dirAsync(dir.path(`${g.datadir}/site/code/${site_id}`));
    await Bun.write(
      pkgfile,
      JSON.stringify(
        {
          name: "code",
          workspaces: ["./*"],
        },
        null,
        2
      )
    );
  }

  if (code) {
    await dirAsync(dir.path(`${g.datadir}/site/code/${site_id}/${code.id}`));
    return code;
  }
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

export const getCode = async (site_id: string, name?: string) => {
  return await db.code.findFirst({
    where: name
      ? { id_site: site_id, name }
      : {
          id_site: site_id,
        },
    select: {
      id: true,
      id_site: true,
      name: true,
      code_file: true,
    },
  });
};
