/**
 * Fix /admin/dashboard Section Local blank in editor.
 */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const PAGE_ID = "fb9c4b62-87fa-435f-9308-d80aab1420b0";
const ITEM_ID = "y8wmiuw9aimsmkcq1rfd3qnm";
const SITE_ID = "e46560e7-4114-44f3-93fa-b0cf89331f80";

function walk(node, fn) {
  if (!node || typeof node !== "object") return;
  fn(node);
  if (Array.isArray(node.childs)) node.childs.forEach((c) => walk(c, fn));
  if (node.component?.props) {
    for (const p of Object.values(node.component.props)) {
      if (p?.content) walk(p.content, fn);
    }
  }
}

function stripTs(src) {
  return src
    .replace(/\s+as\s+"loading"\s*\|\s*"ready"/g, "")
    .replace(/\s+as\s+number\s*\|\s*string/g, "")
    .replace(/\s+as\s+any/g, "")
    .replace(/\s+as\s+Record<\s*string\s*,\s*any\s*>/g, "");
}

const SAFE_PREAMBLE_JS = `
      const __sessUser =
        (typeof session !== "undefined" && session && session.user) ||
        (typeof user !== "undefined" && user) ||
        null;
      const __uid = Number(__sessUser && __sessUser.id) || 0;
      const __cid = Number(__sessUser && __sessUser.id_client) || 0;

      if (typeof isEditor !== "undefined" && isEditor) {
        local.status = "ready";
        local.render();
      } else {
        local.status = "loading";
        local.render();
      }

      if (!__uid || !__cid) {
        console.warn("[dashboard] skip data load - no session user", {
          __uid,
          __cid,
        });
        local.status = "ready";
        local.render();
        return;
      }
`;

const SAFE_PREAMBLE_BUILT = `
      const __sessUser=(typeof session!=="undefined"&&session&&session.user)||(typeof user!=="undefined"&&user)||null;
      const __uid=Number(__sessUser&&__sessUser.id)||0;
      const __cid=Number(__sessUser&&__sessUser.id_client)||0;
      if(typeof isEditor!=="undefined"&&isEditor){local.status="ready";local.render();}
      else{local.status="loading";local.render();}
      if(!__uid||!__cid){console.warn("[dashboard] skip data load - no session user",{__uid,__cid});local.status="ready";local.render();return;}
`;

