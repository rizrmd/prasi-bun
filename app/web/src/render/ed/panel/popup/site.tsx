import { useGlobal } from "web-utils";
import { EDGlobal } from "../../logic/ed-global";
import { Modal } from "../../../../utils/ui/modal";

export const EdPopSite = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  if (!p.ui.popup.site) return null;

  return (
    <Modal
      open
      onOpenChange={(open) => {
        if (!open) {
          p.ui.popup.site = null;
          p.render();
        }
      }}
    >
      <div>Haloha</div>
    </Modal>
  );
};
