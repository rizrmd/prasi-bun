import { PG } from "../../../../logic/ed-global";
import { CodeLoc, Monaco } from "./type";

export const addScope = (
  p: PG,
  monaco: Monaco,
  filename: string,
  source: string
) => {
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
      console.log(filename, text);
      // const models = monaco.editor.getModels().filter((e) => {
      //   return e.uri.toString().startsWith("ts:scope~");
      // });
      // models.forEach((model) => {
      //   console.log(model?.getValue());
      // });
      // modifyJS(p, type, arg.loc, text);
    });
  }
};
