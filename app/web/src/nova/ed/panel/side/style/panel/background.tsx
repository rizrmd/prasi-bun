import { FC } from "react";
import { useLocal } from "web-utils";
import { IItem } from "../../../../../../utils/types/item";
import { FNBackground } from "../../../../../../utils/types/meta-fn";
import { ISection } from "../../../../../../utils/types/section";
import { IText } from "../../../../../../utils/types/text";
import { Dropdown } from "../../../../../../utils/ui/dropdown";
import { Tooltip } from "../../../../../../utils/ui/tooltip";
import { responsiveVal } from "../tools/responsive-val";
import { FieldColor } from "../ui/FieldColor";
import { dropdownProp } from "../ui/style";

type BackgroundUpdate = {
  bg: FNBackground;
};
export const PanelBackground: FC<{
  value: ISection | IItem | IText;
  mode: "desktop" | "mobile";
  update: <T extends keyof BackgroundUpdate>(
    key: T,
    val: BackgroundUpdate[T]
  ) => void;
}> = ({ value, update, mode }) => {
  const local = useLocal({ colorOpen: false });

  const bg = responsiveVal<FNBackground>(value, "bg", mode, {
    size: "cover",
    pos: "center",
  });

  return (
    <div className="flex flex-col space-y-2">
      <div className={cx("flex items-stretch space-x-2 text-xs ")}>
        <Tooltip asChild content={"Background Color"}>
          <div
            className={cx(
              "bg-white p-[2px] border border-gray-300 flex items-stretch",
              css`
                .color-box {
                  height: 25px !important;
                }
              `
            )}
          >
            <FieldColor
              popupID="bg-color"
              value={bg.color}
              update={(color) => {
                update("bg", { ...bg, color });
              }}
            />
          </div>
        </Tooltip>
        <Tooltip
          content={"Background Size"}
          className={css`
            .dropdown {
              max-width: 90px;
              overflow: hidden;
            }
          `}
        >
          <Dropdown
            {...dropdownProp}
            value={bg.size}
            items={[
              { value: "cover", label: "Cover" },
              { value: "contain", label: "Contain" },
              { value: "full", label: "Full" },
              { value: "auto", label: "Auto" },
            ]}
            onChange={(val) => {
              update("bg", { ...bg, size: val as any });
            }}
          />
        </Tooltip>
        <Tooltip
          content={"Background Position"}
          className={css`
            .dropdown {
              max-width: 90px;
              overflow: hidden;
            }
          `}
        >
          <Dropdown
            {...dropdownProp}
            value={bg.pos}
            items={[
              { value: "top", label: "Top" },
              { value: "center", label: "Center" },
              { value: "bottom", label: "Bottom" },
              { value: "right", label: "Right" },
              { value: "left", label: "Left" },
            ]}
            onChange={(val) => {
              update("bg", { ...bg, pos: val as any });
            }}
          />
        </Tooltip>
      </div>
    </div>
  );
};

const getImgMeta = (url: string) => {
  return new Promise<null | HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => {
      console.error(err, url);
      resolve(null);
    };
    img.src = url;
  });
};
