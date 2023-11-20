import type { Editor as MonacoEditor, OnMount } from "@monaco-editor/react";
import { jscript } from "../../../../../utils/script/jscript";

export type MonacoEditor = Parameters<OnMount>[0];
export const ScriptMonaco = () => {
  const Editor = jscript.editor;
  if (!Editor) return null;

  return (
    <Editor
      options={{
        minimap: { enabled: false },
        wordWrap: "wordWrapColumn",
        autoClosingBrackets: "always",
        autoIndent: "full",
        formatOnPaste: true,
        formatOnType: true,
        tabSize: 2,
        useTabStops: true,
      }}
    />
  );
};
