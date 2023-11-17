import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { iconModule, iconPlus, iconSSR, iconSite } from "./icons";

const codeName = {
  loading: false,
  list: [] as { name: string; id: string }[],
};

export const CodeNameItem: FC<{ name: string }> = ({ name }) => {
  let className = "";
  if (name === "site") {
    className = css`
      border-left: 4px solid #34a853;
      margin-left: -4px;
      height: 18px;
    `;
  }
  if (name === "SSR") {
    className = css`
      border-left: 4px solid #4dcfe0;
      margin-left: -4px;
      height: 18px;
    `;
  }
  return (
    <>
      <div className={className}></div>
      <NameIcon name={name} />
      <span>{name === "site" ? "Main Site" : name}</span>
    </>
  );
};
export const CodeNameList: FC<{
  onPick: (mod: { name: string; id: string }) => void;
}> = ({ onPick }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({}, async () => {
    codeName.loading = true;
    codeName.list = await api.code(p.site.id, "list");
    codeName.loading = false;
    local.render();
  });

  return (
    <>
      <div className="w-[200px] border border-b-0 flex flex-col text-sm">
        {codeName.list.length === 0 && (
          <div className="border-b cursor-pointer px-2 py-[3px] capitalize items-center hover:bg-blue-100 flex space-x-2">
            Loading...
          </div>
        )}
        {codeName.list.map((e) => (
          <div
            key={e.id}
            className="border-b cursor-pointer px-2 py-[3px] capitalize items-center hover:bg-blue-100 flex space-x-2"
            onClick={() => {
              onPick(e);
            }}
          >
            <CodeNameItem name={e.name} />
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
  } else if (n === "ssr") {
    html = iconSSR;
  } else {
    html = iconModule;
  }

  return (
    <div
      className={cx(className)}
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
};
