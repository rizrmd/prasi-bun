const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
const ID = "b99f7582-7023-4ccf-ae2f-7e3a515b32fa";

(async () => {
  const page = await p.page.findFirst({ where: { id: ID } });
  const s = JSON.stringify(page.content_tree);
  let s2 = s
    .replace(/item\.m_action_type\.name ===/g, "item.m_action_type?.name ===")
    .replace(/item\.m_action_type\.name===/g, "item.m_action_type?.name===");
  // also ensure load has fallback without semester for staff (already has simple query)
  if (s !== s2) {
    await p.page.update({
      where: { id: ID },
      data: { content_tree: JSON.parse(s2), updated_at: new Date() },
    });
    console.log("staff kelola optional chain fixed");
  } else {
    console.log("staff kelola no optional-chain change needed");
  }

  // verify ppds page load
  const ppds = await p.page.findFirst({
    where: { id: "f7bb697d-46e7-4b2f-910c-b37a9692a59d" },
  });
  const ps = JSON.stringify(ppds.content_tree);
  console.log(
    "ppds has robust load:",
    ps.includes("load actions failed") || ps.includes("idSmt") || ps.includes("user?.id_smt")
  );
  console.log("ppds has optional type:", ps.includes("m_action_type?.name"));
  await p.$disconnect();
})().catch(async (e) => {
  console.error(e);
  await p.$disconnect();
  process.exit(1);
});
