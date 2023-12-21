import type { Monaco, OnMount } from "@monaco-editor/react";
import { createStore } from "idb-keyval";
import trim from "lodash.trim";
import { FC, useEffect } from "react";
import { compress } from "wasm-gzip";
import { useGlobal, useLocal } from "web-utils";
import { ParsedScope } from "../../../../../../../srv/ws/sync/editor/parser/parse-js";
import { jscript } from "../../../../../utils/script/jscript";
import { jsMount } from "../../../../../utils/script/mount";
import { monacoTypings } from "../../../../../utils/script/typings";
import { getActiveMeta } from "../../../logic/active/get-meta";
import { EDGlobal, IMeta, active } from "../../../logic/ed-global";
import { edMonacoDefaultVal } from "./default-val";
import { declareScope } from "./scope/scope";

const scriptEdit = {
  timeout: null as any,
};

const encode = new TextEncoder();
export type MonacoEditor = Parameters<OnMount>[0];
export const EdScriptMonaco: FC<{}> = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    editor: null as null | MonacoEditor,
    monaco: null as null | Monaco,
    changeTimeout: 0 as any,
    init: false,
    value: "",
    historyOpen: false,
    mode: "",
    idbstore: createStore(`prasi-page-${p.page.cur.id}`, "script-history"),
  });

  const Editor = jscript.editor;
  if (!Editor) return null;

  let meta: IMeta | null = p.page.meta[active.item_id];
  if (active.comp_id) {
    if (p.comp.list[active.comp_id]) {
      meta = p.comp.list[active.comp_id].meta[active.item_id];
    } else meta = null;
  }

  let val = "";
  useEffect(() => {
    return () => {
      p.script.do_edit = async () => {};
    };
  }, []);

  useEffect(() => {
    clearTimeout(scriptEdit.timeout);
    (async () => {
      const editor = local.editor;
      const monaco = local.monaco;

      if (monaco && editor) {
        if (local.mode !== p.ui.popup.script.mode) {
          local.init = false;
          local.mode = p.ui.popup.script.mode;
        }

        if (!local.init) {
          if (p.ui.popup.script.mode === "js") {
            monaco.editor.getModels().forEach((model) => {
              model.dispose();
            });
            monaco.editor.getModels().forEach((model) => {
              if (model.uri.toString().startsWith("inmemory://model")) {
                model.dispose();
              }
            });

            let model = monaco.editor.createModel(
              val,
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
                  siteTypes: p.script.site_types,
                },
                site: p.site.config,
              },
              monaco,
              { types: {}, values: {} }
            );
            if (meta) {
              declareScope(p, meta, editor, monaco).then(() => {
                local.render();
              });
            }
          }

          local.init = true;
          local.value = val;
          local.render();
        }
      }
    })();
  }, [active.item_id, local.monaco, local.editor, p.ui.popup.script.mode]);

  if (!meta) return null;

  const item = meta.item;
  const adv = meta.mitem?.get("adv")?.toJSON() || {};
  item.adv = adv;

  const doEdit = async (newval: string, all?: boolean) => {
    if (local.editor) {
      const prettier = jscript.prettier.standalone;
      const prettier_ts = jscript.prettier.ts;
      const prettier_estree = jscript.prettier.estree;

      if (prettier && prettier_estree && prettier_ts) {
        const text = trim(
          await prettier.format(
            all
              ? newval
              : local.editor
                  ?.getValue()
                  .replace(/\{\s*children\s*\}/gi, newval),
            {
              parser: "typescript",
              plugins: [prettier_ts, prettier_estree],
            }
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
    }
  };
  p.script.do_edit = doEdit;

  let mitem = meta.mitem;

  if (!mitem) {
    active.item_id = "";
    return <div>no mitem</div>;
  } else if (item.type === "item" && item.component?.id) {
    if (!mitem) {
      active.item_id = "";
      return <div>no mitem</div>;
    }
  }

  val = edMonacoDefaultVal(p, adv, mitem);

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
      language={
        { css: "scss", js: "typescript", html: "html" }[p.ui.popup.script.mode]
      }
      value={local.value}
      onChange={(val) => {
        local.value = val || "";
        local.render();
        clearTimeout(scriptEdit.timeout);
        scriptEdit.timeout = setTimeout(async () => {
          const meta = getActiveMeta(p);
          const type = p.ui.popup.script.mode;
          if (meta && meta.mitem) {
            let arg = {} as any;
            if (active.comp_id) {
              arg.comp_id = active.comp_id;
            } else {
              arg.page_id = p.page.cur.id;
            }

            let scope: boolean | ParsedScope = false;
            if (p.ui.popup.script.type === "prop-master") {
              p.sync.code.edit({
                type: "prop",
                prop_kind: p.ui.popup.script.prop_kind,
                prop_name: p.ui.popup.script.prop_name,
                value: compress(encode.encode(val || "")),
                ...arg,
              });
            } else if (p.ui.popup.script.type === "prop-instance") {
              scope = await p.sync.code.edit({
                type: "adv",
                mode: type,
                prop_name: p.ui.popup.script.prop_name,
                item_id: active.item_id,
                value: compress(encode.encode(val || "")),
                ...arg,
              });
            } else {
              scope = await p.sync.code.edit({
                type: "adv",
                mode: type,
                item_id: active.item_id,
                value: compress(encode.encode(val || "")),
                ...arg,
              });
            }

            if (typeof scope === "object") {
              if (active.comp_id) {
              } else {
                p.page.smeta[active.item_id].scope = scope;
              }
            }
          }
        }, 1000);
      }}
      onMount={async (editor, monaco) => {
        local.monaco = monaco;
        local.editor = editor;
        local.render();
        editor.focus();
        setTimeout(() => {
          editor.focus();
        }, 300);
      }}
    />
  );
};
