import { FC, ReactNode } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { Popover } from "../../../../../utils/ui/popover";
import { fuzzy } from "../../../../../utils/ui/fuzzy";
import { iconTrash } from "./icons";

const assign = {
  loading: true,
  list: [] as Awaited<ReturnType<typeof getAssign>>,
  render: () => {},
};
const select = {
  id: true,
  id_code: true,
  id_component_group: true,
  id_page: true,
  page: {
    select: {
      name: true,
      url: true,
    },
  },
  component_group: {
    select: {
      name: true,
    },
  },
};

export const CodeAssign: FC<{ id_code: string; onClose: () => void }> = ({
  onClose,
  id_code,
}) => {
  const local = useLocal({}, async () => {
    assign.list = await getAssign(id_code);
    assign.loading = false;
    assign.render();
  });
  assign.render = local.render;

  return (
    <div className={"flex items-stretch"}>
      <AssignList id_code={id_code} mode="page" />
      <div className="border-r"></div>
      <AssignList id_code={id_code} mode="comp" />
    </div>
  );
};

const AssignList: FC<{ id_code: string; mode: "page" | "comp" }> = ({
  id_code,
  mode,
}) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal(
    {
      search: "",
      list: [] as { id: string; name: string; url?: string }[],
      popover: false,
      loading: true,
      input: null as HTMLInputElement | null,
    },
    async () => {
      if (mode === "page") {
        const list = await db.page.findMany({
          where: {
            id_site: p.site.id,
            is_deleted: false,
          },
          select: {
            name: true,
            id: true,
            url: true,
          },
        });

        local.list = list.map((e) => ({
          id: e.id,
          name: e.name,
          url: e.url,
        }));
      } else {
        const list = await db.component_site.findMany({
          where: {
            id_site: p.site.id,
            component_group: {
              name: { not: { equals: "__TRASH__" } },
            },
          },
          select: {
            component_group: { select: { id: true, name: true } },
          },
        });
        local.list = list.map((e) => ({
          id: e.component_group.id,
          name: e.component_group.name,
        }));
      }
      local.loading = false;
      local.render();
    }
  );

  let filtered = fuzzy(
    local.list,
    mode === "page" ? { pk: "id", search: ["name", "url"] } : "name",
    local.search
  );

  if (mode === "page") {
    filtered = filtered.filter(
      (e) => !assign.list.find((f) => f.id_page === e.id)
    );
  } else {
    filtered = filtered.filter(
      (e) => !assign.list.find((f) => f.id_component_group === e.id)
    );
  }

  return (
    <div
      className={cx(
        `flex flex-col min-h-[300px] items-stretch`,
        mode === "page" ? "min-w-[600px]" : "min-w-[300px]"
      )}
    >
      <Popover
        open={local.popover}
        onOpenChange={(open) => {
          local.popover = open;
          local.render();
        }}
        arrow={false}
        backdrop={false}
        popoverClassName={cx(
          "p-0 shadow-lg border border-blue-500 bg-white",
          css`
            top: -7px !important;
          `
        )}
        content={
          <div className="flex flex-col min-w-[300px] min-h-[50px] max-h-[300px] overflow-auto items-stretch">
            {local.loading && (
              <div className="flex flex-1 items-center justify-center">
                Loading...
              </div>
            )}
            {!local.loading &&
              filtered.map((e) => {
                let label: any = e.name;
                if (mode === "page") {
                  label = (
                    <div className="flex flex-1 justify-between">
                      <div>{e.name}</div>
                      <div className="text-slate-500 text-sm pl-10">
                        {e.url}
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    onClick={async () => {
                      local.popover = false;
                      local.render();

                      let res = null as any;
                      if (mode === "page") {
                        res = await db.code_assign.create({
                          data: {
                            id_code: id_code,
                            id_page: e.id,
                          },
                          select,
                        });
                      } else {
                        res = await db.code_assign.create({
                          data: {
                            id_code: id_code,
                            id_component_group: e.id,
                          },
                          select,
                        });
                      }
                      assign.list.push(res);
                      assign.render();
                    }}
                    className={
                      "border-b p-1 flex flex-col items-stretch hover:bg-blue-100 cursor-pointer"
                    }
                    key={e.id}
                  >
                    {label}
                  </div>
                );
              })}
          </div>
        }
      >
        <div className="border-b flex">
          <input
            type="text"
            value={local.search}
            ref={(e) => {
              if (e) {
                local.input = e;
              }
            }}
            onChange={(e) => {
              local.popover = true;
              local.search = e.currentTarget.value;
              local.render();
            }}
            spellCheck={false}
            placeholder={`+ Attach ${
              mode === "page" ? "Page" : "Component Group"
            }...`}
            className="flex flex-1 outline-none p-1 text-sm focus:border-blue-500 border border-transparent"
          />
        </div>
      </Popover>
      <div className="max-h-[500px] overflow-auto">
        {assign.list.map((e) => {
          if (
            (mode === "page" && e.id_page) ||
            (mode === "comp" && e.id_component_group)
          ) {
            return (
              <div className="flex bg-white pl-2 border-b hover:bg-blue-50 items-stretch">
                <div className="flex flex-1 py-1 pr-1">
                  {(() => {
                    if (mode === "page" && e.id_page) {
                      return (
                        <>
                          <div>{e.page?.name}</div>
                          <div className="flex-1 text-sm text-right text-slate-500">
                            {e.page?.url}
                          </div>
                        </>
                      );
                    }
                    if (mode === "comp" && e.id_component_group) {
                      return <div>{e.component_group?.name}</div>;
                    }
                  })()}
                </div>
                <div
                  className="border-l px-2 hover:bg-red-50 flex items-center justify-center hover:text-red-500 cursor-pointer"
                  onClick={async () => {
                    if (confirm("Are you sure ?")) {
                      assign.list = assign.list.filter((f) => f.id !== e.id);
                      assign.render();
                      await db.code_assign.delete({ where: { id: e.id } });
                    }
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: iconTrash }}></div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

const getAssign = async (id_code: string) => {
  return await db.code_assign.findMany({
    where: {
      id_code: { equals: id_code },
    },
    select: {
      id: true,
      id_code: true,
      id_component_group: true,
      id_page: true,
      page: {
        select: {
          name: true,
          url: true,
        },
      },
      component_group: {
        select: {
          name: true,
        },
      },
    },
  });
};

const selectStyle = css`
  flex: 1;

  .sel__control {
    border: 0px;
    border-radius: 0px;
    outline: none;
    min-height: 29px;
    border-left: 1px solid #ececeb;
    border-right: 1px solid #ececeb;
  }
  .sel__control--is-focused {
    box-shadow: none !important;
    border-bottom: 1px solid blue;
  }
  .sel__menu {
    border-radius: 0px;
    background: white;
    border: 1px solid #ececeb;
  }
  .sel__value-container {
    padding-left: 5px;
  }
  .sel__option {
    padding: 2px 5px;
    border-bottom: 1px solid #ececeb;
  }
  .sel__option--is-selected,
  .sel__option--is-focused {
    background: #e0e9fa;
  }
  .sel__indicator {
    width: 15px;
    opacity: 0.7;
  }
  .sel__placeholder {
    color: #ccc;
  }
`;
