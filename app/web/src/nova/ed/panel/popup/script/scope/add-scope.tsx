import { PG } from "../../../../logic/ed-global";
import { CodeLoc, Monaco } from "./type";

export const addScope = (
  p: PG,
  type: "local" | "props" | "passprop",
  arg: {
    monaco: Monaco;
    loc: CodeLoc;
    source: string;
  }
) => {
  const { monaco, source } = arg;

  const filename = `ts:scope~${JSON.stringify(arg.loc)}.d.ts`;
  const model = monaco.editor.getModels().find((e) => {
    return e.uri.toString() === filename;
  });

  if (model) {
    model.setValue(source);
  } else {
    const model = monaco.editor.createModel(
      source,
      "typescript",
      monaco.Uri.parse(filename)
    );
    model.onDidChangeContent((e) => {
      const text = model.getValue();
      // modifyJS(p, type, arg.loc, text);
    });
  }
};
