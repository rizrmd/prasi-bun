import type { Editor } from "@monaco-editor/react";
import { ReactElement } from "react";
import { jsMount } from "../../../../../utils/script/mount";
import { monacoTypings } from "../../../../../utils/script/typings";
import { Modal } from "../../../../../utils/ui/modal";
import { EdMonacoWrap } from "./init";

const monacoState = {} as Record<string, any>;
export const EdMonaco = (arg: {
  id?: string;
  type: "js" | "html" | "css";
  filename: string;
  monaco: Parameters<typeof Editor>[0];
  onClose: () => void;
  header?: ReactElement;
  footer?: ReactElement;
  prop?: {
    val?: Record<string, any>;
    types?: Record<string, string>;
  };
  modal?: boolean;
}) => {
  const filename = arg.filename;
  const m = arg.monaco;
  const prop = { ...arg.monaco };

  prop.options = {
    minimap: { enabled: false },
    wordWrap: "wordWrapColumn",
    autoClosingBrackets: "always",
    tabSize: 2,
    autoIndent: "full",
    formatOnPaste: true,
    formatOnType: true,
    useTabStops: true,
  };
  if (arg.type === "html") {
    prop.language = "html";
  }
  if (arg.type === "css") {
    prop.language = "scss";
  }
  if (arg.type === "js") {
    prop.language = "typescript";
    prop.onMount = async (editor, monaco) => {
      const value = editor.getValue();
      monaco.editor.getModels().forEach((model) => {
        if (model.uri.toString().startsWith("inmemory://model")) {
          model.dispose();
        }
      });

      let model = monaco.editor.createModel(
        value,
        "typescript",
        monaco.Uri.parse(`ts:${filename}`)
      );
      editor.setModel(model);

      if (arg.id) {
        if (!monacoState[arg.id]) {
          editor.trigger("fold", "editor.foldAllMarkerRegions", null);
        } else {
          editor.restoreViewState(monacoState[arg.id]);
        }
      }

      await jsMount(editor, monaco);

      if (arg.prop)
        await monacoTypings(
          {
            script: {
              siteTypes: {},
            },
            site: {
              api_url: "",
            },
            site_dts: "",
          },
          monaco,
          {
            values: arg.prop.val || {},
            types: arg.prop.types || {},
          }
        );

      if (m.onMount) m.onMount(editor, monaco);
    };
  }

  if (arg.modal === false) {
    return (
      <EdMonacoWrap header={arg.header} footer={arg.footer}>
        {(Editor) => <Editor {...prop} />}
      </EdMonacoWrap>
    );
  }

  return (
    <Modal
      open
      onOpenChange={() => {
        arg.onClose();
      }}
    >
      <EdMonacoWrap header={arg.header} footer={arg.footer}>
        {(Editor) => <Editor {...prop} />}
      </EdMonacoWrap>
    </Modal>
  );
};
