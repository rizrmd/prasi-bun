import { useGlobal, useLocal } from "web-utils";
import { Modal } from "../../../../../utils/ui/modal";
import { EDGlobal } from "../../../logic/ed-global";
import { validate } from "uuid";

export const EdCompImport = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    site_id: "",
    groups: [] as {
      name: string;
      id: string;
      comps: { id: string; name: string }[];
    }[],
    checked: [] as string[],
    checked_groups: [] as string[],
    status: "init" as "init" | "loading" | "done",
  });

  const load = async () => {
    if (!validate(local.site_id)) {
      alert("Site ID Not Valid!");
      return;
    }
    local.status = "loading";
    local.render();

    const res = await _db.component_group.findMany({
      where: {
        component_site: {
          some: {
            id_site: local.site_id,
          },
        },
        name: {
          not: "__TRASH__",
        },
      },
      select: {
        id: true,
        name: true,
        component: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    local.checked_groups = [];
    local.checked = [];
    local.groups = [];
    for (const i of res) {
      local.groups.push({
        id: i.id,
        name: i.name,
        comps: i.component.map((e) => {
          return { id: e.id, name: e.name };
        }),
      });
    }
    local.render();
  };
  return (
    <Modal
      open
      onOpenChange={(open) => {
        if (!open) {
          p.ui.popup.comp.import = false;
          p.render();
        }
      }}
      fade={false}
    >
      <div
        className={cx(
          "flex flex-col w-[400px] items-stretch bg-white -mx-[8px] -my-[3px] text-[14px]"
        )}
      >
        <div className="min-h-[400px] flex flex-col items-stretch p-3">
          <div className="flex justify-between items-center">
            <div>Import from Site ID:</div>
            <div className="space-x-1 flex">
              <div
                className="bg-white text-sm border px-2 my-1 flex items-center hover:border-blue-500 hover:bg-blue-50 cursor-pointer"
                onClick={() => {
                  load();
                }}
              >
                Load Site
              </div>
              {local.checked.length > 0 && (
                <div
                  className="bg-white text-sm border px-2 my-1 flex items-center hover:border-blue-500 hover:bg-blue-50 cursor-pointer"
                  onClick={() => {}}
                >
                  Import
                </div>
              )}
            </div>
          </div>
          <input
            type="text"
            className="border p-1 bg-white"
            spellCheck={false}
            value={local.site_id}
            onChange={(e) => {
              local.site_id = e.currentTarget.value;
              local.render();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                load();
              }
            }}
          />
          <div className="relative flex overflow-auto flex-1">
            <div className="inset-0 absolute p-2 flex flex-col">
              {local.groups.map((e) => {
                return (
                  <div className="flex flex-col" key={e.id}>
                    <label className="flex space-x-1">
                      <input
                        type="checkbox"
                        checked={local.checked_groups.includes(e.id)}
                        onChange={() => {
                          let is_checked = false;
                          if (local.checked_groups.includes(e.id)) {
                            local.checked_groups = local.checked_groups.filter(
                              (i) => e.id !== i
                            );
                          } else {
                            is_checked = true;
                            local.checked_groups.push(e.id);
                          }
                          for (const item of e.comps) {
                            if (is_checked) {
                              if (!local.checked.includes(item.id)) {
                                local.checked.push(item.id);
                              }
                            } else {
                              local.checked = local.checked.filter(
                                (e) => e !== item.id
                              );
                            }
                          }

                          local.render();
                        }}
                      ></input>
                      <div>{e.name}</div>
                    </label>
                    <div className="pl-3 flex flex-col">
                      {e.comps.map((f) => {
                        return (
                          <label key={f.id} className="flex space-x-1">
                            <input
                              type="checkbox"
                              checked={local.checked.includes(f.id)}
                              onChange={() => {
                                if (local.checked.includes(f.id)) {
                                  local.checked = local.checked.filter(
                                    (i) => f.id !== i
                                  );
                                } else {
                                  local.checked.push(f.id);
                                }
                                local.render();
                              }}
                            ></input>
                            <div>{f.name}</div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
