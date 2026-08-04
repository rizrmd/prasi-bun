import { pack } from "msgpackr";
import { gzipSync } from "zlib";

const base = "https://mobile.medic-link.net";

async function dbs(table, action, params) {
  const body = gzipSync(pack({ name: "", action, table, params }));
  const r = await fetch(`${base}/_dbs/${encodeURIComponent(table)}`, {
    method: "POST",
    body,
  });
  return JSON.parse(await r.text());
}

const actions = await dbs("m_action", "findMany", [
  {
    where: { multiple_verification: true },
    select: {
      id: true,
      name: true,
      id_client: true,
      identifier: true,
      multiple_verification: true,
      has_score: true,
      has_score_option: true,
      show_on_menu: true,
    },
    orderBy: [{ id_client: "asc" }, { id: "asc" }],
  },
]);

console.log("count", Array.isArray(actions) ? actions.length : actions);
console.log(JSON.stringify(actions, null, 2));

// rolemap sample for one exam-like action
if (Array.isArray(actions) && actions[0]) {
  for (const a of actions.slice(0, 5)) {
    const roles = await dbs("m_action_rolemap", "findMany", [
      {
        where: { id_action: a.id },
        select: {
          id: true,
          type: true,
          m_action_role: { select: { id: true, role: true, identifier: true } },
        },
      },
    ]);
    console.log(
      "\nroles for",
      a.id,
      a.name,
      "client",
      a.id_client,
      "=>",
      JSON.stringify(roles)
    );
  }
}
