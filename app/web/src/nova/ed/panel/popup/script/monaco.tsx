import type { OnMount } from "@monaco-editor/react";
import { createStore } from "idb-keyval";
import trim from "lodash.trim";
import { useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { jscript } from "../../../../../utils/script/jscript";
import { EDGlobal, active } from "../../../logic/ed-global";
import { jsMount } from "../../../../../utils/script/mount";
import { monacoTypings } from "../../../../../utils/script/typings";

export type MonacoEditor = Parameters<OnMount>[0];
export const ScriptMonaco = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    editor: null as null | MonacoEditor,
    reloading: false,
    changeTimeout: 0 as any,
    historyOpen: false,
    idbstore: createStore(`prasi-page-${p.page.cur.id}`, "script-history"),
  });

  const Editor = jscript.editor;
  if (!Editor) return null;

  const meta = p.page.meta[active.item_id];
  if (!meta) return null;

  const item = meta.item;
  const adv = item.adv || {};
  const val: string = (
    typeof adv[p.ui.popup.script.mode] === "string"
      ? adv[p.ui.popup.script.mode]
      : ""
  ) as any;

  const doEdit = async (newval: string, all?: boolean) => {
    if (local.editor && jscript.prettier.standalone) {
      const text = trim(
        await jscript.prettier.standalone.format(
          all
            ? newval
            : local.editor?.getValue().replace(/\{\s*children\s*\}/gi, newval)
        ),
        "; \n"
      );

      local.editor.executeEdits(null, [
        {
          range: {
            startLineNumber: 0,
            startColumn: 0,
            endColumn: Number.MAX_SAFE_INTEGER,
            endLineNumber: Number.MAX_SAFE_INTEGER,
          },
          text,
        },
      ]);
    }
  };

  let mitem = meta.mitem;

  if (!mitem) {
    active.item_id = "";
    return <div>no mitem</div>;
  } else if (
    item.type === "item" &&
    item.component?.id &&
    meta.parent_comp?.mitem
  ) {
    mitem = meta.parent_comp?.mitem;

    if (!mitem) {
      active.item_id = "";
      return <div>no mitem</div>;
    }
  }

  return (
    <Editor
      value={val}
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
      onMount={async (editor, monaco) => {
        local.editor = editor;
        editor.focus();
        setTimeout(() => {
          editor.focus();
        }, 300);

        const value = editor.getValue();
        if (p.ui.popup.script.mode === "js") {
          monaco.editor.getModels().forEach((model) => {
            if (model.uri.toString().startsWith("inmemory://model")) {
              model.dispose();
            }
          });

          let model = monaco.editor.createModel(
            value,
            "typescript",
            monaco.Uri.parse(
              `ts:${
                p.comp.cur.id
                  ? `comp-${p.comp.cur.id}`
                  : `page-${p.page.cur.id}`
              }-${active.item_id}.tsx`
            )
          );
          editor.setModel(model);
        }
        monaco.editor.registerEditorOpener({
          openCodeEditor(source, resource, selectionOrPosition) {
            // https://github.com/microsoft/vscode/pull/177064#issue-1623100628
            return false;
          },
        });

        await jsMount(editor, monaco);
        await monacoTypings(
          {
            site_dts: p.site_dts,
            script: {
              siteTypes: {},
            },
            site: p.site.config,
          },
          monaco,
          { types: {}, values: {} }
        );
      }}
    />
  );
};
