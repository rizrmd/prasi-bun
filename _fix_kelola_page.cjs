/**
 * Fix staff-pengajar/home/kelola page that renders blank:
 * - wrap m_user_action in try/catch
 * - fix root path /ppds/home → /staff-pengajar/home
 * - ensure load() returns actions (not empty {})
 * - fix title-back url prop
 */
const { PrismaClient } = require("@prisma/client");

const PAGE_ID = "b99f7582-7023-4ccf-ae2f-7e3a515b32fa";
const SITE_ID = "2512068e-fd68-44f5-9700-5153ccecf6a5";

const prisma = new PrismaClient();

function walk(node, fn, path = "root") {
  if (!node || typeof node !== "object") return;
  fn(node, path);
  if (Array.isArray(node.childs)) {
    node.childs.forEach((c, i) => walk(c, fn, `${path}/child[${i}]`));
  }
  if (node.component?.props) {
    for (const [k, p] of Object.entries(node.component.props)) {
      if (p && p.content) walk(p.content, fn, `${path}/prop:${k}`);
    }
  }
}

function fixPage(root) {
  let fixes = [];

  walk(root, (node) => {
    // Fix body Local effect
    if (node.name === "body" && node.adv?.js && node.adv.js.includes("m_user_action")) {
      const newJs = `<div {...props}>
  <Local
    name="local"
    value={{
      id_hide: [],
    }}
    effect={async (local) => {
      try {
        sessionStorage.setItem("previousPage", window.location.href);
        sessionStorage.setItem("root", "/staff-pengajar/home");
        if (typeof auditTrail === "function") {
          try {
            auditTrail({
              type: "visit",
              activity: "Membuka Halaman Kelola Shortcut",
              meta: { url: window.location.href },
            });
          } catch (_) {}
        }
        let hide_menu = [];
        try {
          hide_menu = await db.m_user_action.findMany({
            where: {
              id_user: Number(user?.id),
              id_client: Number(user?.id_client),
            },
            select: { id: true, id_action_hidden: true },
          });
        } catch (e) {
          console.warn("[kelola] m_user_action load failed", e);
          hide_menu = [];
        }
        local.id_hide = (hide_menu || [])
          .map((item) => item.id_action_hidden)
          .filter((x) => x != null);
        local.render();
      } catch (e) {
        console.warn("[kelola] body effect failed", e);
        local.id_hide = local.id_hide || [];
        local.render();
      }
    }}
  >
    {children}
  </Local>
</div>`;

      const newJsBuilt = `render(React.createElement("div",{...props},React.createElement(Local,{name:"local",value:{id_hide:[]},effect:async e=>{try{sessionStorage.setItem("previousPage",window.location.href),sessionStorage.setItem("root","/staff-pengajar/home");try{typeof auditTrail=="function"&&auditTrail({type:"visit",activity:"Membuka Halaman Kelola Shortcut",meta:{url:window.location.href}})}catch{}let i=[];try{i=await db.m_user_action.findMany({where:{id_user:Number(user?.id),id_client:Number(user?.id_client)},select:{id:!0,id_action_hidden:!0}})}catch(o){console.warn("[kelola] m_user_action load failed",o),i=[]}e.id_hide=(i||[]).map(o=>o.id_action_hidden).filter(o=>o!=null),e.render()}catch(o){console.warn("[kelola] body effect failed",o),e.id_hide=e.id_hide||[],e.render()}},children})));`;

      node.adv.js = newJs;
      node.adv.jsBuilt = newJsBuilt;
      fixes.push("body effect try/catch + root path");
    }

    // Fix item navigate_link from ppds to staff form if needed
    if (node.adv?.js && node.adv.js.includes("`/ppds/action/${item.id}`")) {
      node.adv.js = node.adv.js.replace(
        "`/ppds/action/${item.id}`",
        "`/form/staff/action/${item.id}-0`"
      );
      if (node.adv.jsBuilt) {
        node.adv.jsBuilt = node.adv.jsBuilt.replace(
          "`/ppds/action/${item.id}`",
          "`/form/staff/action/${item.id}-0`"
        );
      }
      fixes.push("item navigate_link staff path");
    }
  });

  // Fix component props on title-back: url /ppds/home → /staff-pengajar/home
  walk(root, (node) => {
    if (node.component?.props?.url) {
      const u = node.component.props.url;
      if (typeof u.value === "string" && u.value.includes("/ppds/home")) {
        u.value = u.value.replace(/\/ppds\/home/g, "/staff-pengajar/home");
        if (u.valueBuilt)
          u.valueBuilt = u.valueBuilt.replace(
            /\/ppds\/home/g,
            "/staff-pengajar/home"
          );
        fixes.push("title-back url → staff-pengajar/home");
      }
    }
  });

  // Fix loader load() that returns {} — copy sample query into load
  walk(root, (node) => {
    if (node.name !== "loader" && node.name !== "local") return;
    const props = node.component?.props;
    if (!props?.load || !props?.sample) return;

    const loadVal = String(props.load.value || "");
    const sampleVal = String(props.sample.value || "");

    if (
      (loadVal.includes("return {}") || loadVal.includes("return{};")) &&
      sampleVal.includes("m_action.findMany")
    ) {
      // Use sample query as load, with Number() for id_client safety
      const fixed = `async () => {
  let actions = await db.m_action.findMany({
    select: { id: true, name: true, m_action_type: true },
    orderBy: { m_action_type: { id: "asc" } },
    where: {
      id_client: Number(user.id_client),
      show_on_menu: true,
    },
  });
  return { actions: actions || [] };
}`;
      const fixedBuilt = ` async()=>{let a=await db.m_action.findMany({select:{id:!0,name:!0,m_action_type:!0},orderBy:{m_action_type:{id:"asc"}},where:{id_client:Number(user.id_client),show_on_menu:!0}});return{actions:a||[]}};`;
      props.load.value = fixed;
      props.load.valueBuilt = fixedBuilt;
      // mode should be load not sample for clarity
      if (props.mode) {
        props.mode.value = '"load"';
        props.mode.valueBuilt = '"load";\n';
      }
      fixes.push("loader load() real m_action query");
    }
  });

  // Global replace leftover session root ppds
  const json = JSON.stringify(root);
  if (json.includes('sessionStorage.setItem(\\"root\\", \\"/ppds/home\\")') ||
      json.includes('sessionStorage.setItem("root","/ppds/home")') ||
      json.includes('"/ppds/home"')) {
    // already handled body; other string leftovers in value props
  }

  return fixes;
}

