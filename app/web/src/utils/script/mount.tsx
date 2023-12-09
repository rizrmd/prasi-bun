import type { OnMount } from "@monaco-editor/react";
import trim from "lodash.trim";
import {
  MonacoJsxSyntaxHighlight,
  getWorker,
} from "monaco-jsx-syntax-highlight-v2";
import { PG, active } from "../../nova/ed/logic/ed-global";
import { jscript } from "./jscript";

export type MonacoEditor = Parameters<OnMount>[0];
type Monaco = Parameters<OnMount>[1];
type CompilerOptions = Parameters<
  Parameters<OnMount>[1]["languages"]["typescript"]["typescriptDefaults"]["setCompilerOptions"]
>[0];

export const jsMount = async (editor: MonacoEditor, monaco: Monaco, p?: PG) => {
  const m = monaco as any;
  if (!m.customJSMounted) {
    m.customJSMounted = true;
  } else {
    return;
  }

  const compilerOptions: CompilerOptions = {
    jsx: monaco.languages.typescript.JsxEmit.React,
    jsxFactory: "React.createElement",
    jsxFragmentFactory: "React.Fragment",
    target: monaco.languages.typescript.ScriptTarget.ES2015,
    allowNonTsExtensions: true,
    lib: ["esnext"],
    module: monaco.languages.typescript.ModuleKind.ESNext,
    esModuleInterop: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  };

  if (p) {
    monaco.editor.registerEditorOpener({
      openCodeEditor(source, r, selectionOrPosition) {
        if (p) {
          p.ui.popup.script.mode === "js";
          const cpath = r.path.substring(`scope~`.length).split("__");

          const [comp_id, prev_comp_id, prev_item_id] = cpath[0].split("~");
          if (cpath[1]) {
            const path = cpath[1].split("~");
            const type = path[0] as "prop" | "passprop" | "local";
            const id = path[path.length - 1].replace(".d.ts", "");

            if (type === "prop") {
              if (p.ui.popup.script.type === "item") {
                p.ui.popup.script.open = false;
                p.render();
                setTimeout(() => {
                  p.ui.popup.script.open = true;
                  p.render();
                }, 100);
              }

              p.ui.popup.script.prop_name = path[1];
              p.ui.popup.script.type = "prop-instance";
              p.ui.popup.script.prop_kind = "value";

              if (
                !prev_comp_id &&
                !prev_item_id &&
                active.instance.item_id &&
                active.comp_id
              ) {
                active.item_id = active.instance.item_id;
                active.comp_id = active.instance.comp_id;
                active.instance.item_id = "";
                active.instance.comp_id = "";
                p.render();
              }

              return false;
            } else {
              if (p.ui.popup.script.type !== "item") {
                p.ui.popup.script.open = false;
                p.ui.popup.script.type = "item";
                p.ui.popup.script.prop_name = "";
                p.render();
                setTimeout(() => {
                  p.ui.popup.script.open = true;
                  p.render();
                }, 100);
              }
            }

            if (comp_id) {
              let meta = p.page.meta[id];
              if (active.comp_id) {
                meta = p.comp.list[active.comp_id].meta[id];
                return false;
              }

              active.instance.comp_id = active.comp_id;
              active.instance.item_id = active.item_id;

              if (meta && meta.item.originalId) {
                active.item_id = meta.item.originalId;
              } else {
                active.item_id = id;
              }
              active.comp_id = comp_id;
            } else {
              if (active.comp_id) {
                let meta = p.comp.list[active.comp_id].meta[id];

                if (!meta) {
                  const _id = p.comp.list[active.comp_id].doc
                    .getMap("map")
                    .get("root")
                    ?.get("id");

                  if (_id) {
                    active.item_id = _id;
                    p.render();
                  }
                }
                return false;
              }

              active.item_id = id;
            }
            p.render();
          }
        }

        return false;
      },
    });
  }

  monaco.languages.registerDocumentFormattingEditProvider("typescript", {
    async provideDocumentFormattingEdits(model, options, token) {
      const prettier = jscript.prettier.standalone;
      const prettier_ts = jscript.prettier.ts;
      const prettier_estree = jscript.prettier.estree;

      if (prettier && prettier_estree && prettier_ts) {
        const text = trim(
          await prettier.format(model.getValue(), {
            parser: "typescript",
            plugins: [prettier_ts, prettier_estree],
          }),
          "; \n"
        );

        return [
          {
            range: model.getFullModelRange(),
            text,
          },
        ];
      }
    },
  });

  monaco.languages.registerCompletionItemProvider("typescript", {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      return {
        suggestions: [
          {
            label: "log",
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Add Console.log",
            insertText: `console.log($1)`,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn,
            },
          },
          {
            label: "sfy",
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Add JSON.stringify",
            insertText: `JSON.stringify($1)`,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn,
            },
          },
        ],
      };
    },
  });

  monaco.languages.registerCompletionItemProvider("typescript", {
    triggerCharacters: [">"],
    provideCompletionItems: (model, position) => {
      const codePre: string = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      const tag = codePre.match(/.*<(\w+)>$/)?.[1];

      if (!tag) {
        return;
      }

      const word = model.getWordUntilPosition(position);

      return {
        suggestions: [
          {
            label: `</${tag}>`,
            kind: monaco.languages.CompletionItemKind.EnumMember,
            insertText: `$1</${tag}>`,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn,
            },
          },
        ],
      };
    },
  });

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
    compilerOptions
  );

  setTimeout(() => {
    if (editor.getModel()) {
      const jsxHgController = new MonacoJsxSyntaxHighlight(getWorker(), monaco);
      const { highlighter } = jsxHgController.highlighterBuilder({
        editor: editor,
      });

      if (typeof editor.getModel === "function") {
        highlighter();
      }
      editor.onDidChangeModelContent(() => {
        if (typeof editor.getModel === "function") {
          try {
            highlighter();
          } catch (e) {}
        }
      });
    }

    editor.getAction("editor.action.formatDocument")?.run();
  }, 100);
};
