import { useGlobal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { TopBtn } from "../top-btn";

export const EdCompPicker = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  return (
    <TopBtn
      onClick={(e) => {}}
      style="slim"
    >
      <div
        dangerouslySetInnerHTML={{
          __html: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M2 1a1 1 0 00-1 1v11a1 1 0 001 1h11a1 1 0 001-1V2a1 1 0 00-1-1H2zm0 1h11v11H2V2zm2.5 2a.5.5 0 00-.5.5v6a.5.5 0 00.5.5h6a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5h-6zm.5 6V5h5v5H5z" clip-rule="evenodd"></path></svg>`,
        }}
      ></div>
    </TopBtn>
  );
};
