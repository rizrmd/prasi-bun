import { site } from "dbgen";
import { FC, ReactNode } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { formStyle } from "../../../../../utils/ui/form.style";
import { Input } from "../../../../../utils/ui/form/input";

export const EdFormSite: FC<{
  site: Partial<site>;
  onClose: () => void;
  onSave: (data: null | site) => void;
  group_id: string;
  header?: ReactNode;
}> = ({ site, onClose, onSave, group_id, header }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    init: false,
    saving: false,
    preventClose: false,
    domain_follow_name: false,
  });
  const form = useLocal({} as Partial<site>);

  if (!local.init) {
    local.init = true;
    for (const [k, v] of Object.entries(site)) {
      (form as any)[k] = v;
    }
  }

  return (
    <>
      <div
        className="absolute cursor-pointer inset-0 flex items-center justify-center
         backdrop-blur cursor-pointer hover:backdrop-blur-sm transition-all"
        onPointerUp={() => {
          if (!local.preventClose) {
            onClose();
          }
          local.preventClose = false;
          local.render();
        }}
      >
        <form
          onPointerDown={(e) => {
            e.stopPropagation();
            local.preventClose = true;
            local.render();
          }}
          onPointerUp={(e) => {
            e.stopPropagation();
            local.preventClose = false;
            local.render();
          }}
          onSubmit={async (e) => {
            e.preventDefault();

            if (form.name && p.user.id) {
              local.saving = true;
              local.render();
              try {
                let gid = group_id;
                if (!gid) {
                  let org = await _db.org.findFirst({
                    where: {
                      org_user: {
                        some: {
                          id_user: p.user.id,
                        },
                      },
                    },
                  });

                  if (!org) {
                    org = await _db.org.create({
                      data: {
                        name: `${p.user.username}'s sites`,
                        org_user: {
                          create: { id_user: p.user.id },
                        },
                      },
                    });
                  }
                  if (org) {
                    gid = org.id;
                  }
                }

                let data = null as null | site;
                if (!form.id) {
                  try {
                    data = await _db.site.create({
                      data: {
                        name: form.name,
                        favicon: "",
                        domain: form.domain || "",
                        id_user: p.user.id,
                        id_org: gid,
                        responsive: form.responsive,
                      },
                    });
                  } catch (e) {
                    alert(e);
                  }
                } else {
                  data = await _db.site.update({
                    data: {
                      name: form.name,
                      domain: form.domain,
                      responsive: form.responsive,
                    },
                    where: { id: form.id },
                  });
                }
                onSave(data);
              } catch (e) {
                alert(e);
              }
            }

            local.saving = false;
            local.render();
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {header}
          <div className={cx(formStyle, "bg-white shadow-2xl border")}>
            <label>
              <span>Name</span>
              <Input
                form={form}
                autoFocus
                name={"name"}
                onChange={(e) => {
                  if (!form.domain) {
                    local.domain_follow_name = true;
                  }

                  if (local.domain_follow_name) {
                    form.domain = (form.name || "")
                      .toLowerCase()
                      .replace(/[^a-z0-9\-_\.]/g, "");

                    form.render();
                  }
                }}
              />
            </label>
            <label>
              <span>Domain</span>
              <Input
                form={form}
                name={"domain"}
                onChange={(text) => {
                  return text.replace(/[^a-z0-9\-_\.]/g, "");
                }}
              />
            </label>

            <label>
              <span>Responsive</span>
              <select
                value={form.responsive}
                onChange={(e) => {
                  form.responsive = e.currentTarget.value as any;
                  local.render();
                }}
              >
                <option value="all">All</option>
                <option value="mobile-only">Mobile Only</option>
                <option value="desktop-only">Desktop Only</option>
              </select>
            </label>

            {form.id && (
              <label>
                <span>Site ID:</span>
                <Input form={form} name="id" disabled />
              </label>
            )}

            <div className="flex">
              <button type="submit" disabled={local.saving} className="flex-1">
                {local.saving ? "Saving..." : "Save"}
              </button>
              {form.id && (
                <button
                  className="bg-red-600 w-[40px] flex justify-center items-center"
                  onClick={async () => {
                    if (
                      confirm("Delete site cannot be undone. Are you sure ?")
                    ) {
                      if (
                        prompt(
                          "Please type 'yes' (without quote) to confirm deletion: "
                        )?.toLowerCase() === "yes"
                      ) {
                        let data = await _db.site.update({
                          where: {
                            id: site.id,
                          },
                          data: {
                            is_deleted: true,
                          },
                        });
                        onSave(data);
                      }
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    fill="none"
                    viewBox="0 0 15 15"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M5.5 1a.5.5 0 000 1h4a.5.5 0 000-1h-4zM3 3.5a.5.5 0 01.5-.5h8a.5.5 0 010 1H11v8a1 1 0 01-1 1H5a1 1 0 01-1-1V4h-.5a.5.5 0 01-.5-.5zM5 4h5v8H5V4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
