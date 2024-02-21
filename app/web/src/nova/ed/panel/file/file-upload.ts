import { fetchViaProxy } from "../../../../base/load/proxy";
import { PG } from "../../logic/ed-global";

export const uploadFile = async (p: PG, files: File[]) => {
  await p.script.api._raw(`/_upload?to=${p.ui.popup.file.path}`, ...files);
};
