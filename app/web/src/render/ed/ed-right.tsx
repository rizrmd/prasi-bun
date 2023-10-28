import { useGlobal } from "web-utils";
import { EDGlobal } from "./logic/ed-global";

export const EdRight = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  return (
    <div
      className={cx(
        css`
          width: ${p.ui.layout.right}px;
        `,
        "border-l"
      )}
    >
      
    </div>
  );
};
