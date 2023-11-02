import { useGlobal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { Modal } from "../../../../../utils/ui/modal";
import { useEffect } from "react";

export const EdPopCode = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  useEffect(() => {
    p.sync.activity("site", {
      action: p.ui.popup.code.open ? "open" : "close",
      id: p.site.id,
      type: "code",
    });
  }, [p.ui.popup.code.open]);

  return (
    <Modal
      fade={false}
      open={p.ui.popup.code.open}
      onOpenChange={(open) => {
        if (!open) {
          p.ui.popup.code.open = false;
          p.render();
        }
      }}
    >
      <div
        className={cx(
          "bg-white fixed inset-[50px] bottom-0 flex flex-col inset-0"
        )}
      >
        <div className="border-b flex h-[40px] items-stretch">
          <div
            className={cx(
              "border-r flex items-center px-2 w-[100px] overflow-ellipsis space-x-1",
              "cursor-pointer"
            )}
          >
            <div
              className="-mt-[2px]"
              dangerouslySetInnerHTML={{
                __html: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H11.5C11.7761 2 12 2.22386 12 2.5V13.5C12 13.6818 11.9014 13.8492 11.7424 13.9373C11.5834 14.0254 11.3891 14.0203 11.235 13.924L7.5 11.5896L3.765 13.924C3.61087 14.0203 3.41659 14.0254 3.25762 13.9373C3.09864 13.8492 3 13.6818 3 13.5V2.5ZM4 3V12.5979L6.97 10.7416C7.29427 10.539 7.70573 10.539 8.03 10.7416L11 12.5979V3H4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
              }}
            ></div>
            <div>Site</div>
          </div>
        </div>
        <iframe
          className="flex flex-1"
          src="http://localhost:3000/?folder=/site"
        ></iframe>
      </div>
    </Modal>
  );
};
