import { FC, Suspense } from "react";
import { useGlobal } from "web-utils";
import { IMeta } from "../ed/logic/ed-global";
import { viLoad } from "./load/load";
import { ViGlobal } from "./render/global";
import { ViRoot } from "./root";
import { ErrorBox } from "./utils/error-box";

export const Vi: FC<{
  meta: Record<string, IMeta>;
  entry: string[];
  api_url: string;
  site_id: string;
}> = ({ meta, entry, api_url, site_id }) => {
  const vi = useGlobal(ViGlobal, "VI");
  if (vi.meta !== meta) {
    vi.meta = meta;
  }

  if (vi.status === "init") {
    viLoad(vi, { api_url, site_id });
  }

  return (
    <ErrorBox>
      <Suspense>
        <ViRoot entry={entry} />
      </Suspense>
    </ErrorBox>
  );
};
