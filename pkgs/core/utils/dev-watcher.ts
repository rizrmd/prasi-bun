import { file } from "bun";
import { watch } from "fs";
import { dirAsync, inspectTreeAsync, readAsync, writeAsync } from "fs-jetpack";
import { dirname } from "path";
import { dir } from "./dir";
const pagedir = dir.path(`app/web/src/base/page`);

export const startDevWatcher = async () => {
  await dirAsync(dir.path(`app/srv/api`));
  watch(dir.path(`app/srv/api`), async (event, filename) => {
    const s = file(dir.path(`app/srv/api/${filename}`));
    if (s.size === 0 && filename?.endsWith(".ts") && (await s.exists())) {
      await Bun.write(
        `app/srv/api/${filename}`,
        `\
import { apiContext } from "service-srv";

export const _ = {
  url: "/${filename?.substring(0, filename.length - 3)}",
  async api() {
    const { req, res } = apiContext(this);
    return "This is ${filename}";
  }
}`
      );
    }
  });

  await dirAsync(pagedir);
  await genPages();
  watch(pagedir, async (event, filename) => {
    const s = file(dir.path(`${pagedir}/${filename}`));
    genPages();
  });
};

const genPages = async () => {
  const res: string[] = [];
  const walk = async (arg: any) => {
    const pathname = arg.relativePath
      .substring(0, arg.relativePath.length - 4)
      .substring(2);

    if (pathname) {
      const src = await readAsync(`${pagedir}/${pathname}.tsx`);
      if (src) {
        const url = src.split("url:")[1].split(",").shift();
        if (url) {
          res.push(
            `\
export const ${pathname.replace(/\W/gi, "_")} = {
  url: ${url},
  page: () => import("./page/${pathname}"),
};`
          );
        }
      }
    }

    if (arg.children) {
      for (const c of arg.children) {
        await walk(c);
      }
    }
  };
  await walk(
    await inspectTreeAsync(pagedir, {
      relativePath: true,
    })
  );
  await writeAsync(dirname(pagedir) + "/pages.ts", `${res.join("\n")}\n`);
};
