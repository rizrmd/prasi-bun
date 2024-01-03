import { extractLoc } from "../../../../../../utils/script/mount";
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
    const uri = monaco.Uri.parse(filename);
    const model = monaco.editor.createModel(source, "typescript", uri);

    const arg = extractLoc(uri.path.split("_"), p);
    model.onDidChangeContent((e) => {
      const text = model.getValue();
      console.log(arg);
      console.warn(text);
    });
  }
};
