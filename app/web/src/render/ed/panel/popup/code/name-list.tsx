import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";

export const CodeNameList: FC<{}> = ({}) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal(
    {
      list: [],
    },
    async () => {
      local.list = await api.code(p.site.id, "list");
      local.render();
    }
  );

  return (
    <>
      <div className="fixed inset-0"></div>
      <div className="w-[200px] border flex flex-col">
        {JSON.stringify(local.list)}
      </div>
    </>
  );
};