function patchJs(js) {
  let s = stripTs(js);

  // Remove old status block at start of try, inject safe preamble once
  if (!s.includes("__sessUser")) {
    // After try {  (with optional dash-safe comment)
    s = s.replace(
      /(effect=\{async \(local\) => \{\s*\/\/local effect\s*(?:\/\*dash-safe\*\/\s*)?try \{\s*)([\s\S]*?)(const current_client\s*=)/,
      (match, start, mid, current) => {
        // drop mid status assignment if present
        return start + SAFE_PREAMBLE_JS + "\n      " + current;
      }
    );
  }

  s = s
    .replace(/session\.user\.id_client/g, "__cid")
    .replace(/session\.user\.id\b/g, "__uid");

  // Ensure catch exists
  if (!s.includes("Dashboard load error")) {
    // already has catch in source
  }

  // Guard array results from db-proxy
  s = s.replace(
    /if \(user\.length > 0\)/g,
    "if (Array.isArray(user) && user.length > 0)"
  );
  s = s.replace(
    /if \(action\.length > 0\)/g,
    "if (Array.isArray(action) && action.length > 0)"
  );
  s = s.replace(
    /if \(stage\.length > 0\)/g,
    "if (Array.isArray(stage) && stage.length > 0)"
  );
  s = s.replace(
    /if \(logbook\.length > 0\)/g,
    "if (Array.isArray(logbook) && logbook.length > 0)"
  );

  // cx safe
  s = s.replace(
    /className=\{cx\(props\.className,\s*""\)\}/g,
    'className={(typeof cx === "function" ? cx(props.className, "") : props?.className) || ""}'
  );

  return s;
}

function patchJsBuilt(built) {
  let s = built;

  if (!s.includes("__sessUser")) {
    // Match: effect: async (local) => {\n      //local effect\n\n      if (isEditor) {
    s = s.replace(
      /effect:\s*async\s*\(local\)\s*=>\s*\{\s*\/\/local effect\s*/,
      "effect: async (local) => {\n      //local effect\n      try {\n" +
        SAFE_PREAMBLE_BUILT
    );

    // Remove the original isEditor status block that follows preamble
    s = s.replace(
      /if\s*\(\s*isEditor\s*\)\s*\{\s*local\.status\s*=\s*"ready"\s*;\s*\}\s*else\s*\{\s*local\.status\s*=\s*"loading"\s*;\s*\}\s*local\.render\(\)\s*;\s*/g,
      ""
    );

    // Ensure closing catch before end of effect if we added try
    // Original jsBuilt may not have try/catch - add catch before effect end
    // Look for the final local.status = "ready"; local.render(); before effect closes
    if (!s.includes("Dashboard load error")) {
      // Find last occurrence of local.status = "ready"; local.render(); in effect
      // Wrap remaining body already has try from our inject - need catch before effect function ends
      // Pattern near end of effect: local.status = "ready";\n      local.render();\n    }}
      s = s.replace(
        /(local\.status\s*=\s*"ready"\s*;\s*local\.render\(\)\s*;)\s*(\}\s*,)/,
        `$1
      } catch (err) {
        console.error("Dashboard load error:", err);
        local.status = "ready";
        local.render();
      }
    $2`
      );
    }
  }

  s = s
    .replace(/session\.user\.id_client/g, "__cid")
    .replace(/session\.user\.id\b/g, "__uid");

  s = s.replace(
    /if\s*\(\s*user\.length\s*>\s*0\s*\)/g,
    "if (Array.isArray(user) && user.length > 0)"
  );
  s = s.replace(
    /if\s*\(\s*action\.length\s*>\s*0\s*\)/g,
    "if (Array.isArray(action) && action.length > 0)"
  );
  s = s.replace(
    /if\s*\(\s*stage\.length\s*>\s*0\s*\)/g,
    "if (Array.isArray(stage) && stage.length > 0)"
  );
  s = s.replace(
    /if\s*\(\s*logbook\.length\s*>\s*0\s*\)/g,
    "if (Array.isArray(logbook) && logbook.length > 0)"
  );

  s = s.replace(
    /className:\s*cx\(props\.className,\s*""\)/g,
    'className:(typeof cx==="function"?cx(props.className,""):(props&&props.className)||"")'
  );

  return s;
}

async function main() {
  const page = await prisma.page.findFirst({
    where: { id: PAGE_ID, id_site: SITE_ID },
  });
  if (!page) {
    console.error("page not found");
    process.exit(1);
  }

  const tree =
    typeof page.content_tree === "string"
      ? JSON.parse(page.content_tree)
      : page.content_tree;
  const root = tree.root || tree;

  let item = null;
  walk(root, (n) => {
    if (n.id === ITEM_ID) item = n;
  });
  if (!item?.adv) {
    console.error("item not found");
    process.exit(1);
  }

  const js0 = item.adv.js || "";
  const b0 = item.adv.jsBuilt || "";

  item.adv.js = patchJs(js0);
  item.adv.jsBuilt = patchJsBuilt(b0);

  // syntax check jsBuilt
  try {
    new Function(
      "React",
      "Local",
      "cx",
      "props",
      "children",
      "db",
      "session",
      "user",
      "isEditor",
      "render",
      item.adv.jsBuilt
    );
    console.log("jsBuilt syntax: OK");
  } catch (e) {
    console.error("jsBuilt syntax FAIL:", e.message);
    console.error("reverting built patch, only patch js");
    item.adv.jsBuilt = b0
      .replace(/session\.user\.id_client/g, "((session&&session.user&&session.user.id_client)||0)")
      .replace(/session\.user\.id\b/g, "((session&&session.user&&session.user.id)||0)");
    try {
      new Function(
        "React",
        "Local",
        "cx",
        "props",
        "children",
        "db",
        "session",
        "user",
        "isEditor",
        "render",
        item.adv.jsBuilt
      );
      console.log("fallback jsBuilt syntax: OK");
    } catch (e2) {
      console.error("fallback also fail", e2.message);
      process.exit(1);
    }
  }

  await prisma.page.update({
    where: { id: PAGE_ID },
    data: {
      content_tree: tree.root ? tree : root,
      updated_at: new Date(),
    },
  });

  console.log("Dashboard fixed");
  console.log("session.user left in built?", /session\.user\./.test(item.adv.jsBuilt));
  console.log("has __cid?", item.adv.jsBuilt.includes("__cid") || item.adv.jsBuilt.includes("session.user"));
  console.log("has skip?", item.adv.jsBuilt.includes("skip data load") || item.adv.js.includes("skip data load"));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
