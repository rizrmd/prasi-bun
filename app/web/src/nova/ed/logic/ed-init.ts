import { ApiProxy } from "../../../base/load/api/api-proxy";
import { dbProxy } from "../../../base/load/db/db-proxy";
import { jscript } from "../../../utils/script/jscript";
import { PG } from "./ed-global";

let w = window as unknown as {
	db: ReturnType<typeof dbProxy>;
	api: ApiProxy;
};

export const edInit = async (p: PG) => {
	p.status = "ready";
	jscript.init(p.render, { esbuild: false });
	p.script.loaded = true;
};
