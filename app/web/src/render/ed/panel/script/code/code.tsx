import { useGlobal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { EdMonaco } from "../monaco/monaco";
import { useEffect } from "react";

export const EdCode = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  useEffect(() => {
    p.sync.activity("site", {
      type: "code",
      id: p.site.id,
      action: p.ui.popup.code.open ? "open" : "close",
      name: p.ui.popup.code.name,
    });
  }, [p.ui.popup.code.open]);

  if (!p.ui.popup.code.open) return null;

  return (
    <EdMonaco
      id="code"
      type="js"
      filename=""
      modal={false}
      monaco={{
        value: p.site.js,
        onChange: async (v) => {},
      }}
      onClose={() => {}}
    />
  );
};
