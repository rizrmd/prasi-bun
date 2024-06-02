import type { Monaco, OnMount } from "@monaco-editor/react";
import { createStore } from "idb-keyval";
import trim from "lodash.trim";
import { FC, useEffect } from "react";
import { compress } from "wasm-gzip";
import { useGlobal, useLocal } from "web-utils";
import type { ParsedScope } from "../../../../../../../srv/ws/sync/editor/parser/parse-js";
import { jscript } from "../../../../../utils/script/jscript";
import { jsMount } from "../../../../../utils/script/mount";
import { monacoTypings } from "../../../../../utils/script/typings";
import { Loading } from "../../../../../utils/ui/loading";
import { getActiveMeta } from "../../../logic/active/get-meta";
import { EDGlobal, IMeta, active } from "../../../logic/ed-global";
import { edMonacoDefaultVal } from "./default-val";
import { declareScope } from "./scope/scope";

// @ts-ignore
import { FNCompDef } from "../../../../../utils/types/meta-fn";
import { editorLocalValue } from "../../../../vi/render/script/local";

const scriptEdit = {
  timeout: null as any,
};

const w = window as unknown as {
  monaco_loaded: boolean;
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
    active_id: "",
    idbstore: createStore(`prasi-page-${p.page.cur.id}`, "script-history"),
  });

  const Editor = jscript.editor;
  if (!Editor) return <Loading backdrop={false} note="loading-monaco" />;

  let meta: IMeta | null = p.page.meta[active.item_id];
  if (active.comp_id) {
    if (p.comp.list[active.comp_id]) {
      meta = p.comp.list[active.comp_id].meta[active.item_id];
    } else meta = null;
  }

  let val = "";
  useEffect(() => {
    if (!w.monaco_loaded) {
      w.monaco_loaded = true;
      console.clear();
    }

    return () => {
      p.ui.monaco = null;
      p.script.do_edit = async () => {};
    };
  }, []);

  if (local.monaco) {
    p.ui.monaco = local.monaco;
  }

  useEffect(() => {
    clearTimeout(scriptEdit.timeout);
    (async () => {
      const editor = local.editor;
      const monaco = local.monaco;

      if (monaco && editor) {
        const type = p.ui.popup.script.type;
        if (
          local.mode !== p.ui.popup.script.mode ||
          local.active_id !== active.item_id
        ) {
          local.init = false;
          local.mode = p.ui.popup.script.mode;
          local.active_id = active.item_id;
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
            const w = window as any;
            const types: any = {};
            for (const prop_name of p.global_prop) {
              if (prop_name === "_types") continue;
              types[prop_name] = "any";
            }

            if (w._types) {
              for (const [k, v] of Object.entries(w._types)) {
                types[k] = v;
              }
            }

            let component = { id: "", props: {} as Record<string, FNCompDef> };
            if (meta?.item.component?.id && meta.item.component.props) {
              component.id = meta.item.component.id;
              component.props = meta.item.component.props;
            }
            if (meta?.parent?.comp_id && meta.parent.instance_id) {
              const comp_meta = p.page.meta[meta.parent.instance_id];

              if (comp_meta && comp_meta.item.component?.id) {
                component.id = comp_meta.item.component.id;
                component.props = comp_meta.item.component.props;
              }
            }

            if (meta) {
              switch (type) {
                case "prop-master":
                  {
                    for (const prop_name of Object.keys(component.props)) {
                      types[prop_name] = "any";
                    }

                    const nmodel = monaco.editor.createModel(
                      trim(val),
                      "typescript",
                      monaco.Uri.parse("file:///active.tsx")
                    );
                    editor.setModel(nmodel);
                  }
                  break;
                case "prop-instance":
                  {
                    types._raw = declareScope(p, meta, monaco);
                    const nmodel = monaco.editor.createModel(
                      trim(val),
                      "typescript",
                      monaco.Uri.parse("file:///active.tsx")
                    );
                    editor.setModel(nmodel);

                    if (component.id) {
                      const prop_name = p.ui.popup.script.prop_name;
                      const prop = meta.item.component?.props[prop_name];
                      propTypings(prop, types, p.page.meta);
                    }
                  }
                  break;
                case "item":
                  {
                    types._raw = declareScope(p, meta, monaco);
                    const model = monaco.editor.createModel(
                      trim(val),
                      "typescript",
                      monaco.Uri.parse("file:///active.tsx")
                    );
                    editor.setModel(model);
                    editor.trigger("fold", "editor.foldAllMarkerRegions", {});

                    if (component.id && meta.jsx_prop?.name) {
                      const prop_name = meta.jsx_prop.name;
                      const prop = component?.props[prop_name];
                      propTypings(prop, types, p.page.meta);
                    }
                  }
                  break;
              }
            }

            await monacoTypings(
              {
                site_dts: p.site_dts,
                site_dts_entry: p.site_dts_entry,
                site_exports: p.site_exports,
                prisma_ext: p.prisma_ext,
                script: {
                  siteTypes: p.script.site_types,
                },
                site: p.site.config,
              },
              monaco,
              {
                types,
                values: {},
              }
            );
            await jsMount(editor, monaco, p);
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

  if (!meta) return <Loading backdrop={false} note="meta-not-found" />;

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

        const text = trim(
          await prettier.format(all ? newval : curval, {
            parser: "typescript",
            plugins: [prettier_ts, prettier_estree],
          }),
          "; \n"
        );

        let final_src = text;

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
        p.ui.popup.script.typings.status = "loading";
        p.ui.popup.script.wb_render();

        local.value = value || "";

        local.render();
        const applyChanges = async () => {
          if (!p.sync) return;

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
            p.ui.popup.script.typings.status = "ok";
            p.ui.popup.script.typings.err_msg = "";

            if (stype === "prop-master") {
              p.sync.code.edit({
                type: "prop-master",
                prop_kind: p.ui.popup.script.prop_kind,
                prop_name: p.ui.popup.script.prop_name,
                value: compress(encode.encode(value || "")),
                ...arg,
              });
            } else if (stype === "prop-instance") {
              const code_result = await p.sync.code.edit({
                type: "prop-instance",
                mode: mode,
                prop_name: p.ui.popup.script.prop_name,
                item_id: active.item_id,
                value: compress(encode.encode(value || "")),
                ...arg,
              });
              if (typeof code_result === "string") {
                p.ui.popup.script.typings.status = "error";
                p.ui.popup.script.typings.err_msg = code_result;
              } else if (typeof code_result === "object") {
                scope = code_result;
              }
            } else {
              editorLocalValue[active.item_id] = null;
              const code_result = await p.sync.code.edit({
                type: "adv",
                mode: mode,
                item_id: active.item_id,
                value: compress(encode.encode(value || "")),
                ...arg,
              });

              if (typeof code_result === "string") {
                p.ui.popup.script.typings.status = "error";
                p.ui.popup.script.typings.err_msg = code_result;
              } else if (typeof code_result === "object") {
                scope = code_result;
              }
            }
            if (typeof scope === "object") {
              meta.item.script = scope;
            }
            p.ui.popup.script.wb_render();
          }
        };
        p.ui.popup.script.on_close = () => {
          clearTimeout(scriptEdit.timeout);
          applyChanges();
          p.ui.popup.script.on_close = () => {};
        };
        clearTimeout(scriptEdit.timeout);
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

const propTypings = (prop: FNCompDef | undefined, types: any, meta: any) => {
  if (!!prop && typeof prop.typings === "string") {
    const typings_fn = new Function(
      "active",
      "_meta",
      `\
${
  prop.typings
    ? `
${prop.typings};
return typings;
`
    : ""
}
`
    );
    try {
      const typings = typings_fn(active, meta);
      if (typeof typings === "object") {
        for (const [k, v] of Object.entries(typings)) {
          if (typeof v === "string") {
            if (k === "_raw" && types[k]) {
              types[k] += "\n" + v;
            } else {
              types[k] = v;
            }
          }
        }
      }
    } catch (e) {
      console.log("WARNING: typings prasi error, bilang mas rizky plis...");
    }
  }
};
