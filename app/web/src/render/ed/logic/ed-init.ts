import init from "wasm-gzip";
import { PG } from "./ed-global";
import { jscript } from "../../editor/panel/script/script-element";

export const edInit = async (p: PG) => {
  await init();
  jscript.init();
  p.status = "ready";
  p.render();
};
