import { dir } from "dir";
import { dirAsync } from "fs-jetpack";
import { simpleHash } from "../../../../../web/src/nova/vi/utils/simple-hash";
const local_routes = {
  timeout: null as any,
};

export const prasiDefineLocalRoute = (id_site: string) => {
  clearTimeout(local_routes.timeout);
  local_routes.timeout = setTimeout(async () => {
    const path = dir.data(`code/${id_site}/site/src/app/routes`);
    await dirAsync(path);
    const glob = new Bun.Glob(`*.{ts,tsx}`);
    const imports = new Set<string>();
    for await (const f of glob.scan(path)) {
      const file = Bun.file(path + `/${f}`);
      if (file.size > 0) {
        if (f.endsWith(".tsx")) {
          imports.add(f.substring(0, f.length - 4));
        } else if (f.endsWith(".ts")) {
          imports.add(f.substring(0, f.length - 3));
        }
      }
    }

    const content = `\
${[...imports]
  .map(
    (e) => `import { route as ${e.replace(/\W/g, "_")} } from "./routes/${e}"`
  )
  .join("\n")}

export const router = {
  ${[...imports].map((e) => `${e.replace(/\W/g, "_")}`).join(",\n  ")}
}
`;
    const hash = simpleHash(content);
    const router = Bun.file(
      dir.data(`code/${id_site}/site/src/app/router.tsx`)
    );

    let should_write = true;
    if (await router.exists()) {
      const rhash = simpleHash(await router.text());
      if (rhash === hash) {
        should_write = false;
      }
    }

    if (should_write) {
      await Bun.write(router, content);
    }
  }, 300);
};
