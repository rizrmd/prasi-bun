import { FC, Suspense } from "react";
import { useGlobal } from "web-utils";
import { IMeta } from "../ed/logic/ed-global";
import { viLoad } from "./load/load";
import { VG, ViGlobal } from "./render/global";
import { ViRoot } from "./root";
import { ErrorBox } from "./utils/error-box";
import { render_stat } from "./render/render";

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
  render_stat?: "enabled" | "disabled";
  onStatusChanged?: (status: VG["status"]) => void;
}> = ({
  meta,
  entry,
  api_url,
  site_id,
  api,
  db,
  visit,
  script,
  render_stat: rs,
  onStatusChanged,
}) => {
  const vi = useGlobal(ViGlobal, "VI");
  vi.on_status_changes = onStatusChanged;

  if (rs === "disabled") {
    render_stat.enabled = false;
  }

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
