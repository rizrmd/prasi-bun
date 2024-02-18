import type { Editor as MonacoEditor } from "@monaco-editor/react";
import type Prettier from "prettier/standalone";
import type estree from "prettier/plugins/estree";
import type ts from "prettier/plugins/typescript";
import { PG } from "../../nova/ed/logic/ed-global";
export type FBuild = (
  entryFileName: string,
  src: string,
  files?: Record<string, string>,
  verbose?: boolean
) => Promise<string>;

export const initJS = async () => {
  const { tryToSetCurrentVersion } = await import("./esbuild/versions");
  await tryToSetCurrentVersion("latest");
};

export const jscript = {
  reload: (p: PG) => {},
  editor: null as typeof MonacoEditor | null,
  editorLoaded: false,
  build: null as null | FBuild,
  pending: null as null | Promise<void>,
  events: {
    editorLoaded: () => {},
    esbuildLoaded: () => {},
    prettierLoaded: () => {},
    pendingDone: () => {},
  },
  prettier: {
    standalone: null as null | typeof Prettier,
    estree: null as null | typeof estree,
    ts: null as null | typeof ts,
  },
  async init(render: () => void, enabled?: { esbuild: boolean }) {
    if (this.pending) {
      await this.pending;
      render();
    }
    if (!this.pending) {
      this.pending = new Promise<void>(async (resolve) => {
        this.events.pendingDone = resolve;

        let sendIPC = null as any;
        if (enabled?.esbuild !== false) {
          sendIPC = (await import("./esbuild/ipc")).sendIPC;
          await initJS();
          this.events.esbuildLoaded();
        }

        this.prettier.standalone = (
          await import("prettier/standalone")
        ).default;
        this.prettier.estree = await import("prettier/plugins/estree");
        this.prettier.ts = await import("prettier/plugins/typescript");
        this.events.prettierLoaded();

        const e = await import("@monaco-editor/react");
        jscript.editor = e.Editor;
        e.loader.config({ paths: { vs: "/min/vs" } });
        this.events.editorLoaded();

        if (enabled?.esbuild !== false) {
          this.build = async (entry, src, files, verbose?: boolean) => {
            const options = {
              entryPoints: [entry],
              jsx: "transform",
              bundle: true,
              format: "cjs",
              minify: true,
            };
            const res = await sendIPC({
              command_: "build",
              input_: { ...files, [entry]: src },
              options_: options,
            });

            if (verbose && res.stderr_) {
              console.log(res.stderr_);
            }
            if (res.outputFiles_) return res.outputFiles_[0].text;

            return "";
          };

          await this.build("el.tsx", `return ""`);
        }
        render();
      });
    }
  },
};
