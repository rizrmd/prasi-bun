import { dirAsync, readAsync } from "fs-jetpack";
import { dir } from "./dir";

const _internal = { config: {} as any, writeTimeout: null as any };

export const config = {
  init: async () => {
    await dirAsync(dir("../data/config"));
    await dirAsync(dir("../data/files"));

    _internal.config =
      (await readAsync(dir("../data/config/conf.json"), "json")) || {};
  },
  get all() {
    return _internal.config;
  },
  get(key: string) {
    if (key.endsWith("url")) {
      if (!(_internal.config[key] instanceof URL)) {
        _internal.config[key] = new URL(_internal.config[key] || "");
      }
    }

    return _internal.config[key];
  },
  set(key: string, value: any) {
    _internal.config[key] = value;
    clearTimeout(_internal.writeTimeout);
    _internal.writeTimeout = setTimeout(() => {
      Bun.write(dir("../data/config/conf.json"), _internal.config);
    }, 100);
  },
};
