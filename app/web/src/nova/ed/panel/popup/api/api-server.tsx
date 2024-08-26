import { forwardRef } from "react";
import { useGlobal } from "web-utils";
import { Modal } from "../../../../../utils/ui/modal";
import { EDGlobal } from "../../../logic/ed-global";
import { EdApiTab } from "./api-tab";
import trim from "lodash.trim";

export const EdPopApi = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  return (
    <Modal
      open={p.ui.popup.api.open}
      onOpenChange={(open) => {
        p.ui.popup.api.open = open;
        p.render();
      }}
    >
      <EdApiServer
        popover={{
          onClose() {
            p.ui.popup.api.open = false;
            p.render();
          },
        }}
      />
    </Modal>
  );
};

export const EdApiServer = forwardRef<
  HTMLDivElement,
  {
    popover: { onClose: () => void };
  }
>(({ popover }, ref) => {
  const p = useGlobal(EDGlobal, "EDITOR");

  return (
    <div
      ref={ref}
      className="flex flex-col w-[400px] items-stretch bg-white -mx-[8px] -my-[3px] text-[14px]"
    >
      <EdApiTab
        onRender={(update) => {
          popover.onClose = update;
        }}
        id_site={p.site.id}
        api_url={p.site.config.api_url}
        onUpdate={async ({ api_url }) => {
          p.render();
          p.site.config.api_url = trim(api_url, "/");
          await p.sync?.site.update(p.site.id, {
            config: { api_url: api_url },
          });

          // if (local.hasDB && local.oldDB.url !== local.db.url) {
          //   server.status = "saving";
          //   p.render();

          //   await apiRef[apiUrl(p)]._deploy({
          //     type: "db-update",
          //     id_site: p.site.id,
          //     url: local.db.url,
          //   });
          //   local.oldDB.url = local.db.url;
          //   p.render();
          // }

          // if (server.status === "saving") {
          //   await check();
          //   server.status = "ready";
          //   p.render();
          // }
        }}
      />
    </div>
  );
});
