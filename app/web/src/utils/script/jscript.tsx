import type { Editor as MonacoEditor } from "@monaco-editor/react";
import type estree from "prettier/plugins/estree";
import type ts from "prettier/plugins/typescript";
import type Prettier from "prettier/standalone";
import { PG } from "../../nova/ed/logic/ed-global";
export type FBuild = (
  entryFileName: string,
  src: string,
  files?: Record<string, string>,
  verbose?: boolean
) => Promise<string>;

export const jscript = {
  reload: (p: PG) => {},
  editor: null as typeof MonacoEditor | null,
  editorLoaded: false,
  build: null as null | FBuild,
  pending: null as null | Promise<void>,
  events: {
    editorLoaded: () => {},
    prettierLoaded: () => {},
    pendingDone: () => {},
  },
  prettier: {
    standalone: null as null | typeof Prettier,
    estree: null as null | typeof estree,
    ts: null as null | typeof ts,
  },
  async init(render: () => void) {
    if (this.pending) {
      await this.pending;
      render();
    }
    if (!this.pending) {
      this.pending = new Promise<void>(async (resolve) => {
        this.events.pendingDone = resolve;

        this.prettier.standalone = (
          await import("prettier/standalone")
        ).default;
        this.prettier.estree = await import("prettier/plugins/estree");
        this.prettier.ts = await import("prettier/plugins/typescript");
        this.events.prettierLoaded();

        const e = await import("@monaco-editor/react");
        e.loader.config({
          paths: {
            vs: "/monaco/min/vs",
          },
        });
        jscript.editor = e.Editor;
        this.events.editorLoaded();
        render();
      });
    }
  },
};
