import { FC, Suspense } from "react";
import { useGlobal } from "web-utils";
import { IMeta } from "../ed/logic/ed-global";
import { viLoad } from "./load/load";
import { VG, ViGlobal } from "./render/global";
import { ViRoot } from "./root";
import { ErrorBox } from "./utils/error-box";

export const Vi: FC<{
  meta: Record<string, IMeta>;
  comp_load?: (comp_id: string) => Promise<void>;
  entry: string[];
  api_url: string;
  site_id: string;
  page_id: string;
  api?: any;
  db?: any;
  script?: { init_local_effect: Record<string, boolean> };
  visit?: VG["visit"];
}> = ({ meta, entry, api_url, site_id, api, db, visit, script }) => {
  const vi = useGlobal(ViGlobal, "VI");

  if (vi.meta !== meta) {
    vi.meta = meta;
  }
  if (script) {
    vi.script.init_local_effect = script.init_local_effect;
  }
  vi.visit = visit;

  if (vi.status === "init") {
    vi.site.db = db;
    vi.site.api = api;
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
