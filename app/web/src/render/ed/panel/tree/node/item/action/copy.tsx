import { IContent } from "../../../../../../../utils/types/general";
import { PG } from "../../../../../logic/ed-global";

export const edActionCopy = async (p: PG, item: IContent) => {
  const perm = await navigator.permissions.query({
    name: "clipboard-read",
    allowWithoutGesture: false,
  } as any);
  if (perm.state !== "granted") {
    await navigator.clipboard.read();
  }
  let str = `prasi-clipboard:` + JSON.stringify(item);
  navigator.clipboard.writeText(str);
};
