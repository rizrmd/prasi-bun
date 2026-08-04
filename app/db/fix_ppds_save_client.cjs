const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
const ID = "f7bb697d-46e7-4b2f-910c-b37a9692a59d";

(async () => {
  const page = await p.page.findFirst({ where: { id: ID } });
  let s = JSON.stringify(page.content_tree);
  const s2 = s
    .replace(/id_client: 1/g, "id_client: Number(user.id_client)")
    .replace(/id_client:1/g, "id_client:Number(user.id_client)")
    .replace(/id_user: user\.id/g, "id_user: Number(user.id)")
    .replace(/id_user:user\.id/g, "id_user:Number(user.id)");
  console.log("changed", s !== s2);
  if (s !== s2) {
    await p.page.update({
      where: { id: ID },
      data: { content_tree: JSON.parse(s2), updated_at: new Date() },
    });
    console.log("save id_client fixed");
  }
  await p.$disconnect();
})().catch(async (e) => {
  console.error(e);
  await p.$disconnect();
  process.exit(1);
});
