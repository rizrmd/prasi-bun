import { $ } from "bun";
import { dir } from "dir";
import { exists, dirAsync } from "fs-jetpack";

export const ensureLib = async (src_dir: string, id_site: string) => {
  if (!exists(dir.data(src_dir))) {
    await dirAsync(dir.data(src_dir));
  }

  if (!exists(dir.data(`${src_dir}/lib`))) {
    console.log(`${src_dir}/lib not found.`);
    const _ = $.cwd(dir.data(src_dir));
    await _`git clone https://github.com/avolut/prasi-lib lib`;
  }
};
