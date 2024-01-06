import { FC, useEffect } from "react";
import { useLocal } from "web-utils";
import { FieldColorPicker } from "./FieldColorPopover";

export const color = {
  openedPopupID: {} as Record<string, boolean>,
  lastColorPicked: "",
};

export const FieldColor: FC<{
  popupID: string;
  value?: string;
  update: (value: string) => void;
  showHistory?: boolean;
}> = ({ value, update, showHistory = true, popupID }) => {
  if (!color.openedPopupID) color.openedPopupID = {};

  const local = useLocal({
    val: color.lastColorPicked || "",
  });

  useEffect(() => {
    if (value) {
      color.lastColorPicked = value;
    }
    local.val = value || "";

    local.render();
  }, [value]);

  const onOpen = () => {
    color.openedPopupID[popupID] = true;
    local.render();
  };

  const onClose = () => {
    delete color.openedPopupID[popupID];
    color.lastColorPicked = "";
    local.render();
  };

  if (typeof local.val === "string" && local.val.length > 10) {
    update("");
    return null;
  }

  return (
    <FieldColorPicker
      value={local.val}
      update={(val) => update(val)}
      onOpen={onOpen}
      onClose={onClose}
      open={color.openedPopupID[popupID]}
      showHistory={showHistory}
    >
      <div
        className={cx(
          css`
            background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>');
          `,
          "cursor-pointer"
        )}
      >
        <div
          className={cx(
            css`
              background: ${local.val};
              width: 30px;
              height: 20px;
            `,
            "color-box"
          )}
        ></div>
      </div>
    </FieldColorPicker>
  );
};
