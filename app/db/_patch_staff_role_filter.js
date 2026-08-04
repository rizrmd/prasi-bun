/**
 * Patch manage-staff page content_tree:
 * clone NIP FilterField → Role filter (id_role / m_role)
 */
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
const PAGE_ID = "bde0a1a8-9a06-4fe2-aa79-efbadedeef71";

function walk(node, fn, parent = null, key = null) {
  if (!node || typeof node !== "object") return;
  fn(node, parent, key);
  if (Array.isArray(node)) {
    node.forEach((n, i) => walk(n, fn, node, i));
    return;
  }
  for (const [k, v] of Object.entries(node)) {
    if (v && typeof v === "object") walk(v, fn, node, k);
  }
}

function getPropValue(props, propName) {
  if (!props) return null;
  // props as object map
  if (props[propName]?.value != null) return props[propName].value;
  if (props[propName]?.valueBuilt != null) return props[propName].valueBuilt;
  // props as array of prop defs
  if (Array.isArray(props)) {
    for (const p of props) {
      if (p?.name === propName || p?.meta?.label === propName) return p.value;
    }
  }
  // nested common keys
  for (const [k, v] of Object.entries(props)) {
    if (v && typeof v === "object" && v.name === propName) return v.value;
    if (k === propName && typeof v === "string") return v;
  }
  return null;
}

function setPropValue(props, propName, newValue) {
  if (!props) return false;
  if (props[propName] && typeof props[propName] === "object") {
    props[propName].value = newValue;
    if ("valueBuilt" in props[propName]) props[propName].valueBuilt = newValue;
    return true;
  }
  if (Array.isArray(props)) {
    for (const p of props) {
      if (p?.name === propName) {
        p.value = newValue;
        if ("valueBuilt" in p) p.valueBuilt = newValue;
        return true;
      }
    }
  }
  return false;
}

function deepClone(o) {
  return JSON.parse(JSON.stringify(o));
}

function uuid() {
  // simple uuid v4
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function rekeyIds(node, idMap = {}) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((n) => rekeyIds(n, idMap));
    return;
  }
  if (typeof node.id === "string" && node.id.length > 20) {
    if (!idMap[node.id]) idMap[node.id] = uuid();
    node.id = idMap[node.id];
  }
  for (const v of Object.values(node)) {
    if (v && typeof v === "object") rekeyIds(v, idMap);
  }
}

