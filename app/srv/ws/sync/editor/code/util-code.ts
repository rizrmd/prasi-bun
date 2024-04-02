import { Server, WebSocketHandler } from "bun";
import { dir } from "dir";
import { BuildContext } from "esbuild";
import { dirAsync, exists, existsAsync, writeAsync } from "fs-jetpack";
import { dirname } from "path";

export type CodeBuild = {
  server: BuildContext | null;
  site: BuildContext | null;
  site_ts: number;
};
export type CodeMode = keyof CodeBuild;

export const code = {
  path(
    id_site: string,
    mode: CodeMode,
    type: "src" | "build" | "build_cache",
    path?: string
  ) {
    let file_path = "";
    if (path) {
      file_path = path[0] === "/" ? path : `/${path}`;
    }
    return dir.data(`/code/${id_site}/${mode}/${type}${file_path}`);
  },
  server: {} as Record<string, {}>,
  esbuild: {} as Record<string, CodeBuild>,
  prep(id_site: string, mode: CodeMode) {
    if (exists(dir.data(""))) {
      Bun.spawn({
        cmd: ["chmod", "-R", "777", "."],
        cwd: dir.data(``),
      });
    }
    const promises: Promise<void>[] = [];
    return {
      path(type: "src" | "build", path: string) {
        return dir.data(
          `/code/${id_site}/site/${type}${path[0] === "/" ? path : `/${path}`}`
        );
      },
      new_file(path: string, content: string) {
        promises.push(
          new Promise(async (done) => {
            const full_path = this.path("src", path);
            if (!(await existsAsync(full_path))) {
              await dirAsync(dirname(full_path));
              await writeAsync(full_path, content);
            }
            done();
          })
        );
        return this;
      },
      async await() {
        return await Promise.all(promises);
      },
    };
  },
};

export const codeGlobalTypings = `//@ts-ignore 
import type * as SRVAPI from "gen/srv/api/srv";
import { Server, WebSocketHandler } from "bun";
import prisma from "./prisma"; 

declare global {
  type Api = typeof SRVAPI;
  type ApiName = keyof Api;
  const api: { [k in ApiName]: Awaited<Api[k]["handler"]>["_"]["api"] } & { _raw: any };

  type PrasiServer = {
    ws?: WebSocketHandler<{ url: string }>;
    http: (arg: {
      url: { raw: URL; pathname: string };
      req: Request;
      server: Server;
      mode: "dev" | "prod";
      handle: (req: Request) => Promise<Response>;
      index: { head: string[]; body: string[]; render: () => string };
      prasi: { page_id?: string; params?: Record<string, any> };
    }) => Promise<Response>;
  };
}
`;
