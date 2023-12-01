import { NodeModel, RenderParams } from "@minoru/react-dnd-treeview";
import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal, EdMeta } from "../../../../logic/ed-global";

export const EdTreeName = ({
  node,
  prm,
}: {
  node: NodeModel<EdMeta>;
  prm: RenderParams;
}) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    rename: "",
  });
  useEffect(() => {
    local.rename = item?.name || "";
  }, [p.ui.tree.rename_id]);

  const item = node.data?.item;
  const mitem = node.data?.mitem;

  if (!item || !mitem) return <></>;
  const is_jsx_prop = !!node.data?.is_jsx_prop;

  const isRenaming = p.ui.tree.rename_id === item.id;
  return (
    <div className="text-[14px] relative flex flex-col justify-center cursor-pointer flex-1">
      {/* <div className="text-[10px]">{item.id}</div> */}

      {isRenaming ? (
        <input
          className={cx(
            "rename-item absolute inset-0 outline-none border border-blue-500 my-[2px] mr-[1px] px-1"
          )}
          autoFocus
          spellCheck={false}
          defaultValue={local.rename}
          onFocus={(e) => {
            e.currentTarget.select();
          }}
          onBlur={() => {
            item.name = local.rename;
            mitem.set("name", item.name);
            p.ui.tree.rename_id = "";
            p.render();
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Enter" || e.key === "Escape") {
              if (e.key === "Escape") {
                local.rename = item.name;
              } else {
                item.name = local.rename;
                mitem.set("name", item.name);
              }

              p.ui.tree.rename_id = "";
              p.render();
              setTimeout(() => {
                const el = document.querySelector(
                  `.tree-${item.id}`
                ) as HTMLInputElement;
                if (el) el.focus();
              });
            }
          }}
          onChange={(e) => {
            local.rename = e.target.value;
            p.render();
          }}
        />
      ) : (
        <div className="flex flex-col">
          <Name name={node.text} is_jsx_prop={is_jsx_prop} />
          {/* <div className={"text-[9px] text-gray-500 -mt-1"}>{node.id} - {item.originalId}</div> */}
        </div>
      )}
    </div>
  );
};

const Name: FC<{ name: string; is_jsx_prop: boolean }> = ({
  name,
  is_jsx_prop,
}) => {
  if (is_jsx_prop) {
    return (
      <div className="flex items-center space-x-1">
        <div className="flex text-purple-500 border border-purple-400 items-center justify-center font-mono text-[6px] px-[2px]">
          P
        </div>
        <div>{name}</div>
      </div>
    );
  }

  if (typeof name === "string" && name.startsWith("jsx:")) {
    return (
      <div className="flex items-center space-x-1">
        <div className="flex text-purple-500 space-x-[2px] border-r pr-1 items-center justify-center">
          <div
            dangerouslySetInnerHTML={{
              __html: `<svg width="9px" height="9px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
            }}
          ></div>
          <div className="font-mono text-[8px]">JSX</div>
        </div>
        <div>{name.substring(4)}</div>
      </div>
    );
  }

  if (typeof name === "string" && name.startsWith("jsx=")) {
    return (
      <div className="flex items-center space-x-1">
        <div
          className="flex text-purple-500 items-center"
          dangerouslySetInnerHTML={{
            __html: `<svg width="25px" viewBox="0 0 98 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M95 22L77.755 2H2V42H77.755L95 22Z" stroke="currentColor" stroke-width="4"/>
            <path d="M22.075 34.352C19.707 34.352 17.8296 33.7013 16.443 32.4C15.0776 31.0773 14.395 29.3067 14.395 27.088H18.395C18.395 28.2613 18.7256 29.1787 19.387 29.84C20.0483 30.5013 20.9443 30.832 22.075 30.832C23.2056 30.832 24.1016 30.512 24.763 29.872C25.4243 29.2107 25.755 28.2933 25.755 27.12V14.352H20.315V10.64H29.755V27.12C29.755 29.36 29.0616 31.1307 27.675 32.432C26.3096 33.712 24.443 34.352 22.075 34.352ZM42.2865 34.32C40.6865 34.32 39.2998 34.0533 38.1265 33.52C36.9531 32.9867 36.0465 32.2293 35.4065 31.248C34.7878 30.2453 34.4678 29.072 34.4465 27.728H38.4465C38.4465 28.688 38.7878 29.4453 39.4705 30C40.1745 30.5333 41.1238 30.8 42.3185 30.8C43.4705 30.8 44.3665 30.5333 45.0065 30C45.6678 29.4667 45.9985 28.7307 45.9985 27.792C45.9985 27.0027 45.7638 26.32 45.2945 25.744C44.8465 25.1467 44.1958 24.7413 43.3425 24.528L40.6545 23.792C38.8198 23.3227 37.4011 22.48 36.3985 21.264C35.4171 20.048 34.9265 18.576 34.9265 16.848C34.9265 15.5253 35.2251 14.3733 35.8225 13.392C36.4198 12.4107 37.2625 11.6533 38.3505 11.12C39.4598 10.5867 40.7611 10.32 42.2545 10.32C44.5158 10.32 46.3078 10.9067 47.6305 12.08C48.9531 13.232 49.6251 14.7893 49.6465 16.752H45.6465C45.6465 15.8347 45.3478 15.12 44.7505 14.608C44.1531 14.0747 43.3105 13.808 42.2225 13.808C41.1771 13.808 40.3665 14.0533 39.7905 14.544C39.2145 15.0347 38.9265 15.728 38.9265 16.624C38.9265 17.4347 39.1398 18.128 39.5665 18.704C40.0145 19.2587 40.6545 19.6533 41.4865 19.888L44.2705 20.656C46.1265 21.1253 47.5451 21.968 48.5265 23.184C49.5078 24.3787 49.9985 25.8613 49.9985 27.632C49.9985 28.9547 49.6785 30.128 49.0385 31.152C48.3985 32.1547 47.5025 32.9333 46.3505 33.488C45.1985 34.0427 43.8438 34.32 42.2865 34.32ZM52.706 34L59.17 22.032L53.09 10.64H57.57L60.514 16.496C60.7273 16.9227 60.9193 17.3387 61.09 17.744C61.2606 18.128 61.3886 18.4267 61.474 18.64C61.538 18.4267 61.6553 18.128 61.826 17.744C61.9966 17.3387 62.1886 16.9227 62.402 16.496L65.378 10.64H69.73L63.65 21.936L70.114 34H65.634L62.338 27.536C62.1246 27.1093 61.922 26.6933 61.73 26.288C61.5593 25.8827 61.4313 25.5627 61.346 25.328C61.2606 25.5627 61.1326 25.8827 60.962 26.288C60.7913 26.6933 60.5993 27.1093 60.386 27.536L57.058 34H52.706Z" fill="currentColor"/>
            </svg>
            `,
          }}
        ></div>
        <div>{name.substring(4)}</div>
      </div>
    );
  }
  return <div>{name}</div>;
};
