import init from "wasm-gzip";
import { PG } from "./ed-global";
import { jscript } from "../../../utils/script/jscript";

export const edInit = async (p: PG) => {
  p.status = "ready";

  await init();
  jscript.init(p.render);
  p.script.loaded = true;
  p.render();
};
