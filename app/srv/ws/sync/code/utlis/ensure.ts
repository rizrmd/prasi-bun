import { exists, dirAsync } from "fs-jetpack";
import { dirname } from "path";
import { dir } from "dir";

export const ensure = async (path: string, content: string) => {
  const _path = dir.data(path);
  const _dir = dirname(_path);
  if (!exists(_dir)) {
    await dirAsync(_dir);
  }
  if (!exists(_path)) {
    await Bun.write(_path, content);
  }
};
