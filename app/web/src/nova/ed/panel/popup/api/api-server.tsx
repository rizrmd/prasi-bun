import trim from "lodash.trim";
import { forwardRef } from "react";
import { useGlobal, useLocal } from "web-utils";
import { deploy_target } from "../../../../../../../db/db";
import { Modal } from "../../../../../utils/ui/modal";
import { Popover } from "../../../../../utils/ui/popover";
import { EDGlobal } from "../../../logic/ed-global";
import { EdApiTab } from "./api-tab";
import { server } from "./api-utils";

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
  const local = useLocal(
    {
      tabs: [{ name: p.site.deploy_name, id: "" }] as deploy_target[],
      active: 0,
      open: false,
    },
    async () => {
      const targets = await _db.deploy_target.findMany({
        where: { id_site: p.site.id },
      });

      for (const t of targets) {
        local.tabs.push(t);
      }
      p.ui.deploy.target = local.tabs;

      p.render();
    }
  );
  p.ui.deploy.active = local.active;

  return (
    <div
      ref={ref}
      className="flex flex-col w-[400px] min-h-[400px] items-stretch bg-white -mx-[8px] -my-[3px] text-[14px]"
    >
      <div className="flex bg-slate-100 p-1 border-b pb-0 select-none">
        {local.tabs.map((e, idx) => {
          return (
            <div
              key={idx}
              className={cx(
                "px-2 border border-b-0 flex cursor-pointer items-center space-x-2",
                local.active === idx
                  ? "bg-white  hover:bg-blue-100"
                  : "px-2 border border-b-0 hover:bg-blue-100",
                css`
                  margin-bottom: -1px;
                `,
                idx > 0 && `ml-1`
              )}
              onClick={() => {
                local.active = idx;
                local.render();
              }}
            >
              <div>{e.name}</div>
              {local.active === idx && (
                <Popover
                  open={local.open}
                  backdrop={false}
                  onOpenChange={(open) => {
                    local.open = open;
                    local.render();
                  }}
                  content={
                    <div className="px-2 pb-2 flex flex-col space-y-2 items-center">
                      <svg
                        className="absolute top-2 right-2 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        onClick={() => {
                          local.open = false;
                          local.render();
                        }}
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                      <label>
                        <div>Deploy Name:</div>
                        <input
                          defaultValue={e.name}
                          autoFocus
                          spellCheck={false}
                          className="border p-1"
                          onKeyUp={(ev) => {
                            if (ev.key === "Enter") {
                              ev.currentTarget.blur();
                            }
                          }}
                          onBlur={async (ev) => {
                            const name = ev.currentTarget.value;
                            if (name !== e.name) {
                              if (confirm(`Rename ${e.name} to ${name}?`)) {
                                if (idx === 0) {
                                  await _db.site.update({
                                    where: { id: p.site.id },
                                    data: { deploy_name: name },
                                  });
                                } else {
                                  const target = local.tabs[
                                    idx
                                  ] as deploy_target;
                                  await _db.deploy_target.update({
                                    where: { id: target.id },
                                    data: { name },
                                  });
                                }
                                e.name = name;
                                local.open = false;
                                local.render();
                              }
                            }
                          }}
                        />
                      </label>
                      {idx > 0 && (
                        <div
                          onClick={async () => {
                            if (
                              confirm(
                                "Are you sure to delete this deploy target ? This is cannot be reversed."
                              )
                            ) {
                              const target = local.tabs[idx] as deploy_target;
                              await _db.deploy_target.delete({
                                where: { id: target.id },
                              });
                              local.active -= 1;
                              local.tabs.splice(idx, 1);
                              local.render();
                            }
                          }}
                          className="mt-2 rounded bg-red-500 text-white px-2 py-1 cursor-pointer hover:bg-red-700"
                        >
                          Delete
                        </div>
                      )}
                    </div>
                  }
                >
                  <svg
                    onClick={() => {
                      local.open = true;
                      local.render();
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </Popover>
              )}
            </div>
          );
        })}
        <div
          onClick={async () => {
            const new_name = prompt("New Deploy Target Name:");
            if (new_name) {
              const new_target = await _db.deploy_target.create({
                data: {
                  api_url: "",
                  domain: "",
                  id_site: p.site.id,
                  name: new_name,
                },
              });
              local.tabs.push(new_target);
              local.render();
            }
          }}
          className="mb-1 ml-1 bg-white px-1 cursor-pointer hover:bg-blue-100 border flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </div>
      </div>
      <EdApiTab
        onRender={(update) => {
          popover.onClose = update;
        }}
        target={local.active > 0 ? local.tabs[local.active] : undefined}
        id_site={p.site.id}
        api_url={p.site.config.api_url}
        onUpdate={async ({ api_url }) => {
          p.render();

          if (local.active === 0) {
            p.site.config.api_url = trim(api_url, "/");
            await p.sync?.site.update(p.site.id, {
              config: { api_url: api_url },
            });
          } else {
            const target = local.tabs[local.active];
            await _db.deploy_target.update({
              where: { id: target.id },
              data: { api_url },
            });
          }
          server.status = "ready";
          p.render();
        }}
      />
    </div>
  );
});
