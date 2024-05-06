import { dir } from "dir";
import { code } from "../../code";

export const initTypings = async (
  root: string,
  id_site: string,
  force?: boolean
) => {
  let existing = code.internal.typings[id_site];
  if (existing) {
    if (force) {
      existing.kill();
      await existing.exited;
    } else {
      return;
    }
  }

  try {
    code.internal.typings[id_site] = Bun.spawn({
      cmd: [
        ...`tsc --watch --moduleResolution node --emitDeclarationOnly --outFile ../typings.d.ts --declaration --noEmit false`.split(
          " "
        ),
      ],
      cwd: dir.data(`/code/${id_site}/site/src`),
      stdio: ["ignore", "ignore", "ignore"],
    });
  } catch (e) {
    console.log(e);
  }
};
