import { useErrorBoundary, withErrorBoundary } from "react-use-error-boundary";
import { useLocal } from "web-utils";
import { IMeta } from "../../ed/logic/ed-global";

export const ErrorBox = withErrorBoundary(
  ({
    children,
    meta,
    id,
    silent = true,
  }: {
    children: any;
    meta?: IMeta;
    id?: string;
    silent?: boolean;
  }) => {
    const local = useLocal({ retrying: false, meta });
    const [error, resetError] = useErrorBoundary((error, errorInfo) => {
      if (silent !== true) console.error(error);
    });

    if (meta && local.meta !== meta) {
      local.meta = meta;
      setTimeout(resetError);
    }

    let _meta = meta;

    if (error) {
      return (
        <div className="bg-red-100 border border-red-300 rounded-sm text-xs flex flex-col items-center">
          <div className="text-[10px] font-bold text-red-900 self-stretch px-1">
            ERROR {_meta?.item.name ? "[" + _meta.item.name + "]:" : ""}
          </div>
          <p className="border-b border-red-300 px-1 pb-1 min-w-[100px]">
            {!local.retrying ? <>{(error as any).message}</> : <>Retrying...</>}
          </p>
          <div className="p-1">
            <button
              onClick={() => {
                local.retrying = true;
                local.render();

                setTimeout(() => {
                  local.retrying = false;
                  local.render();
                  resetError();
                }, 100);
              }}
              className="bg-white border border-white hover:border-red-400 hover:bg-red-50 rounded px-2"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
);
