import { FC } from "react";

export const EdPageHistoryBtn: FC<{
  show: boolean;
  onShow: (show: boolean) => void;
}> = ({ show, onShow }) => {
  return (
    <>
      <div
        className={cx(
          "border-r min-w-[25px] px-2 flex items-center justify-center cursor-pointer select-none",
          show && "bg-blue-700 text-white flex-1",
          !show && "hover:bg-blue-100"
        )}
        onClick={() => {
          onShow(!show);
        }}
      >
        <div
          className={css`
            svg {
              width: 12px;
              height: 12px;
            }
          `}
          dangerouslySetInnerHTML={{
            __html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-history"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>`,
          }}
        ></div>
        {show && (
          <>
            <div className="text-xs ml-1 flex-1">History</div>
            <div className="ml-3 border-l border-l-blue-100/20 pl-2">
              &times;
            </div>
          </>
        )}
      </div>
    </>
  );
};
