import { useGlobal } from "web-utils";
import { jscript } from "../../../../../utils/script/jscript";
import { Loading } from "../../../../../utils/ui/loading";
import { Modal } from "../../../../../utils/ui/modal";
import { EDGlobal } from "../../../logic/ed-global";
import { propPopover } from "../../side/prop-master/prop-form";
import { ScriptWorkbench } from "./workbench";

export const EdPopScript = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  return (
    <>
      <Modal
        open={p.ui.popup.script.open}
        onOpenChange={(open) => {
          if (!open) {
            p.ui.popup.script.open = false;

            if (p.ui.popup.script.prop_name) {
              propPopover.name = p.ui.popup.script.prop_name;
            }

            p.render();
          }
        }}
      >
        <div className={cx("bg-white select-none flex fixed inset-[50px]")}>
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
            {!jscript.editor && <Loading note={"js-editor"} backdrop={false} />}
            {jscript.editor && <ScriptWorkbench />}
          </div>
        </div>
      </Modal>
    </>
  );
};