async function main() {
  const page = await prisma.page.findFirst({
    where: { id: PAGE_ID, id_site: SITE_ID },
  });
  if (!page) {
    console.error("page not found", PAGE_ID);
    process.exit(1);
  }

  const tree =
    typeof page.content_tree === "string"
      ? JSON.parse(page.content_tree)
      : page.content_tree;

  // content_tree might be the root itself or { root: ... }
  const root = tree.root ? tree.root : tree;
  const fixes = fixPage(root);

  // Also string-replace remaining /ppds/home in serialized props that are back-links only for title
  let serialized = JSON.stringify(tree);
  const before = serialized;
  // Don't replace all ppds paths blindly - only sessionStorage root leftovers
  serialized = serialized
    .replace(
      /sessionStorage\.setItem\(\\?"root\\?",\s*\\?"\/ppds\/home\\?"\)/g,
      'sessionStorage.setItem("root","/staff-pengajar/home")'
    )
    .replace(
      /sessionStorage\.setItem\("root","\/ppds\/home"\)/g,
      'sessionStorage.setItem("root","/staff-pengajar/home")'
    );

  if (serialized !== before) fixes.push("string replace session root");

  const newTree = JSON.parse(serialized);

  await prisma.page.update({
    where: { id: PAGE_ID },
    data: {
      content_tree: newTree,
      updated_at: new Date(),
    },
  });

  console.log("Updated page", PAGE_ID);
  console.log("Fixes:", fixes.length ? fixes : ["(structure walk only)"]);
  console.log("Please hard-refresh / clear site page cache (idb).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