(async () => {
  const rows = await p.$queryRawUnsafe(
    `SELECT content_tree FROM page WHERE id = '${PAGE_ID}'::uuid`
  );
  const tree =
    typeof rows[0].content_tree === "string"
      ? JSON.parse(rows[0].content_tree)
      : rows[0].content_tree;

  // Find nodes that look like FilterField with label NIP
  const nipNodes = [];
  walk(tree, (node, parent, key) => {
    if (!node || typeof node !== "object" || Array.isArray(node)) return;
    const props = node.props || node.prop;
    if (!props) return;
    const blob = JSON.stringify(props);
    if (!blob.includes("`NIP`") && !blob.includes('"NIP"') && !blob.includes("NIP"))
      return;
    // must look like filter field (has name + label + type)
    if (
      blob.includes("name") &&
      blob.includes("label") &&
      (blob.includes("FilterField") ||
        blob.includes("text") ||
        blob.includes("code") ||
        blob.includes("prop_1"))
    ) {
      nipNodes.push({ node, parent, key, blob: blob.slice(0, 200) });
    }
  });

  console.log("NIP-like nodes:", nipNodes.length);
  for (const n of nipNodes) {
    console.log("---");
    console.log("id", n.node.id);
    console.log("keys", Object.keys(n.node));
    console.log("blob", n.blob);
    // print name/label/type values
    const props = n.node.props || {};
    for (const k of Object.keys(props)) {
      const v = props[k];
      if (v && typeof v === "object" && v.value != null) {
        const val = String(v.value);
        if (
          /NIP|code|label|name|type|text|Staff/i.test(k + val) &&
          val.length < 120
        ) {
          console.log(`  props.${k} = ${val}`);
        }
      }
    }
  }

  // Find parent childs array that contains both Staff Pengajar and NIP filter fields
  let filterChilds = null;
  let nipIndex = -1;
  let nipNode = null;

  walk(tree, (node) => {
    if (!node || typeof node !== "object") return;
    const childs = node.childs || node.children;
    if (!Array.isArray(childs) || childs.length < 2) return;
    const labels = childs.map((c) => {
      const blob = JSON.stringify(c?.props || c || {}).slice(0, 5000);
      if (blob.includes("`Staff Pengajar`") || blob.includes("Staff Pengajar"))
        return "staff";
      if (blob.includes("`NIP`") || /"NIP"/.test(blob)) return "nip";
      if (blob.includes("Reset") || blob.includes("Filter")) return "btn";
      return "";
    });
    if (labels.includes("staff") && labels.includes("nip")) {
      filterChilds = childs;
      nipIndex = labels.indexOf("nip");
      nipNode = childs[nipIndex];
      console.log("Found filter childs array", {
        len: childs.length,
        labels,
        nipIndex,
      });
    }
  });

  if (!filterChilds || !nipNode) {
    console.error("Could not find filter childs with Staff+NIP");
    // dump structure of filter area
    walk(tree, (node) => {
      const blob = JSON.stringify(node).slice(0, 300);
      if (blob.includes("Staff Pengajar") && blob.includes("childs")) {
        console.log("partial", blob);
      }
    });
    await p.$disconnect();
    process.exit(1);
  }

  // Check if Role already exists
  const already = filterChilds.some((c) => {
    const b = JSON.stringify(c?.props || {});
    return (
      b.includes("`Role`") ||
      b.includes('value":"`Role`') ||
      b.includes("staff_list_role") ||
      (b.includes("id_role") && b.includes("label"))
    );
  });
  if (already) {
    console.log("Role filter already present in tree — skip clone");
    await p.$disconnect();
    return;
  }

  // Clone NIP node as Role
  const roleNode = deepClone(nipNode);
  rekeyIds(roleNode);

  // Mutate props: label Role, name id_role or m_role, type options/relation
  const mutateProps = (props) => {
    if (!props || typeof props !== "object") return;
    for (const [k, v] of Object.entries(props)) {
      if (!v || typeof v !== "object") continue;
      if (v.value == null) continue;
      const val = String(v.value);
      // label NIP → Role
      if (val === "`NIP`" || val === '"NIP"' || val === "NIP") {
        v.value = "`Role`";
        if ("valueBuilt" in v) v.valueBuilt = "`Role`";
      }
      // placeholder NIP → Role
      if (val.includes("`NIP`") && k.includes("placeholder")) {
        v.value = val.replace(/`NIP`/g, "`Pilih Role`");
        if ("valueBuilt" in v) v.valueBuilt = v.value;
      }
      // name code → try m_role.name or use raw approach via name id_role
      // NIP filter is likely on `code` field type text
      // For role we want dropdown of roles — type options
      if (
        (val === "`code`" || val === '"code"' || val === "code") &&
        (k === "name" || v.is_name)
      ) {
        // use special name that we'll handle in where hook
        v.value = "`__staff_role_filter`";
        if ("valueBuilt" in v) v.valueBuilt = "`__staff_role_filter`";
      }
    }
  };

  if (roleNode.props) mutateProps(roleNode.props);
  // also walk all nested props in roleNode
  walk(roleNode, (n) => {
    if (n && n.props) mutateProps(n.props);
  });

  // Insert after NIP
  filterChilds.splice(nipIndex + 1, 0, roleNode);
  console.log("Inserted Role after NIP. New childs count:", filterChilds.length);

  // Save backup + update
  await p.$queryRawUnsafe(`
    UPDATE page SET content_tree = content_tree
    WHERE id = '${PAGE_ID}'::uuid
  `); // no-op warm

  const newTree = JSON.stringify(tree);
  // use parameterized via prisma
  await p.$executeRawUnsafe(
    `UPDATE page SET content_tree = $1::jsonb, updated_at = NOW() WHERE id = $2::uuid`,
    newTree,
    PAGE_ID
  );

  console.log("Page content_tree updated OK");
  await p.$disconnect();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
