import { useGlobal } from "web-utils";
import { Tooltip } from "../../../../../utils/ui/tooltip";
import { EDGlobal } from "../../../logic/ed-global";
import {
    iconHourglass,
    iconRebuildLarge
} from "../../popup/code/icons";

export const EdRebuildJs = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  return (
    <Tooltip
      content="Rebuild"
      delay={0}
      placement="bottom"
      className={cx("flex items-stretch relative")}
      onClick={async () => {
        p.ui.popup.code.rebuilding = true;
        p.render();

        await _api.rebuild(p.site.id);

        alert("Rebuild Done");

        p.ui.popup.code.rebuilding = false;
        p.render();
      }}
    >
      <div
        className={cx(
          "flex text-center items-center cursor-pointer px-[5px] transition-all",
          "rounded",
          p.ui.popup.code.rebuilding
            ? "bg-blue-600 text-white"
            : "hover:bg-blue-50"
        )}
        dangerouslySetInnerHTML={{
          __html: !p.ui.popup.code.rebuilding
            ? iconRebuildLarge
            : iconHourglass,
        }}
      ></div>
    </Tooltip>
  );
};
