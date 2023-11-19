import { useGlobal } from "web-utils";
import { Loading } from "../../../../utils/ui/loading";
import { View } from "../../../view/view";
import { EDGlobal } from "../../logic/ed-global";

export const EdMain = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  return (
    <div className="flex flex-1 relative">
      {!!p.page.building && <Loading backdrop={false} />}
      {!p.page.building && (
        <View
          load={{
            mode: "tree_meta",
            meta: p.page.meta,
            entry: p.page.entry,
          }}
        />
      )}
    </div>
  );
};
