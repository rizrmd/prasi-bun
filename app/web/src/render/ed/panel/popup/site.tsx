import {
  MultiBackend,
  NodeModel,
  Tree,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { useGlobal, useLocal } from "web-utils";
import { Loading } from "../../../../utils/ui/loading";
import { Modal } from "../../../../utils/ui/modal";
import { EDGlobal } from "../../logic/ed-global";

type GItem = {
  id: string;
  name: string;
} & (
  | {
      type: "group";
      users: { id: string; username: string }[];
    }
  | { type: "site"; domain: string }
);

export const EdPopSite = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal(
    {
      status: "init" as "init" | "loading" | "ready",
      group: [] as NodeModel<GItem>[],
    },
    () => {
      p.ui.popup.site = () => {};
      p.render();
    }
  );
  useEffect(() => {
    if (p.ui.popup.site && local.status !== "loading") {
      (async () => {
        local.status = "loading";
        local.render();

        const res = await p.sync.site.group();

        const group: NodeModel<GItem>[] = [];
        for (const item of res) {
          group.push({
            id: item.id,
            parent: "site-root",
            text: item.name,
            data: {
              id: item.id,
              type: "group",
              name: item.name,
              users: item.org_user.map((e) => ({
                id: e.user.id,
                username: e.user.username,
              })),
            },
          });

          for (const site of item.site) {
            group.push({
              id: site.id,
              parent: item.id,
              text: site.name,
              droppable: false,
              data: {
                id: site.id,
                type: "site",
                name: site.name,
                domain: site.domain,
              },
            });
          }

          group.push({
            id: `new-${item.id}`,
            parent: item.id,
            text: "new",
            droppable: false,
          });
        }
        local.group = group;

        local.status = "ready";
        local.render();
      })();
    }
  }, [p.ui.popup.site]);

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
      <div className="absolute inset-[5%] bg-white flex">
        <div className="relative flex flex-1">
          {local.status === "loading" ? (
            <Loading backdrop={false} note="listing-site" />
          ) : (
            <SitePicker group={local.group} />
          )}
        </div>
      </div>
    </Modal>
  );
};

