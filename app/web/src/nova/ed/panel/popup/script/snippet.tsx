import { FC } from "react";
import { Button } from "../../../../../utils/ui/form/Button";
import { useGlobal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";

export const EdScriptSnippet: FC<{}> = ({}) => {
  const p = useGlobal(EDGlobal, "EDITOR");

  const btn_style = css`
    width: auto !important;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 12px;
  `;
  return (
    <div className="flex items-center space-x-1 pl-2 border-l">
      <Button
        className={cx(btn_style)}
        onClick={() => {
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
      </Button>{" "}
      <Button
        className={cx(btn_style)}
        onClick={() => {
          p.script.do_edit(
            `\
<PassProp key={0} children={children} />
    `,
            false
          );
        }}
      >
        &lt;PassProp/&gt;
      </Button>
      <Button
        className={cx(btn_style)}
        onClick={() => {
          p.script.do_edit(
            `\
<div {...props}>
{(local.list || []).map((item, idx) => (
<Fragment key={idx}>
  <PassProp item={item} children={children} />
</Fragment>
))}
</div>   
`,
            true
          );
        }}
      >
        &lt;Map /&gt;
      </Button>
      <Button
        className={cx(btn_style)}
        onClick={() => {
          p.script.do_edit(
            `\
<>{true && <div {...props}>{children}</div>}</>   
`,
            true
          );
        }}
      >
        &lt;If /&gt;
      </Button>
      <Button
        className={cx(btn_style)}
        onClick={() => {
          p.script.do_edit(
            `\
<>
{
/**if condition */
true ? (
/** then  */
<div {...props}>{children}</div>
) : (
/** else  */
<div {...props}>ELSE CONDITION</div>
)
}
</>
`,
            true
          );
        }}
      >
        &lt;If Else /&gt;
      </Button>
    </div>
  );
};
