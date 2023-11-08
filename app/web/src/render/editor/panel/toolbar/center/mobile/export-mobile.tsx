import { useLocal } from "web-utils";
import { ExportMobileConfig, ExportMobileSetting } from "./config";

export const ExportMobile = () => {
  const local = useLocal({
    config: null as null | ExportMobileConfig,
  });
  return (
    <div className="w-[450px] min-h-[200px] text-sm flex flex-col">
      <ExportMobileSetting
        onLoad={async (conf) => {
          local.config = conf;
          local.render();
        }}
      />
    </div>
  );
};
