import { dir } from "dir";
import { g } from "utils/global";
import { DCode } from "../../../../web/src/utils/types/root";
import { readDirectoryRecursively } from "../../../api/site-export";
import { SAction } from "../actions";
import { docs } from "../entity/docs";
import { SyncConnection } from "../type";
import { getCode } from "../editor/code/prep-code";
export const code_load: SAction["code"]["load"] = async function (
  this: SyncConnection,
  site_id,
  type
) {
  let result = null as unknown as Awaited<ReturnType<SAction["code"]["load"]>>;

  const code = await getCode(site_id, "site");

  if (code) {
    if (!docs.code[site_id]) {
      docs.code[site_id] = {
        id: site_id,
        src: loadFolderAsDCode(dir.path(`${g.datadir}/site/code/${code.id}`)),
        build: loadFolderAsDCode(
          dir.path(`${g.datadir}/site/build/${code.id}`)
        ),
      };
    }

    return result;
  }

  return { id: site_id, snapshot: null };
};

const loadFolderAsDCode = (path: string) => {
  const doc = new Y.Doc() as DCode;

  const dirs = readDirectoryRecursively(path);

  return doc;
};
