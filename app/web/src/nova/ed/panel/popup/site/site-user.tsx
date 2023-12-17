import { ReactNode } from "react";
import { Popover } from "../../../../../utils/ui/popover";
import { Placement } from "@floating-ui/react";
import Select from "react-select";
import { useLocal } from "web-utils";

const user = {
  loading: null as null | Promise<void>,
  all: [] as { id: string; username: string }[],
};
export const EdPopUser = ({
  users,
  children,
  placement = "right",
  onDel,
  onAdd,
}: {
  users: { id: string; username: string }[];
  children: ReactNode;
  placement?: Placement;
  onAdd?: (u: { id: string; username: string }) => void | Promise<void>;
  onDel?: (u: { id: string; username: string }) => void | Promise<void>;
}) => {
  const local = useLocal(
    {
      menuOpen: false,
      index: {} as Record<string, { id: string; username: string }>,
    },
    async () => {
      if (!user.loading) {
        user.loading = new Promise(async (done) => {
          const res = await db.user.findMany({
            select: {
              id: true,
              username: true,
            },
          });
          if (res) {
            user.all = res;
          }
          local.render();
          done();
        });
      } else {
        await user.loading;
        local.render();
      }
    }
  );

  local.index = {};
  if (users) {
    for (const r of users) {
      local.index[r.id] = r;
    }
  }

  return (
    <Popover
      backdrop={false}
      placement={placement}
      autoFocus={false}
      className="outline-none"
      content={
        <div
          className={cx("text-[14px] min-w-[200px] outline-none -mx-2 -my-1")}
        >
          <div
            className={cx(css`
              .sel__control {
                border: 0px;
                border-radius: 0px;
                border-bottom: 1px solid #ececeb;
                outline: none;
              }
              .sel__control--is-focused {
                box-shadow: none !important;
                border: 0px;
              }
              .sel__menu {
                border-radius: 0px;
                border: 0px;
                background: white;
                margin: 0px;
              }
              .sel__value-container {
                padding-left: 5px;
              }
              .sel__option {
                padding: 2px 5px;
                border-bottom: 1px solid #ececeb;
                &:hover {
                  background: #e0e9fa;
                }
              }
            `)}
          >
            <div className="border-b px-1 pt-2 pb-1">Existing user:</div>
            <div className="flex flex-col ml-4 border-l">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={
                    " bg-lime-50 hover:bg-lime-100 border-b pl-2 flex justify-between items-center"
                  }
                >
                  <div className="flex-1">{user.username}</div>
                  {onDel && (
                    <div
                      className="p-1 hover:bg-red-600 hover:text-white  cursor-pointer"
                      onClick={() => {
                        onDel(user);
                      }}
                      dangerouslySetInnerHTML={{
                        __html: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
                      }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            {Array.isArray(user.all) && user.all.length > 0 && onAdd && (
              <Select
                options={user.all
                  .filter((e) => {
                    if (local.index[e.id]) return false;
                    return true;
                  })
                  .map((user) => ({
                    label: user.username,
                    value: user.id,
                  }))}
                value={null}
                menuIsOpen={local.menuOpen}
                onInputChange={(e) => {
                  if (e) {
                    local.menuOpen = true;
                  } else {
                    local.menuOpen = false;
                  }
                  local.render();
                }}
                autoFocus
                onChange={async (e) => {
                  if (e) {
                    onAdd({ username: e.label, id: e.value });
                  }
                }}
                placeholder={"Add User"}
                className={cx("outline-none border-t -mt-[1px]")}
                classNamePrefix={"sel"}
              />
            )}
          </div>
        </div>
      }
    >
      {children}
    </Popover>
  );
};
