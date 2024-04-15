import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { IItem } from "../../../../../../utils/types/item";
import { ISection } from "../../../../../../utils/types/section";
import { IText } from "../../../../../../utils/types/text";
import { Popover } from "../../../../../../utils/ui/popover";
import { EDGlobal } from "../../../../logic/ed-global";
import { SimpleMonaco } from "../../simple-monaco";
import { Button } from "../ui/Button";

export const PanelAdv: FC<{
  value: ISection | IItem | IText;
  mode: "desktop" | "mobile";
  update: <T extends "typings">(key: T, val: string) => void;
}> = ({ value, update }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({ openTypings: false, typings: "" });
  return (
    <>
      <div
        className={cx(
          "flex items-stretch justify-between space-x-2",
          css`
            button {
              min-width: 0px;
            }
          `
        )}
      >
        <Popover
          content={
            <div
              className={cx(css`
                width: 700px;
                height: 500px;
                margin: 5px 0px;
              `)}
            >
              <SimpleMonaco
                onChange={(value) => {
                  local.typings = value;
                  local.render();
                }}
                value={local.typings}
                lang="typescript"
              />
            </div>
          }
          open={local.openTypings}
          onOpenChange={(open) => {
            try {
              if (open) {
                local.typings =
                  value.typings ||
                  `\
const typings = {
  _raw: {
  }
}`;
              } else {
                update("typings", local.typings);
              }
            } catch (e) {
              console.log(e);
            }
            local.openTypings = open;
            local.render();
          }}
          className={cx(
            "bg-white p-[2px] border flex flex-1 border-gray-300",
            css`
              > * {
                flex: 1;
              }
            `
          )}
        >
          <Button
            onClick={() => {
              p.render();
            }}
            appearance="subtle"
          >
            Typings
          </Button>
        </Popover>
      </div>
    </>
  );
};
