import { useGlobal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { EdMonaco } from "../monaco/monaco";

export const EdCode = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

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
