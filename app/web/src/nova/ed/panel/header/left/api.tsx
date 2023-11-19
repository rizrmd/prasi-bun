import { EdApiServer } from "../../popup/api/api-server";
import { TopBtn } from "../top-btn";

export const EdApi = () => {
  return (
    <TopBtn
      style="slim"
      className={cx(
        "font-mono text-[10px]",
        css`
          .text {
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ccc;
          }
          &:hover .text {
            border-top: 1px solid white;
            border-bottom: 1px solid white;
          }
        `
      )}
      popover={(popover) => <EdApiServer popover={popover} />}
      placement="right"
    >
      <div className="h-[26px] flex items-center justify-center">
        <div className="text">API</div>
      </div>
    </TopBtn>
  );
};
