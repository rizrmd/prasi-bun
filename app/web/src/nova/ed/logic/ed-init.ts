import init from "wasm-gzip";
import { jscript } from "../../../utils/script/jscript";
import { PG } from "./ed-global";

export const edInit = async (p: PG) => {
  p.status = "ready";

  await init();
  jscript.init(p.render);

  p.script.loaded = true;
  p.render();
};
