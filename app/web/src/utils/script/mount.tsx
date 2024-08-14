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
  if (!m.customJSMounted) {
    m.customJSMounted = true;
  } else {
    return;
  }

  const compilerOptions: CompilerOptions = {
    // note: ReactJSX ga bisa solve type buat <div> etc...
    // yg bisa solve cmn JsxEmit.React
    jsx: monaco.languages.typescript.JsxEmit.React,
    target: monaco.languages.typescript.ScriptTarget.ES2015,
    allowNonTsExtensions: true,
    lib: ["esnext", "dom"],
    module: monaco.languages.typescript.ModuleKind.ESNext,
    esModuleInterop: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  };

  if (p) {
    monaco.editor.registerEditorOpener({
      openCodeEditor(source, r, _sel) {
        if (p) {
          if (r.scheme === "file" && r.path) {
            const args = r.path.split("_");
            if (args.length === 3) {
              const loc = extractLoc(args, p);
              if (loc.meta) {
                if (active.script_nav.idx >= 0)
                  active.script_nav.list.length = active.script_nav.idx;
                active.script_nav.list.push({
                  item_id: active.item_id,
                  comp_id: active.comp_id,
                  instance: active.instance,
                });
                active.script_nav.idx = active.script_nav.idx + 1;

                if (loc.meta.item.component?.id && loc.meta.instances) {
                  active.comp_id = loc.meta.item.component?.id;
                  active.instance = {
                    comp_id: loc.meta.item.component?.id,
                    item_id: loc.meta.item.id,
                  };
                  const item_id = p.comp.list[active.comp_id].tree.find(
                    (e) => e.parent === "root"
                  )?.id;
                  if (item_id) {
                    active.item_id = item_id as string;
                  }
                } else if (
                  loc.meta.parent?.instance_id &&
                  loc.meta.parent.comp_id &&
                  loc.meta.item.originalId
                ) {
                  active.comp_id = loc.meta.parent.comp_id;
                  active.instance = {
                    comp_id: active.comp_id,
                    item_id: loc.meta.parent.instance_id,
                  };
                  active.item_id = loc.meta.item.originalId;
                } else {
                  active.item_id = loc.meta.item.id;
                }

                p.render();
              }
            }
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
    editor.getAction("editor.action.formatDocument")?.run();
  }, 100);
};

export const extractLoc = (args: string[], p: PG) => {
  const [_id, var_name, _type] = args;
  const id = _id.substring(1);
  const type = _type.replace(".tsx", "");
  let meta = p.page.meta[id];

  if (active.comp_id) {
    meta = p.comp.list[active.comp_id].meta[id];
  }

  return {
    id,
    var_name,
    type,
    meta,
  };
};
