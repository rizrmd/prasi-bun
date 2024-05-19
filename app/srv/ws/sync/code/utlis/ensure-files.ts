import { Glob } from "bun";
import { dir } from "dir";
import { dirAsync, exists, copyAsync } from "fs-jetpack";
import { dirname } from "path";

export const ensureFiles = async (path: string, id_site: string) => {
  const _dir = dir.data(path);
  if (!exists(_dir)) {
    await dirAsync(_dir);
  }

  const tdir = "/app/srv/ws/sync/code/templates";
  const templates = new Glob("**").scan({
    cwd: dir.path(tdir),
  });

  try {
    const pkg = Bun.file(dir.data(`${path}/package.json`));
    if (!(await pkg.exists())) {
      await Bun.write(
        pkg,
        JSON.stringify({
          name: "site-" + id_site,
          scripts: {
            startup:
              "ulimit -c 0; tailwindcss --watch -i ./app/css/global.css -o ./app/css/build.css --minify",
          },
          dependencies: {},
        })
      );
      const imports = [
        "@floating-ui/react",
        "@paralleldrive/cuid2",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-label",
        "@radix-ui/react-navigation-menu",
        "@radix-ui/react-popover",
        "@radix-ui/react-slider",
        "@radix-ui/react-slot",
        "@radix-ui/react-switch",
        "@radix-ui/react-tabs",
        "@types/file-saver",
        "@types/lodash.capitalize",
        "@types/lodash.get",
        "@types/react",
        "@types/react-dom",
        "any-date-parser",
        "chart.js",
        "class-variance-authority",
        "clsx",
        "date-fns",
        "embla-carousel-react",
        "exceljs",
        "lodash.capitalize",
        "lodash.get",
        "lucide-react",
        "next-themes",
        "quill",
        "react",
        "react-arborist",
        "react-chartjs-2",
        "react-data-grid",
        "react-day-picker",
        "react-resizable-panels",
        "sonner",
        "tailwind-merge",
      ];

      let proc = Bun.spawn([`npm`, `install`, ...imports], {
        stdio: ["inherit", "pipe", "pipe"],
        cwd: dir.data(path),
      });

      await proc.exited;
    }

    for await (const t of templates) {
      const f = t.replaceAll("_", ".");
      const to = dir.data(path + `/${f}`);
      const file = Bun.file(to);
      const exists = await file.exists();
      if (!exists) {
        const from = dir.path(`${tdir}/${t}`);
        await dirAsync(dirname(to));
        await copyAsync(from, to);
      }
    }
  } catch (e) {
    console.log("error ensure file", e);
  }
};
