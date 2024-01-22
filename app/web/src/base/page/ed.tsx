import { page, useGlobal } from "web-utils";
import { EdBase } from "../../nova/ed/ed-base";
import { EDGlobal } from "../../nova/ed/logic/ed-global";
import { edInitSync } from "../../nova/ed/logic/ed-sync";
import { Loading } from "../../utils/ui/loading";
import init from "wasm-gzip";

export default page({
	url: "/ed/:site_id/:page_id",
	component: ({}) => {
		const p = useGlobal(EDGlobal, "EDITOR");

		const w = window as any;
		if (!w.Y) {
			(async () => {
				await init();
				(window as any).Y = await import("yjs");
				(window as any).syncronize = (await import("y-pojo")).syncronize;
				p.render();
			})();
			return <Loading note="init" />;
		}

		if (!edInitSync(p)) {
			return <Loading note="connecting-ws" />;
		}

		return <EdBase />;
	},
});
