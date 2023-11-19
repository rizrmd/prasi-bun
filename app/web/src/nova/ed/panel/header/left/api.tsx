import { EdApiServer } from "../../popup/api/api-server";
import { TopBtn } from "../top-btn";

export const EdApi = () => {
  return (
    <TopBtn
      style="slim"
      innerClassName="flex-1 flex items-center justify-center"
      popover={(popover) => <EdApiServer popover={popover} />}
      placement="right"
    >
      <div
        className="flex-1 min-h-[26px] flex items-center justify-center"
        dangerouslySetInnerHTML={{
          __html: `
          <svg fill="currentColor" width="13px" height="13px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h16v16H0V0zm2 2v2h12V2H2zm0 4v2h12V6H2zm0 4v4h12v-4H2zm1 2c0-.552.444-1 1-1 .552 0 1 .444 1 1 0 .552-.444 1-1 1-.552 0-1-.444-1-1z" fill-rule="evenodd"/>
          </svg>`,
        }}
      ></div>
    </TopBtn>
  );
};
