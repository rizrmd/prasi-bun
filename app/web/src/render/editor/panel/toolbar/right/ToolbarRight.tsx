import { useGlobal, useLocal } from "web-utils";
import { Popover } from "../../../../../utils/ui/popover";
import { EditorGlobal } from "../../../logic/global";
import { ResponsiveToggle } from "./ResponsiveToggle";
import { AutoHeightTextarea } from "../../../../../utils/ui/auto-textarea";
import { ToolbarBox } from "../../../../../utils/ui/box";
import { Tooltip } from "../../../../../utils/ui/tooltip";

export const ToolbarRight = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({ pingOpen: false });

  return (
    <div className={cx("toolbar-right", "flex mr-2")}>
      <Tooltip
        className="flex items-center mr-2"
        open={local.pingOpen}
        onOpenChange={(open) => {
          local.pingOpen = open;
          local.render();
        }}
        content={p.wsPing < 0 ? `Disconnected` : `Ping: ${p.wsPing}ms`}
        placement="left"
      >
        <div
          className={cx(
            "cursor-pointer p-[1px] border rounded-sm flex items-center justify-center"
          )}
          onClick={() => {
            local.pingOpen = true;
            local.render();
          }}
        >
          {p.wsPing < 0 && (
            <div className="bg-red-500 w-[10px] h-[10px] rounded-sm"></div>
          )}

          {p.wsPing <= 250 && p.wsPing >= 0 && (
            <div className="bg-green-500 w-[10px] h-[10px] rounded-sm"></div>
          )}

          {p.wsPing > 250 && p.wsPing < 1000 && (
            <div className="bg-orange-300 w-[10px] h-[10px] rounded-sm"></div>
          )}

          {p.wsPing >= 1000 && (
            <div className="bg-red-500 w-[10px] h-[10px] rounded-sm"></div>
          )}
        </div>
      </Tooltip>
      <ToolbarBox
        items={[
          {
            content: "Preview",
            onClick: () => {
              window.open(
                `${location.protocol}//${location.host}/live/${p.site.id}/${p.page?.id}`,
                "_blank"
              );
            },
          },
          {
            content: (
              <Popover
                autoFocus={false}
                backdrop={false}
                popoverClassName="bg-white"
                placement="bottom"
                content={
                  <AutoHeightTextarea
                    className="p-2 border border-blue-500  font-mono text-[11px] w-[300px] outline-none"
                    autoFocus
                    spellCheck={false}
                    onFocus={(e) => {
                      e.currentTarget.select();
                    }}
                    value={`${location.protocol}//${location.host}/live/${p.site.id}/${p.page?.id}`}
                  />
                }
              >
                <URLIcon />
              </Popover>
            ),
          },
        ]}
        className={cx(css`
          margin-right: 5px !important;
        `)}
      />
      {p.site.responsive === "all" && <ResponsiveToggle />}
    </div>
  );
};

const URLIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="13"
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8.512 3.005c.676-.46 1.531-.468 2.167-.05.144.094.298.244.71.656.412.412.562.566.657.71.417.636.408 1.49-.051 2.167-.105.155-.267.32-.694.747l-.62.619a.5.5 0 00.708.707l.619-.619.043-.043c.37-.37.606-.606.771-.849.675-.994.71-2.287.06-3.278-.159-.241-.39-.472-.741-.823l-.045-.045-.044-.045c-.352-.351-.583-.582-.824-.74-.99-.65-2.284-.616-3.278.06-.243.164-.48.4-.85.77l-.042.043-.619.62a.5.5 0 10.707.706l.62-.618c.426-.427.592-.59.746-.695zM4.318 7.147a.5.5 0 00-.707-.707l-.619.618-.043.043c-.37.37-.606.606-.771.85-.675.993-.71 2.287-.06 3.277.159.242.39.473.741.824l.045.045.044.044c.352.351.583.583.824.741.99.65 2.284.616 3.278-.06.243-.165.48-.401.849-.771l.043-.043.619-.619a.5.5 0 10-.708-.707l-.618.619c-.427.427-.593.59-.747.694-.676.46-1.532.469-2.167.051-.144-.094-.298-.245-.71-.657-.412-.412-.562-.566-.657-.71-.417-.635-.408-1.49.051-2.167.105-.154.267-.32.694-.747l.619-.618zm5.304-1.061a.5.5 0 00-.707-.708L5.379 8.914a.5.5 0 10.707.707l3.536-3.535z"
      clipRule="evenodd"
    ></path>
  </svg>
);
