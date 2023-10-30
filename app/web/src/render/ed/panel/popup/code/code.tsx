import { useGlobal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";

export const EdPopCode = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  if (!p.ui.popup.code) {
    return null;
  }

  return <></>;
};
