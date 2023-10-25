import type { OnMount } from "@monaco-editor/react";
import trim from "lodash.trim";
import {
  MonacoJsxSyntaxHighlight,
  getWorker,
} from "monaco-jsx-syntax-highlight-v2";
import { jscript } from "./jscript";

export type MonacoEditor = Parameters<OnMount>[0];
type Monaco = Parameters<OnMount>[1];
type CompilerOptions = Parameters<
  Parameters<OnMount>[1]["languages"]["typescript"]["typescriptDefaults"]["setCompilerOptions"]
>[0];

export const jsMount = async (editor: MonacoEditor, monaco: Monaco) => {
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
    lib: ["esnext", "dom"],
    module: monaco.languages.typescript.ModuleKind.ESNext,
    esModuleInterop: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  };

  const jsxHgController = new MonacoJsxSyntaxHighlight(getWorker(), monaco);
  const { highlighter } = jsxHgController.highlighterBuilder({
    editor: editor,
  });
  highlighter();
  editor.onDidChangeModelContent(() => {
    highlighter();
  });

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
