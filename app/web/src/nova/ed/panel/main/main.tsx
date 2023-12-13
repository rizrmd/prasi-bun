import { useGlobal } from "web-utils";
import { Vi } from "../../../vi/vi";
import { EDGlobal } from "../../logic/ed-global";

export const EdMain = () => {
  // return <div className="flex flex-1 flex-col relative"></div>;
  const p = useGlobal(EDGlobal, "EDITOR");
  return (
    <div className="flex flex-1 relative overflow-auto">
      <div className="absolute inset-0 flex">
        <Vi
          meta={p.page.meta}
          api_url={p.site.config.api_url}
          site_id={p.site.id}
          entry={p.page.entry}
          api={p.script.api}
          db={p.script.db}
        />
      </div>
    </div>
  );
};

function setEndOfContenteditable(div: any) {
  let range: any, sel: any;
  if (document.createRange) {
    //Firefox, Chrome, Opera, Safari, IE 9+
    range = document.createRange();
    range.selectNodeContents(div);
    sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}
