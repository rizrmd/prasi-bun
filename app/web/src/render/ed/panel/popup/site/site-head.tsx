import { NodeModel } from "@minoru/react-dnd-treeview";
import { SiteGroupItem } from "./site-tree";
import { useGlobal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";

export const EdSiteHead = ({
  group,
  update,
  reload,
  orglen,
  conf,
}: {
  orglen: number;
  group: NodeModel<SiteGroupItem>[];
  update: (val: NodeModel<SiteGroupItem>[]) => void;
  reload: (id?: string) => Promise<void>;
  conf: { group: any };
}) => {
  const p = useGlobal(EDGlobal, "EDITOR");

  return (
    <div className="border-b text-[20px] pt-[10px] pb-[5px] pl-1 flex  items-center">
      <div>
        {orglen} Organization{orglen > 1 ? "s" : ""}
      </div>
      <div
        className="text-[12px] bg-white border rounded ml-2 px-2 hover:bg-blue-100 cursor-pointer flex items-center space-x-1 "
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

            update([]);

            setTimeout(() => {
              reload(res.id);
            });
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

      <div
        className={cx(
          "text-[12px] bg-white border rounded px-2 hover:bg-blue-100 cursor-pointer flex items-center ml-1 space-x-1 "
        )}
        onClick={() => {
          conf.group = null;
          reload();
        }}
      >
        Refresh
      </div>
    </div>
  );
};
