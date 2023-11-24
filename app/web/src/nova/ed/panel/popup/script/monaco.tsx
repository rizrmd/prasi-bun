import type { Monaco, OnMount } from "@monaco-editor/react";
import { createStore } from "idb-keyval";
import trim from "lodash.trim";
import { useGlobal, useLocal } from "web-utils";
import { jscript } from "../../../../../utils/script/jscript";
import { jsMount } from "../../../../../utils/script/mount";
import { monacoTypings } from "../../../../../utils/script/typings";
import { EDGlobal, ISingleScope, active } from "../../../logic/ed-global";
import { declareScope } from "./scope";
import { useEffect } from "react";

export type MonacoEditor = Parameters<OnMount>[0];
export const ScriptMonaco = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    editor: null as null | MonacoEditor,
    monaco: null as null | Monaco,
    changeTimeout: 0 as any,
    historyOpen: false,
    idbstore: createStore(`prasi-page-${p.page.cur.id}`, "script-history"),
  });

  const Editor = jscript.editor;
  if (!Editor) return null;

  let meta = p.page.meta[active.item_id];
  if (active.comp_id && p.comp.list[active.comp_id]) {
    meta = p.comp.list[active.comp_id].meta[active.item_id];
  }

  useEffect(() => {
    if (local.monaco && local.editor) {
      const val: string = (
        typeof adv[p.ui.popup.script.mode] === "string"
          ? adv[p.ui.popup.script.mode]
          : ""
      ) as any;
      local.monaco.editor.getModels().forEach((model) => {
        const uri = model.uri.toString();
        if (
          uri.startsWith("inmemory://model") ||
          uri.startsWith("ts:comp-") ||
          uri.startsWith("ts:page-")
        ) {
          model.dispose();
        }
      });

      let model = local.monaco.editor.createModel(
        val,
        "typescript",
        local.monaco.Uri.parse(
          `ts:${
            active.comp_id ? `comp-${active.comp_id}` : `page-${p.page.cur.id}`
          }-${active.item_id}.tsx`
        )
      );
      local.editor.setModel(model);
      declareScope(p, local.editor, local.monaco).then(() => {
        local.render();
      });
    }
  }, [active.item_id]);

  if (!meta) return null;

  const item = meta.item;
  const adv = item.adv || {};
  let val: string = (
    typeof adv[p.ui.popup.script.mode] === "string"
      ? adv[p.ui.popup.script.mode]
      : ""
  ) as any;

  if (active.prop_name && item.type === "item" && item.component) {
    const prop = item.component.props[active.prop_name];
    if (prop) {
      val = prop.value;
    }
  }

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
    meta.parent_mcomp?.mitem
  ) {
    mitem = meta.parent_mcomp?.mitem;

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
                active.comp_id
                  ? `comp-${active.comp_id}`
                  : `page-${p.page.cur.id}`
              }-${active.item_id}.tsx`
            )
          );
          editor.setModel(model);

          await jsMount(editor, monaco, p);
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
          await declareScope(p, editor, monaco);
        }
      }}
    />
  );
};
