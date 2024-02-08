import { useGlobal } from "web-utils";
import { EDGlobal, active } from "../../../logic/ed-global";
import { TopBtn } from "../top-btn";

export const EdPagePicker = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  if (p.page.list[p.page.cur.id]) {
    if (p.page.cur.name !== p.page.list[p.page.cur.id].page.name) {
      p.page.cur.name = p.page.list[p.page.cur.id].page.name;
    }
  }
  return (
    <TopBtn
      onClick={(e) => {
        p.ui.popup.page.open = (page_id) => {
          p.ui.popup.page.open = null;
          active.comp_id = "";
          active.item_id = "";
          navigate(`/ed/${p.site.id}/${page_id}`);
        };
        p.render();
      }}
      style="slim"
    >
      <div
        dangerouslySetInnerHTML={{
          __html: `<svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H7.5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
        }}
      ></div>
      <div className="overflow-hidden whitespace-nowrap text-[12px] text-ellipsis max-w-[100px]">
        {p.page.cur.name}
      </div>
    </TopBtn>
  );
};
