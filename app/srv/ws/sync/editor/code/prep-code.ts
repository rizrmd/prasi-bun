import { codeBuild } from "./build-code";
import { CodeMode, code, codeGlobalTypings } from "./util-code";

export const prepCodeSnapshot = async (id_site: string, mode: CodeMode) => {
  await code
    .prep(id_site, mode)
    .new_file("index.tsx", "export const sample = 'hello_world'")
    .new_file(
      "package.json",
      JSON.stringify({ name: `${mode}-${id_site}`, dependencies: {} }, null, 2)
    )
    .new_file("typings/global.d.ts", codeGlobalTypings)
    .await();

  await codeBuild(id_site);
  return { ts: code.esbuild[id_site].site_ts };
};
