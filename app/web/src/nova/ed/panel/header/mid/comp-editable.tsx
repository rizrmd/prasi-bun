import { useGlobal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { TopBtn } from "../top-btn";

export const EdCompEditable = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  const size = 12;
  return (
    <TopBtn
      onClick={(e) => {
        p.ui.comp_editable = !p.ui.comp_editable;
        localStorage.setItem(
          "prasi-comp-editable",
          p.ui.comp_editable ? "yes" : "no"
        );
        p.render();
      }}
      style="slim"
    >
      <div
        className={cx(
          "flex items-center justify-center pr-1 hover:text-white",
          css`
            height: 18px;
          `,
          p.ui.comp_editable ? "text-green-700 " : "text-red-700"
        )}
      >
        <div
          className="mr-[2px]"
          dangerouslySetInnerHTML={{
            __html: p.ui.comp_editable
              ? `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-pen-line"><path d="m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"/><path d="M8 18h1"/><path d="M18.4 9.6a2 2 0 1 1 3 3L17 17l-4 1 1-4Z"/></svg>`
              : `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-lock-2"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v1"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><rect width="8" height="5" x="2" y="13" rx="1"/><path d="M8 13v-2a2 2 0 1 0-4 0v2"/></svg>`,
          }}
        ></div>
        <div className="text-[7px] leading-none">
          <div>Component</div>
          <div>{p.ui.comp_editable ? "Editable" : "Locked"}</div>
        </div>
      </div>
    </TopBtn>
  );
};
