import { ReactElement, ReactNode } from "react";
import { useLocal } from "web-utils";
import { jscript } from "../../../../../utils/script/jscript";
import { Loading } from "../../../../../utils/ui/loading";

export const EdScriptInit = () => {
  const Editor = jscript.editor;
  const local = useLocal({ editorLoaded: false }, () => {});

  jscript.events.editorLoaded = () => {
    local.editorLoaded = true;
    local.render();
  };

  return (
    <>
      {Editor && local.editorLoaded && (
        <div className="hidden">
          <Editor
            onMount={() => {
              jscript.events.pendingDone();
            }}
          />
        </div>
      )}
    </>
  );
};

export const EdMonacoWrap = ({
  children,
  header,
  footer,
}: {
  header?: ReactElement;
  footer?: ReactElement;
  children: (Editor: Exclude<typeof jscript.editor, null>) => ReactNode;
}) => {
  const local = useLocal({});

  if (jscript.pending && (!jscript.editor || !jscript.build)) {
    jscript.pending.then(() => {
      local.render();
    });
  }

  return (
    <div
      className={cx(
        "flex flex-1 flex-col absolute inset-[80px] bg-white",
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
      {header}
      <div className="relative flex-1">
        {!jscript.editor || !jscript.build ? (
          <Loading note="script-cst" backdrop={false} />
        ) : (
          children(jscript.editor)
        )}
      </div>
      {footer}
    </div>
  );
};
