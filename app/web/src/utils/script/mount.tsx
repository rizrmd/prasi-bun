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
    jsx: monaco.languages.typescript.JsxEmit.ReactNative,
    jsxFactory: "React.createElement",
    jsxFragmentFactory: "React.Fragment",
    target: monaco.languages.typescript.ScriptTarget.ES2015,
    allowNonTsExtensions: true,
    lib: ["esnext", "dom"],
    module: monaco.languages.typescript.ModuleKind.ESNext,
    esModuleInterop: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  };

  if (p) {
    monaco.editor.registerEditorOpener({
      openCodeEditor(source, r, selectionOrPosition) {
        if (p) {
          p.ui.popup.script.mode === "js";

          if (r.scheme === "file" && r.path) {
            const args = r.path.split("_");
            if (args.length === 4) {
              const { cur, id, meta } = extractLoc(args, p);
              console.log(cur, id, meta.item.name);
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
  const [_cur, id, type, _varname] = args;
  const cur = _cur.substring(1);
  const varname = _varname.substring(0, _varname.length - ".tsx".length);

  let meta = p.page.meta[id];
  if (cur !== "page") {
    const comp = p.comp.list[cur];
    if (comp) {
      meta = comp.meta[id];
    }
  }

  return { cur, varname, type, id, meta };
};
