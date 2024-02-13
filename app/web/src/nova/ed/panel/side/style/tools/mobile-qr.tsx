import QrSvg from "@wojtekmaj/react-qr-svg";
import { useGlobal, useLocal } from "web-utils";
import { ToolbarBox } from "../../../../../../utils/ui/box";
import { Modal } from "../../../../../../utils/ui/modal";
import { EDGlobal } from "../../../../logic/ed-global";

export const MobileQRButton = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({ open: false });
  return (
    <>
      <ToolbarBox
        className="flex"
        items={[
          {
            onClick() {
              local.open = true;
              local.render();
            },
            content: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="lucide lucide-qr-code"
                viewBox="0 0 24 24"
              >
                <rect width="5" height="5" x="3" y="3" rx="1"></rect>
                <rect width="5" height="5" x="16" y="3" rx="1"></rect>
                <rect width="5" height="5" x="3" y="16" rx="1"></rect>
                <path d="M21 16h-3a2 2 0 00-2 2v3M21 21v.01M12 7v3a2 2 0 01-2 2H7M3 12h.01M12 3h.01M12 16v.01M16 12h1M21 12v.01M12 21v-1"></path>
              </svg>
            ),
          },
        ]}
      />
      <Modal
        open={local.open}
        onOpenChange={(open) => {
          local.open = open;
          local.render();
        }}
      >
        <div
          className={cx(
            "flex flex-col w-[400px] items-stretch bg-white -mx-[8px] -my-[3px] text-[14px]"
          )}
        >
          <div className="min-h-[400px] flex flex-col items-center p-3">
            <QrSvg
              value={JSON.stringify({
                site: { name: p.site.name, id: p.site.id },
                page: {
                  name: p.page.cur.name,
                  id: p.page.cur.id,
                  url: p.page.cur.url,
                },
              })}
            />
            <br />
            <a
              href="/npm/apk-qr/_/_"
              target="_blank"
              className="border p-2 rounded-sm"
            >
              Download APK
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};
