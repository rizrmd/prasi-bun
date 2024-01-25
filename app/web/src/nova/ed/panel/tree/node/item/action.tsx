import { NodeModel, RenderParams } from "@minoru/react-dnd-treeview";
import { useGlobal } from "web-utils";
import { Tooltip } from "../../../../../../utils/ui/tooltip";
import { EDGlobal, IMeta, active } from "../../../../logic/ed-global";
import { getMetaById } from "../../../../logic/active/get-meta";
import { treeRebuild } from "../../../../logic/tree/build";

export const EdTreeAction = ({
  node,
  prm,
}: {
  node: NodeModel<IMeta>;
  prm: RenderParams;
}) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const item = node.data?.item;
  if (!item) return null;
  const comp = {
    enabled: item.type === "item" && !!item.component?.id,
    id: item.type === "item" && item.component ? item.component.id : "",
  };

  let mode = "";
  if (item.adv?.js) mode = "js";
  if (!mode && item.adv?.css) mode = "css";
  if (!mode && item.adv?.html) mode = "html";

  return (
    <div className="flex items-center pr-1 space-x-1">
      {item.hidden === "all" && (
        <Tooltip content="Hidden: All">
          <div
            className="mx-1 cursor-pointer hover:opacity-60"
            onClick={(e) => {
              e.stopPropagation();
              const meta = getMetaById(p, item.id);
              if (meta) meta.mitem?.set("hidden", false);
            }}
          >
            <HideAll />
          </div>
        </Tooltip>
      )}
      {item.hidden === "only-editor" && (
        <Tooltip content="Hidden: Only Editor">
          <div
            className="mx-1 cursor-pointer hover:opacity-60"
            onClick={(e) => {
              e.stopPropagation();
              const meta = getMetaById(p, item.id);
              if (meta) meta.mitem?.set("hidden", "all");
            }}
          >
            <HideEditor />
          </div>
        </Tooltip>
      )}

      {(!comp.enabled || (comp.enabled && comp.id === active.comp_id)) && (
        <Tooltip
          content={`Edit ${mode}`}
          className={cx(
            "border rounded-sm text-[9px] flex w-[20px] h-[15px] items-center cursor-pointer justify-center uppercase",
            item.adv?.js || item.adv?.css || item.adv?.html
              ? `opacity-100`
              : cx(
                  `opacity-0 action-script transition-all`,
                  css`
                    &:hover {
                      opacity: 1 !important;
                    }
                  `
                ),
            !(item.adv?.js || item.adv?.css || item.adv?.html) &&
              `bg-orange-100  border-orange-200 hover:border-orange-500 hover:text-orange-900 hover:bg-orange-300`,
            mode === "js" &&
              `bg-orange-100  border-orange-200 hover:border-orange-500 hover:text-orange-900 hover:bg-orange-300`,
            mode === "css" &&
              `bg-green-100  border-green-200 hover:border-green-500 hover:text-green-900 hover:bg-green-300`,
            mode === "html" &&
              `bg-blue-100  border-blue-200 hover:border-blue-500 hover:text-blue-900 hover:bg-blue-300`
          )}
          onClick={() => {
            p.ui.popup.script.open = true;
            p.ui.popup.script.type = "item";
            p.ui.popup.script.mode = (mode || "js") as any;
            p.render();
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: `<svg width="12px" height="12px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.96424 2.68571C10.0668 2.42931 9.94209 2.13833 9.6857 2.03577C9.4293 1.93322 9.13832 2.05792 9.03576 2.31432L5.03576 12.3143C4.9332 12.5707 5.05791 12.8617 5.3143 12.9642C5.5707 13.0668 5.86168 12.9421 5.96424 12.6857L9.96424 2.68571ZM3.85355 5.14646C4.04882 5.34172 4.04882 5.6583 3.85355 5.85356L2.20711 7.50001L3.85355 9.14646C4.04882 9.34172 4.04882 9.6583 3.85355 9.85356C3.65829 10.0488 3.34171 10.0488 3.14645 9.85356L1.14645 7.85356C0.951184 7.6583 0.951184 7.34172 1.14645 7.14646L3.14645 5.14646C3.34171 4.9512 3.65829 4.9512 3.85355 5.14646ZM11.1464 5.14646C11.3417 4.9512 11.6583 4.9512 11.8536 5.14646L13.8536 7.14646C14.0488 7.34172 14.0488 7.6583 13.8536 7.85356L11.8536 9.85356C11.6583 10.0488 11.3417 10.0488 11.1464 9.85356C10.9512 9.6583 10.9512 9.34172 11.1464 9.14646L12.7929 7.50001L11.1464 5.85356C10.9512 5.6583 10.9512 5.34172 11.1464 5.14646Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
            }}
          ></div>
        </Tooltip>
      )}

      {comp.enabled && (
        <>
          {comp.id !== active.comp_id && p.ui.comp_editable && (
            <Tooltip content="Edit Component">
              <div
                className="flex items-center border border-slate-500 bg-white rounded-sm text-[10px] px-[2px] cursor-pointer hover:bg-purple-100 hover:border-purple-600"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  const comp_id = comp.id;
                  if (comp_id) {
                    active.instance.item_id = item.id;
                    active.instance.comp_id = active.comp_id;

                    active.comp_id = comp_id || "";
                    const root = p.comp.list[comp_id].tree.find(
                      (e) => e.parent === "root"
                    );
                    if (root && typeof root.id === "string") {
                      active.item_id = root.id || "";
                    }

                    p.render();
                  }
                }}
              >
                Edit
              </div>
            </Tooltip>
          )}
          {comp.id === active.comp_id && (
            <>
              <Tooltip content="Close Component">
                <div
                  className="flex items-center border border-slate-500 bg-white rounded-sm text-[10px] px-[2px] cursor-pointer hover:bg-purple-100 hover:border-purple-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    if (active.comp_id) {
                      active.comp_id = active.instance.comp_id || "";
                      active.item_id = active.instance.item_id || "";
                      active.instance.comp_id = "";
                      active.instance.item_id = "";
                      treeRebuild(p);
                      p.render();
                    }
                  }}
                >
                  Close
                </div>
              </Tooltip>
            </>
          )}
        </>
      )}
    </div>
  );
};

const HideEditor = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.7649 6.07596C14.9991 6.22231 15.0703 6.53079 14.9239 6.76495C14.4849 7.46743 13.9632 8.10645 13.3702 8.66305L14.5712 9.86406C14.7664 10.0593 14.7664 10.3759 14.5712 10.5712C14.3759 10.7664 14.0593 10.7664 13.8641 10.5712L12.6011 9.30817C11.805 9.90283 10.9089 10.3621 9.93375 10.651L10.383 12.3277C10.4544 12.5944 10.2961 12.8685 10.0294 12.94C9.76267 13.0115 9.4885 12.8532 9.41704 12.5865L8.95917 10.8775C8.48743 10.958 8.00036 10.9999 7.50001 10.9999C6.99965 10.9999 6.51257 10.958 6.04082 10.8775L5.58299 12.5864C5.51153 12.8532 5.23737 13.0115 4.97064 12.94C4.7039 12.8686 4.5456 12.5944 4.61706 12.3277L5.06625 10.651C4.09111 10.3621 3.19503 9.90282 2.3989 9.30815L1.1359 10.5712C0.940638 10.7664 0.624058 10.7664 0.428798 10.5712C0.233537 10.3759 0.233537 10.0593 0.428798 9.86405L1.62982 8.66303C1.03682 8.10643 0.515113 7.46742 0.0760677 6.76495C-0.0702867 6.53079 0.000898544 6.22231 0.235065 6.07596C0.469231 5.9296 0.777703 6.00079 0.924058 6.23496C1.40354 7.00213 1.989 7.68057 2.66233 8.2427C2.67315 8.25096 2.6837 8.25972 2.69397 8.26898C4.00897 9.35527 5.65537 9.99991 7.50001 9.99991C10.3078 9.99991 12.6564 8.5063 14.076 6.23495C14.2223 6.00079 14.5308 5.9296 14.7649 6.07596Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);

const HideAll = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);
