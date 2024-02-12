import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../logic/ed-global";
import { Loading } from "../../../../utils/ui/loading";
import { format, formatDistance } from "date-fns";
export const EdPageHistoryList = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal(
    { loading: true, list: [] as Awaited<ReturnType<typeof queryList>> },
    async () => {
      local.list = await queryList(p.page.cur.id);
      local.loading = false;
      local.render();
    }
  );

  return (
    <>
      {local.loading ? (
        <Loading backdrop={false} />
      ) : (
        <div className="flex flex-1 flex-col items-stretch">
          {local.list.map((e) => {
            return (
              <div
                className={cx(
                  "flex justify-between items-center text-sm px-2 py-1 cursor-pointer hover:bg-blue-100 border-b  transition-all select-none",
                  e.id === p.page.history.id &&
                    "border-r-4 bg-blue-50 border-r-blue-700"
                )}
                key={e.id}
                onClick={() => {
                  p.page.history.id = e.id;
                  p.render();
                  local.render();
                }}
              >
                <div className="flex-1">
                  {format(parseInt(e.ts) * 5000, "yyyy-MM-dd HH:mm:ss")}
                </div>

                <div className="text-right text-[11px]">
                  {formatDistance(Date.now(), parseInt(e.ts) * 5000) + " ago"}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

const queryList = async (page_id: string) => {
  return await _db.page_history.findMany({
    where: { id_page: page_id },
    select: {
      id: true,
      ts: true,
    },
    orderBy: { ts: "desc" },
  });
};
