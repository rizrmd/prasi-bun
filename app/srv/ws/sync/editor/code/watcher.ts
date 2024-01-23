import { BuildContext } from "esbuild";
import { watch } from "fs";

export const Code = {
  pkginstall: {} as Record<string, true>,
  watchers: {} as Record<
    string,
    { id: string; watcher: ReturnType<typeof watch> }
  >,
  build: {
    ctx: {} as Record<string, BuildContext>,
    timeout: {} as Record<string, ReturnType<typeof setTimeout>>,
  },
  timeout: {} as Record<string, ReturnType<typeof setTimeout>>,
};

export const startCodeWatcher = async (id_site: string) => {};

export const stopCodeWatcher = async (id_site: string) => {};
