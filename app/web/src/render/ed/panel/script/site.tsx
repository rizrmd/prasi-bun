import { useGlobal } from "web-utils";
import { EdMonaco } from "./monaco/monaco";
import { EDGlobal } from "../../logic/ed-global";

export const EdScriptSite = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  if (!p.ui.script.site) {
    return null;
  }
  return (
    <EdMonaco
      id="script-site"
      type="js"
      filename="site.tsx"
      monaco={{
        value: p.site.js,
        onChange: (v) => {
          console.log(v);
        },
      }}
      prop={{
        val: {},
        types: {
          exports: "any",
          types: "any",
          render: "()=>void",
        },
      }}
      onClose={() => {
        p.ui.script.site = false;
        p.render();
      }}
    />
  );
};
