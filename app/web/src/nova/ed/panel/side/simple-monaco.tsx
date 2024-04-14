import type { Monaco, OnMount } from "@monaco-editor/react";
import { jscript } from "../../../../utils/script/jscript";
import { Loading } from "../../../../utils/ui/loading";
import { FC } from "react";

export const SimpleMonaco: FC<{
  value: string;
  onChange: (value: string) => void;
  lang: "typescript" | "json";
}> = ({ value, onChange, lang }) => {
  const Editor = jscript.editor;
  if (!Editor) return <Loading backdrop={false} note="loading-monaco" />;

  return (
    <Editor
      defaultValue={value}
      onChange={(value) => {
        onChange(value || "");
      }}
      language={lang}
      options={{
        minimap: { enabled: false },
        wordWrap: "wordWrapColumn",
        autoClosingBrackets: "always",
        autoIndent: "full",
        formatOnPaste: true,
        formatOnType: true,
        tabSize: 2,
        useTabStops: true,
        lineNumbersMinChars: 2,
      }}
    />
  );
};
