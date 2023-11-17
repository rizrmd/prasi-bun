import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { iconPlus, iconSite } from "./icons";

export const CodeNameList: FC<{}> = ({}) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal(
    {
      list: [] as { name: string; id: string }[],
    },
    async () => {
      local.list = await api.code(p.site.id, "list");
      local.render();
    }
  );

  return (
    <>
      <div className="w-[200px] border border-b-0 flex flex-col text-sm">
        {local.list.map((e) => (
          <div
            key={e.id}
            className="border-b cursor-pointer px-2 py-[3px] capitalize items-center hover:bg-blue-100 flex space-x-2"
          >
            <NameIcon name={e.name} />
            <span>{e.name}</span>
          </div>
        ))}
        <div className="border-b cursor-pointer px-2 py-[3px] capitalize items-center flex space-x-1 hover:bg-green-100 text-green-600">
          <span dangerouslySetInnerHTML={{ __html: iconPlus }}></span>
          <span>New Code Module</span>
        </div>
      </div>
    </>
  );
};

export const NameIcon: FC<{ name: string; className?: string }> = ({
  name,
  className,
}) => {
  const n = name.toLowerCase();

  let html = "";
  if (n === "site") {
    html = iconSite;
  }

  return (
    <div
      className={cx(className)}
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
};
