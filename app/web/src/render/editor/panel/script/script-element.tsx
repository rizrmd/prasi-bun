import { FC } from "react";
import { useGlobal } from "web-utils";
import * as Y from "yjs";
import { jscript } from "../../../../utils/script/jscript";
import { Loading } from "../../../../utils/ui/loading";
import { Modal } from "../../../../utils/ui/modal";
import { EditorGlobal } from "../../logic/global";
import { rebuildTree } from "../../logic/tree-logic";
import { DefaultScript, ScriptMonacoElement } from "./monaco/monaco-el";

export const EScriptElement: FC<{}> = ({}) => {
  const p = useGlobal(EditorGlobal, "EDITOR");

  if (!jscript.editor && jscript.pending) {
    jscript.pending.then(() => p.render());
  }

  if (!p.script.active) {
    return null;
  }

  const onOpenChange = () => {
    if (p.script.active) {
      let mitem = p.treeMeta[p.item.active]?.mitem;
      if (!mitem) return;

      mitem.doc?.transact(() => {
        if (!mitem) return;

        const adv = mitem.get("adv");
        if (adv) {
          const src = adv.get(p.script.type) as any;
          let txt = "";
          if (src && src instanceof Y.Text) {
            txt = src.toJSON();
          } else {
            txt = src;
          }
          if (
            !txt ||
            (typeof txt === "string" &&
              txt.replace(/[\W_]+/g, "") ===
                DefaultScript[p.script.type].replace(/[\W_]+/g, ""))
          ) {
            if (p.script.type === "js") {
              adv.delete("js");
              adv.delete("jsBuilt");
            } else {
              adv.delete(p.script.type);
            }
          }
        }
      });
    }

    p.script.active = false;
    p.script.prop = null;
    p.script.doEdit = null;
    p.script.toolbar = null;

    if (typeof p.script.onClose === "function") {
      p.script.onClose();
      p.script.onClose = undefined;
    }

    rebuildTree(p, { mode: "reset", note: "script-closed" });
  };

  const content = (
    <div className="bg-white w-[80vw] h-[80vh] flex">
      <div
        className={cx(
          "flex flex-1 relative",
          css`
            .monaco-editor {
              .mtk9 {
                color: #022f62;
              }
              .mtk1 {
                color: #022f62;
              }
              .mtk22 {
                color: #015cc5;
              }
              .mtk8 {
                color: #015cc5;
              }
              .mtk5 {
                color: #55bb8a;
              }
              .monaco-editor.showUnused .squiggly-inline-unnecessary {
                opacity: 0.4;
              }
              .jsx-expression-braces {
                color: #7c3813;
              }
              .jsx-tag-angle-bracket {
                color: #619ac3;
              }
              .jsx-tag-name {
                color: #619ac3;
              }
              .jsx-tag-order-1 {
                color: #23863a;
              }
              .jsx-tag-order-2 {
                color: #4e7ca1;
              }
              .jsx-tag-order-3 {
                color: #020360;
              }
              .jsx-tag-attribute-key {
                color: #6f42c1;
              }
              .jsx-text {
                color: #000000;
              }
            }
          `
        )}
      >
        {(!jscript.editor || !jscript.build) && (
          <>
            {!jscript.editor && !jscript.build && (
              <Loading note={"js-code"} backdrop={false} />
            )}
            {!jscript.editor && jscript.build && (
              <Loading note={"js-editor"} backdrop={false} />
            )}
            {!jscript.build && jscript.editor && (
              <Loading note={"js-build"} backdrop={false} />
            )}
          </>
        )}
        {jscript.editor && jscript.build && (
          <ScriptMonacoElement Editor={jscript.editor} build={jscript.build} />
        )}
      </div>
    </div>
  );

  return <Modal onOpenChange={onOpenChange}>{content}</Modal>;
};