const SitePicker = ({ group }: { group: NodeModel<GItem>[] }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const TypedTree = Tree<GItem>;
  const orglen = group.filter((e) => e.parent === "site-root").length;
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b text-[20px] pt-[15px] pb-[5px] pl-1 flex space-x-3 items-center">
        <div>
          {orglen} Organization{orglen > 1 ? "s" : ""}
        </div>
        <div
          className="text-[12px] bg-white border rounded mx-2 px-2 hover:bg-blue-100 cursor-pointer flex items-center space-x-1 "
          onClick={async () => {
            const neworg = prompt("New Organization Name");
            if (neworg) {
              const res = await db.org.create({
                data: {
                  name: neworg,
                  org_user: {
                    create: { id_user: p.user.id, role: "owner" },
                  },
                },
              });
              console.log(res);
            }
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.5C2 3.22386 2.22386 3 2.5 3H12.5C12.7761 3 13 3.22386 13 3.5V9.5C13 9.77614 12.7761 10 12.5 10H2.5C2.22386 10 2 9.77614 2 9.5V3.5ZM2 10.9146C1.4174 10.7087 1 10.1531 1 9.5V3.5C1 2.67157 1.67157 2 2.5 2H12.5C13.3284 2 14 2.67157 14 3.5V9.5C14 10.1531 13.5826 10.7087 13 10.9146V11.5C13 12.3284 12.3284 13 11.5 13H3.5C2.67157 13 2 12.3284 2 11.5V10.9146ZM12 11V11.5C12 11.7761 11.7761 12 11.5 12H3.5C3.22386 12 3 11.7761 3 11.5V11H12ZM5 6.5C5 6.22386 5.22386 6 5.5 6H7V4.5C7 4.22386 7.22386 4 7.5 4C7.77614 4 8 4.22386 8 4.5V6H9.5C9.77614 6 10 6.22386 10 6.5C10 6.77614 9.77614 7 9.5 7H8V8.5C8 8.77614 7.77614 9 7.5 9C7.22386 9 7 8.77614 7 8.5V7H5.5C5.22386 7 5 6.77614 5 6.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
            }}
          ></div>
          <div>New</div>
        </div>
      </div>

      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <TypedTree
          tree={group}
          rootId={"site-root"}
          onDrop={() => {}}
          initialOpen={true}
          canDrag={(node) => {
            if (node && node?.data?.type === "site") return true;
            return false;
          }}
          canDrop={(_, { dragSource, dropTarget }) => {
            if (dragSource?.parent === dropTarget?.id) return false;
            return true;
          }}
          sort={(a, b) => {
            if (a.text === "new") return 1;
            if (b.text === "new") return -1;
            return a.text > b.text ? 1 : -1;
          }}
          dragPreviewRender={() => <></>}
          classes={{
            root: cx(
              "flex flex-1 flex-col items-stretch overflow-auto",
              css`
                flex-wrap: nowrap;
                background: white;
              `
            ),
            container: "flex flex-row flex-wrap pb-2",
          }}
          render={(
            node,
            { depth, isOpen, onToggle, isDropTarget, isDragging }
          ) => {
            const item = node.data;

            if (node.text === "new") {
              return (
                <div
                  className={cx(
                    "flex flex-col ml-2 mt-1 mb-1 w-[150px] min-h-[89px] text-[14px] border bg-white hover:bg-blue-100 cursor-pointer  justify-center text-slate-400 hover:text-slate-800"
                  )}
                >
                  <div className="flex items-center space-x-1 pl-3">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V4.70711L9.29289 2H3.5ZM2 2.5C2 1.67157 2.67157 1 3.5 1H9.5C9.63261 1 9.75979 1.05268 9.85355 1.14645L12.7803 4.07322C12.921 4.21388 13 4.40464 13 4.60355V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5ZM4.75 7.5C4.75 7.22386 4.97386 7 5.25 7H7V5.25C7 4.97386 7.22386 4.75 7.5 4.75C7.77614 4.75 8 4.97386 8 5.25V7H9.75C10.0261 7 10.25 7.22386 10.25 7.5C10.25 7.77614 10.0261 8 9.75 8H8V9.75C8 10.0261 7.77614 10.25 7.5 10.25C7.22386 10.25 7 10.0261 7 9.75V8H5.25C4.97386 8 4.75 7.77614 4.75 7.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
                      }}
                    ></div>
                    <div>New Site</div>
                  </div>
                </div>
              );
            }

            if (!item) return <></>;
            if (item.type === "group") {
              return (
                <div
                  className={cx(
                    "flex items-center px-2 border-b mb-2 pb-2 pt-10 ",
                    isDropTarget && "bg-blue-100"
                  )}
                >
                  <div>{node.text}</div>
                  <div className="text-[12px] bg-white border rounded mx-2 px-2 hover:bg-blue-100 cursor-pointer ">
                    Team: {item.users.length} user
                    {item.users.length > 1 ? "s" : ""}
                  </div>
                  {isDropTarget && (
                    <div className="px-2 text-slate-400 text-[12px]">
                      Drop to move here...
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div
                className={cx(
                  "flex flex-col ml-2 mt-1 mb-1 w-[150px] text-[14px] border bg-white hover:bg-blue-100 cursor-pointer",
                  css`
                    .edit {
                      opacity: 0;
                    }
                    &:hover .edit {
                      opacity: 1;
                    }
                  `
                )}
              >
                <div className="flex flex-col p-1">
                  <div className="h-[40px] flex items-end">{item.name}</div>
                  <div className="text-slate-400 flex items-center space-x-1 text-[12px]">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.51194 3.00541C9.18829 2.54594 10.0435 2.53694 10.6788 2.95419C10.8231 3.04893 10.9771 3.1993 11.389 3.61119C11.8009 4.02307 11.9513 4.17714 12.046 4.32141C12.4633 4.95675 12.4543 5.81192 11.9948 6.48827C11.8899 6.64264 11.7276 6.80811 11.3006 7.23511L10.6819 7.85383C10.4867 8.04909 10.4867 8.36567 10.6819 8.56093C10.8772 8.7562 11.1938 8.7562 11.389 8.56093L12.0077 7.94221L12.0507 7.89929C12.4203 7.52976 12.6568 7.2933 12.822 7.0502C13.4972 6.05623 13.5321 4.76252 12.8819 3.77248C12.7233 3.53102 12.4922 3.30001 12.1408 2.94871L12.0961 2.90408L12.0515 2.85942C11.7002 2.508 11.4692 2.27689 11.2277 2.11832C10.2377 1.46813 8.94398 1.50299 7.95001 2.17822C7.70691 2.34336 7.47044 2.57991 7.1009 2.94955L7.058 2.99247L6.43928 3.61119C6.24401 3.80645 6.24401 4.12303 6.43928 4.31829C6.63454 4.51355 6.95112 4.51355 7.14638 4.31829L7.7651 3.69957C8.1921 3.27257 8.35757 3.11027 8.51194 3.00541ZM4.31796 7.14672C4.51322 6.95146 4.51322 6.63487 4.31796 6.43961C4.12269 6.24435 3.80611 6.24435 3.61085 6.43961L2.99213 7.05833L2.94922 7.10124C2.57957 7.47077 2.34303 7.70724 2.17788 7.95035C1.50265 8.94432 1.4678 10.238 2.11799 11.2281C2.27656 11.4695 2.50766 11.7005 2.8591 12.0518L2.90374 12.0965L2.94837 12.1411C3.29967 12.4925 3.53068 12.7237 3.77214 12.8822C4.76219 13.5324 6.05589 13.4976 7.04986 12.8223C7.29296 12.6572 7.52943 12.4206 7.89896 12.051L7.89897 12.051L7.94188 12.0081L8.5606 11.3894C8.75586 11.1941 8.75586 10.8775 8.5606 10.6823C8.36533 10.487 8.04875 10.487 7.85349 10.6823L7.23477 11.301C6.80777 11.728 6.6423 11.8903 6.48794 11.9951C5.81158 12.4546 4.95642 12.4636 4.32107 12.0464C4.17681 11.9516 4.02274 11.8012 3.61085 11.3894C3.19896 10.9775 3.0486 10.8234 2.95385 10.6791C2.53661 10.0438 2.54561 9.18863 3.00507 8.51227C3.10993 8.35791 3.27224 8.19244 3.69924 7.76544L4.31796 7.14672ZM9.62172 6.08558C9.81698 5.89032 9.81698 5.57373 9.62172 5.37847C9.42646 5.18321 9.10988 5.18321 8.91461 5.37847L5.37908 8.91401C5.18382 9.10927 5.18382 9.42585 5.37908 9.62111C5.57434 9.81637 5.89092 9.81637 6.08619 9.62111L9.62172 6.08558Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
                      }}
                    ></span>
                    <div>{item.domain}</div>
                  </div>
                </div>

                <div className="edit px-1 bg-white  border-l-4 border-blue-400 text-blue-400 hover:bg-blue-500 hover:text-white">
                  EDIT
                </div>
              </div>
            );
          }}
        />
      </DndProvider>
    </div>
  );
};
