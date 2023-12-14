import { FC } from "react";
import { Button } from "../../../../../utils/ui/form/Button";
import { useGlobal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";

export const EdScriptSnippet: FC<{}> = ({}) => {
  const p = useGlobal(EDGlobal, "EDITOR");

  return (
    <div className="flex items-center space-x-1 pl-2 border-l">
      <Button
        className={cx(css`
          width: auto !important;
          padding-left: 5px;
          padding-right: 5px;
          font-size: 12px;
        `)}
        onClick={() => {
          console.log(p.script.do_edit);
          p.script.do_edit(
            `\
<div {...props}>
<Local
name="local"
value={
{
//local object
}
}
effect={async (local) => {
//local effect
}}
>
{children}
</Local>
</div>
    `,
            true
          );
        }}
      >
        &lt;Local/&gt;
      </Button>
    </div>
  );
};
