import init from "wasm-gzip";
import { jscript } from "../../../utils/script/jscript";
import { dbProxy } from "../../../base/load/db/db-proxy";
import { PG } from "./ed-global";
import { fetchViaProxy } from "../../../base/load/proxy";
import { ApiProxy, apiProxy } from "../../../base/load/api/api-proxy";

let w = window as unknown as {
  db: ReturnType<typeof dbProxy>;
  api: ApiProxy;
};

export const edInit = async (p: PG) => {
  p.status = "ready";

  await init();
  jscript.init(p.render, { esbuild: false });

  p.script.loaded = true;
  p.render();
};
