import { Glob } from "bun";
import { dir } from "dir";
import { copyAsync, dirAsync, exists } from "fs-jetpack";
import { dirname } from "path";
import { code } from "../code";

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
    for await (const t of templates) {
      const f = t.replaceAll("_", ".");
      const to = dir.data(path + `/${f}`);
      const file = Bun.file(to);
      const exists = await file.exists();

      if (!exists) {
        const from = dir.path(`${tdir}/${t}`);
        await dirAsync(dirname(to));
        await copyAsync(from, to);
      } else if (f === "typings/global.d.ts") {
        const from = dir.path(`${tdir}/${t}`);
        await Bun.write(to, await Bun.file(from).arrayBuffer());
      }
    }

    const pkg = Bun.file(dir.data(`${path}/package.json`));
    if (!code.internal.frontend[id_site]) {
      code.internal.frontend[id_site] = {} as any;
    }
    if (!(await pkg.exists())) {
      code.internal.frontend[id_site].npm = new Promise<void>(async (done) => {
        await Bun.write(
          pkg,
          JSON.stringify({
            name: "site-" + id_site,
            scripts: {
              startup:
                "ulimit -c 0; tailwindcss --watch -i ./app/css/global.css -o ./app/css/build.css --minify",
            },
            dependencies: {
              "@floating-ui/react": "^0.26.12",
              "@hookform/resolvers": "^3.3.4",
              "@paralleldrive/cuid2": "^2.2.2",
              "@prisma/client": "^5.13.0",
              "@radix-ui/react-dropdown-menu": "^2.1.1",
              "@radix-ui/react-label": "^2.0.2",
              "@radix-ui/react-navigation-menu": "^1.2.0",
              "@radix-ui/react-popover": "^1.0.7",
              "@radix-ui/react-slider": "^1.1.2",
              "@radix-ui/react-slot": "^1.0.2",
              "@radix-ui/react-switch": "^1.1.0",
              "@radix-ui/react-tabs": "^1.0.4",
              "@types/autosize": "^4.0.3",
              "@types/lodash.capitalize": "^4.2.9",
              "@types/lodash.get": "^4.4.9",
              "@types/react": "^18.2.65",
              "@types/uuid": "^9.0.8",
              "@wojtekmaj/react-qr-svg": "^1.0.0",
              "any-date-parser": "^1.5.4",
              autosize: "^6.0.1",
              "class-variance-authority": "^0.7.0",
              clsx: "^2.1.0",
              "date-fns": "^3.3.1",
              dayjs: "^1.11.11",
              "embla-carousel-react": "^8.0.2",
              jsqr: "^1.4.0",
              "lodash.capitalize": "^4.2.1",
              "lodash.get": "^4.4.2",
              "lucide-react": "^0.314.0",
              "next-themes": "^0.3.0",
              prisma: "^5.13.0",
              quill: "^2.0.2",
              react: "^18.2.0",
              "react-arborist": "^3.4.0",
              "react-chartjs-2": "^5.2.0",
              "react-data-grid": "^7.0.0-beta.43",
              "react-dom": "^18.2.0",
              "react-hook-form": "^7.51.0",
              "react-resizable-panels": "^2.0.11",
              "react-webcam": "^7.2.0",
              "read-excel-file": "^5.7.1",
              sonner: "^1.4.41",
              "tailwind-merge": "^2.2.1",
              "tailwindcss-animate": "^1.0.7",
              uuid: "^9.0.1",
              "xlsx": "npm:@e965/xlsx@^0.20.2-released.0",
              "zod": "^3.22.4"
            },
          }),
          { mode: 777 }
        );
        let proc = Bun.spawn([`npm`, `install`], {
          stdio: ["inherit", "inherit", "inherit"],
          cwd: dir.data(path),
        });

        await proc.exited;
        done();
      });
    }
  } catch (e) {
    console.log("error ensure file", e);
  }
};
