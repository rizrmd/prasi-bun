import init from "wasm-gzip";
import { jscript } from "../../../utils/script/jscript";
import { dbClient } from "../../vi/load/db/client-db";
import { PG } from "./ed-global";
import { fetchViaProxy } from "../../vi/load/proxy";

let w = window as unknown as { db: ReturnType<typeof dbClient> };

export const edInit = async (p: PG) => {
  p.status = "ready";

  const cur = new URL(location.href);
  w.db = dbClient("prasi", `${cur.protocol}//${cur.host}`);

  await init();
  jscript.init(p.render);

  p.script.loaded = true;
  p.render();
};
