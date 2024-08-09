import { useGlobal } from "web-utils";
import { Tooltip } from "../../../../../utils/ui/tooltip";
import { EDGlobal } from "../../../logic/ed-global";
import {
  iconHourglass,
  iconRebuildLarge,
  iconWarning,
} from "../../popup/code/icons";

export const EdRebuildJs = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  return (
    <Tooltip
      content={
        <>
          {p.ui.build.status === "ready" ? (
            "Rebuild"
          ) : (
            <div className="text-red-500">
              Code Error, please see index.log. <br />
              Press this button to force rebuild.
            </div>
          )}
        </>
      }
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
            : "hover:bg-blue-50",
          p.ui.build.status === "error" && "text-red-500"
        )}
        dangerouslySetInnerHTML={{
          __html:
            !p.ui.popup.code.rebuilding && p.ui.build.status !== "loading"
              ? p.ui.build.status === "ready"
                ? iconRebuildLarge
                : iconWarning
              : iconHourglass,
        }}
      ></div>
    </Tooltip>
  );
};
