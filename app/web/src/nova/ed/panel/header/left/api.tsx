import { EdApiServer } from "../../popup/api/api-server";
import { TopBtn } from "../top-btn";

export const EdApi = () => {
  return (
    <TopBtn
      style="slim"
      className="font-bold font-mono text-[10px]"
      popover={(popover) => <EdApiServer popover={popover} />}
      placement="right"
    >
      <div className="h-[26px] flex items-center justify-center">API</div>
    </TopBtn>
  );
};
