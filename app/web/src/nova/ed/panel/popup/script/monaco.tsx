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
import { Loading } from "../../../../../utils/ui/loading";
// @ts-ignore
import { constrainedEditor } from "constrained-editor-plugin/dist/esm/constrainedEditor";

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
    imports: "",
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
        const type = p.ui.popup.script.type;
        if (local.mode !== p.ui.popup.script.mode) {
          local.init = false;
          local.mode = p.ui.popup.script.mode;
        }

        if (!local.init) {
          monaco.editor.getModels().forEach((model) => {
            if (
              model.uri.toString().startsWith("inmemory://model") ||
              model.uri.toString().startsWith("file://")
            ) {
              model.dispose();
            }
          });

          if (meta) {
            if (type === "item") {
              if (!meta.item.adv) {
                meta.item.adv = {};
              }

              if (!meta.item.adv[p.ui.popup.script.mode]) {
                meta.item.adv[p.ui.popup.script.mode] = val;
              }
            }
          }

          if (p.ui.popup.script.mode === "js") {
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
              let end_hide = 0;
              if (type === "prop-master") {
                const nmodel = monaco.editor.createModel(
                  val,
                  "typescript",
                  monaco.Uri.parse("file:///active.tsx")
                );
                editor.setModel(nmodel);
              } else {
                const imports = declareScope(p, meta, monaco);
                let cur = active.comp_id ? active.comp_id : "page";
                monaco.editor.getModels().forEach((model) => {
                  if (
                    type === "item" &&
                    model.uri.path === `/${cur}_${active.item_id}_src_src.tsx`
                  ) {
                    editor.setModel(model);
                  }

                  if (
                    type === "prop-instance" &&
                    model.uri.path ===
                      `/${cur}_${active.item_id}_prop_${p.ui.popup.script.prop_name}.tsx`
                  ) {
                    editor.setModel(model);
                  }
                });
                const model = editor.getModel();
                if (!model) {
                  const nmodel = monaco.editor.createModel(
                    imports && imports.length > 0
                      ? `${imports}\n/** IMPORT MODULE **/\n${val}`
                      : val,
                    "typescript",
                    monaco.Uri.parse("file:///active.tsx")
                  );
                  editor.setModel(nmodel);
                }
                if (imports) {
                  local.imports = imports;
                  end_hide = imports.split("\n").length + 1;
                  const range = new monaco.Range(1, 0, end_hide, 0);
                  (editor as any).setHiddenAreas([range]);
                }
              }
              await jsMount(editor, monaco, p);

              if (type === "prop-instance") {
                const constrainedInstance = constrainedEditor(monaco);
                constrainedInstance.initializeIn(editor);
                const model = editor.getModel();
                constrainedInstance.removeRestrictionsIn(model);
                const frange = model?.getFullModelRange();
                if (frange) {
                  const ranges = [
                    {
                      range: [
                        end_hide + 1,
                        `export const ${p.ui.popup.script.prop_name} = `.length,
                        frange.getEndPosition().lineNumber,
                        frange.getEndPosition().column,
                      ],
                      allowMultiline: true,
                    },
                  ];
                  constrainedInstance.addRestrictionsTo(model, ranges);
                }
              }
            }
          } else {
            const model = monaco.editor.createModel(
              val,
              { css: "scss", js: "typescript", html: "html" }[
                p.ui.popup.script.mode
              ],
              monaco.Uri.parse(`inmemory://model/1`)
            );
            editor.setModel(model);
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
        let curval = local.editor
          ?.getValue()
          .replace(/\{\s*children\s*\}/gi, newval);

        if (curval.includes("/** IMPORT MODULE **/")) {
          curval = curval.split("/** IMPORT MODULE **/\n").pop() || "";
        }

        const text = trim(
          await prettier.format(all ? newval : curval, {
            parser: "typescript",
            plugins: [prettier_ts, prettier_estree],
          }),
          "; \n"
        );

        let final_src = text;
        if (local.imports) {
          final_src = `${local.imports}\n/** IMPORT MODULE **/\n${text}`;
        }
        local.editor.executeEdits(null, [
          {
            range: {
              startLineNumber: 0,
              startColumn: 0,
              endColumn: Number.MAX_SAFE_INTEGER,
              endLineNumber: Number.MAX_SAFE_INTEGER,
            },
            text: final_src,
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
      loading={<Loading backdrop={false} note="monaco-loading" />}
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
      onChange={(value) => {
        const stype = p.ui.popup.script.type;
        if ((value || "").includes("/** IMPORT MODULE **/")) {
          const valparts = (value || "").split("/** IMPORT MODULE **/\n");
          if (valparts.length === 2) local.value = valparts[1];
          if (
            stype === "prop-instance" &&
            local.value.includes(
              `export const ${p.ui.popup.script.prop_name} = `
            )
          ) {
            local.value = local.value.substring(
              `export const ${p.ui.popup.script.prop_name} = `.length
            );
          }
        } else {
          local.value = value || "";
        }
        local.render();
        clearTimeout(scriptEdit.timeout);
        const applyChanges = async () => {
          const value = local.value;
          const meta = getActiveMeta(p);
          const mode = p.ui.popup.script.mode;
          if (meta && meta.mitem) {
            let arg = {} as any;
            if (active.comp_id) {
              arg.comp_id = active.comp_id;
            } else {
              arg.page_id = p.page.cur.id;
            }
            let scope: boolean | ParsedScope = false;
            if (stype === "prop-master") {
              p.sync.code.edit({
                type: "prop-master",
                prop_kind: p.ui.popup.script.prop_kind,
                prop_name: p.ui.popup.script.prop_name,
                value: compress(encode.encode(value || "")),
                ...arg,
              });
            } else if (stype === "prop-instance") {
              scope = await p.sync.code.edit({
                type: "prop-instance",
                mode: mode,
                prop_name: p.ui.popup.script.prop_name,
                item_id: active.item_id,
                value: compress(encode.encode(value || "")),
                ...arg,
              });
            } else {
              scope = await p.sync.code.edit({
                type: "adv",
                mode: mode,
                item_id: active.item_id,
                value: compress(encode.encode(value || "")),
                ...arg,
              });
            }
            if (typeof scope === "object") {
              meta.item.script = scope;
            }
          }
        };
        p.ui.popup.script.on_close = () => {
          clearTimeout(scriptEdit.timeout);
          applyChanges();
          p.ui.popup.script.on_close = () => {};
        };
        scriptEdit.timeout = setTimeout(applyChanges, 1000);
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
