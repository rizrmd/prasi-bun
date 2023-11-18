import { FC, ReactNode } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { Popover } from "../../../../../utils/ui/popover";
import { fuzzy } from "../../../../../utils/ui/fuzzy";

const assign = {
  loading: true,
  list: [] as Awaited<ReturnType<typeof getAssign>>,
  render: () => {},
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

  const filtered = fuzzy(
    local.list,
    mode === "page" ? { pk: "id", search: ["name", "url"] } : "name",
    local.search
  );

  return (
    <div className="flex flex-col min-w-[300px] min-h-[100px] items-stretch">
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
            onChange={(e) => {
              local.search = e.currentTarget.value;
              local.render();
            }}
            spellCheck={false}
            placeholder={`Search ${
              mode === "page" ? "Page" : "Component Group"
            }...`}
            className="flex flex-1 outline-none p-1 text-sm focus:border-blue-500 border border-transparent"
          />
        </div>
      </Popover>
      <div className=""></div>
    </div>
  );
};

const getAssign = async (id_code: string) => {
  return await db.code_assign.findMany({
    where: {
      id_code: { equals: id_code },
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
