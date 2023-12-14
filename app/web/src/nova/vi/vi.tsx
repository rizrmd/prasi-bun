import { FC, Suspense } from "react";
import { useGlobal } from "web-utils";
import { IMeta } from "../ed/logic/ed-global";
import { viLoad } from "./load/load";
import { VG, ViGlobal } from "./render/global";
import { ViRoot } from "./root";
import { ErrorBox } from "./utils/error-box";
import { viParts } from "./render/parts";

export const Vi: FC<{
  meta: Record<string, IMeta>;
  entry: string[];
  api_url: string;
  site_id: string;
  api?: any;
  db?: any;
  visit?: VG["visit"];
}> = ({ meta, entry, api_url, site_id, api, db, visit }) => {
  const vi = useGlobal(ViGlobal, "VI");
  if (vi.meta !== meta) {
    vi.meta = meta;
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
