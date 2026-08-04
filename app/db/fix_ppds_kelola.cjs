/**
 * Hard-fix /ppds/home/kelola with React useState (no Local name scoping issues).
 */
const { PrismaClient } = require("@prisma/client");

const PAGE_ID = "f7bb697d-46e7-4b2f-910c-b37a9692a59d";
const SITE_ID = "2512068e-fd68-44f5-9700-5153ccecf6a5";
const prisma = new PrismaClient();

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

// jsBuilt only — production uses this
const BODY_BUILT = `
(() => {
  const { useState, useEffect, createElement: h, Fragment } = React;

  function KelolaShortcut() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actions, setActions] = useState([]);
    const [idHide, setIdHide] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
      let alive = true;
      (async () => {
        const getUser = async () => {
          for (let i = 0; i < 60; i++) {
            const u =
              (typeof user !== "undefined" && user) ||
              (typeof session !== "undefined" && session && session.user) ||
              null;
            if (u && u.id) return u;
            await new Promise((r) => setTimeout(r, 50));
          }
          try {
            return JSON.parse(localStorage.getItem("user") || "null");
          } catch (e) {
            return null;
          }
        };

        try {
          sessionStorage.setItem("previousPage", window.location.href);
          sessionStorage.setItem("root", "/ppds/home");
        } catch (e) {}

        const u = await getUser();
        const uid = Number(u && u.id);
        const cid = Number(u && u.id_client);
        const idSem = Number(u && u.id_semester);
        console.warn("[ppds/kelola] boot", { uid, cid, idSem });

        // hidden shortcuts
        try {
          if (uid) {
            const hide = await db.m_user_action.findMany({
              where: Object.assign(
                { id_user: uid },
                cid ? { id_client: cid } : {}
              ),
              select: { id_action_hidden: true },
            });
            const arr = Array.isArray(hide) ? hide : [];
            if (alive) {
              setIdHide(
                arr
                  .map((x) => Number(x.id_action_hidden))
                  .filter((x) => x > 0)
              );
            }
          }
        } catch (e) {
          console.warn("[ppds/kelola] hide load failed", e);
        }

        let list = [];
        try {
          if (cid && !Number.isNaN(cid)) {
            if (idSem && !Number.isNaN(idSem)) {
              try {
                list = await db.m_action.findMany({
                  select: { id: true, name: true, m_action_type: true },
                  orderBy: { name: "asc" },
                  where: {
                    id_client: cid,
                    show_on_menu: true,
                    m_action_semester: { some: { id_semester: idSem } },
                  },
                });
              } catch (e) {
                console.warn("[ppds/kelola] sem filter fail", e);
              }
            }
            if (!list || !list.length) {
              list = await db.m_action.findMany({
                select: { id: true, name: true, m_action_type: true },
                orderBy: { name: "asc" },
                where: { id_client: cid, show_on_menu: true },
              });
            }
            if (!list || !list.length) {
              list = await db.m_action.findMany({
                select: { id: true, name: true, m_action_type: true },
                orderBy: { name: "asc" },
                where: { id_client: cid },
                take: 80,
              });
            }
          } else {
            if (alive) setError("User/client tidak ditemukan. Login ulang.");
          }
        } catch (e) {
          console.warn("[ppds/kelola] actions fail", e);
          if (alive) setError(String((e && e.message) || e || "Gagal memuat menu"));
          list = [];
        }

        if (!Array.isArray(list)) list = [];
        console.warn("[ppds/kelola] actions count", list.length);
        if (alive) {
          setActions(list);
          setLoading(false);
        }
      })();
      return () => {
        alive = false;
      };
    }, []);

    const toggle = (id) => {
      const n = Number(id);
      setIdHide((prev) => {
        const cur = Array.isArray(prev) ? prev.slice() : [];
        if (cur.indexOf(n) >= 0) return cur.filter((x) => x !== n);
        cur.push(n);
        return cur;
      });
    };

    const save = async () => {
      const u =
        (typeof user !== "undefined" && user) ||
        (typeof session !== "undefined" && session && session.user) ||
        null;
      const uid = Number(u && u.id);
      const cid = Number(u && u.id_client);
      if (!uid) {
        alert("User belum login");
        return;
      }
      setSaving(true);
      try {
        await db.m_user_action.deleteMany({
          where: Object.assign(
            { id_user: uid },
            cid ? { id_client: cid } : {}
          ),
        });
        for (let i = 0; i < idHide.length; i++) {
          await db.m_user_action.create({
            data: {
              id_action_hidden: Number(idHide[i]),
              id_user: uid,
              id_client: cid || 0,
            },
          });
        }
        alert("Shortcut anda telah tersimpan");
        if (typeof navigate === "function") navigate("/ppds/home");
      } catch (e) {
        console.error(e);
        alert("Gagal menyimpan: " + ((e && e.message) || e));
      } finally {
        setSaving(false);
      }
    };

    return h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          flex: 1,
          width: "100%",
          minHeight: "60vh",
          overflow: "auto",
          background: "#F8FAFC",
          boxSizing: "border-box",
        },
      },
      h(
        "div",
        { style: { padding: 12, flex: 1, overflow: "auto" } },
        loading &&
          h(
            "div",
            { style: { padding: 32, textAlign: "center", color: "#6B7280" } },
            "Memuat menu..."
          ),
        !loading &&
          error &&
          h(
            "div",
            {
              style: {
                margin: 12,
                padding: 12,
                background: "#FEE2E2",
                color: "#B91C1C",
                borderRadius: 8,
                fontSize: 13,
              },
            },
            error
          ),
        !loading &&
          !error &&
          actions.length === 0 &&
          h(
            "div",
            { style: { padding: 32, textAlign: "center", color: "#6B7280" } },
            "Tidak ada menu shortcut.",
            h(
              "div",
              { style: { fontSize: 12, marginTop: 8 } },
              "Pastikan login PPDS dan master m_action tersedia."
            )
          ),
        !loading &&
          actions.map((item) => {
            const hidden = idHide.indexOf(Number(item.id)) >= 0;
            const typeName =
              (item.m_action_type && item.m_action_type.name) || "";
            return h(
              "div",
              {
                key: item.id,
                onClick: () => toggle(item.id),
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  marginBottom: 8,
                  background: "#fff",
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  cursor: "pointer",
                },
              },
              h(
                "div",
                {
                  style: {
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    border: hidden ? "1px solid #D1D5DB" : "none",
                    background: hidden ? "#fff" : "#002B5B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                    flexShrink: 0,
                  },
                },
                hidden ? "" : "✓"
              ),
              h(
                "div",
                { style: { flex: 1, minWidth: 0 } },
                h(
                  "div",
                  { style: { fontWeight: 600, color: "#002B5B", fontSize: 14 } },
                  item.name || "Action"
                ),
                typeName
                  ? h(
                      "div",
                      { style: { fontSize: 11, color: "#9CA3AF" } },
                      typeName
                    )
                  : null
              )
            );
          })
      ),
      !loading &&
        h(
          "div",
          {
            style: {
              padding: 12,
              borderTop: "1px solid #E5E7EB",
              background: "#fff",
            },
          },
          h(
            "button",
            {
              type: "button",
              disabled: saving,
              onClick: save,
              style: {
                width: "100%",
                padding: "12px 16px",
                borderRadius: 10,
                border: "none",
                background: saving ? "#94A3B8" : "#002B5B",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                cursor: saving ? "wait" : "pointer",
              },
            },
            saving ? "Menyimpan..." : "Simpan Shortcut"
          )
        )
    );
  }

  render(h(KelolaShortcut, null));
})();
`;

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
  const root = tree.root ? tree.root : tree;

  let body = null;
  walk(root, (n) => {
    if (n.name === "body") body = n;
  });
  if (!body) {
    console.error("body not found");
    process.exit(1);
  }

  body.adv = body.adv || {};
  // keep js roughly in sync for editor; runtime uses jsBuilt
  body.adv.js = `<div {...props}><div>Kelola Shortcut (loading…)</div></div>`;
  body.adv.jsBuilt = BODY_BUILT;
  body.childs = [];
  body.dim = { h: "full", w: "full" };
  body.mobile = {
    dim: { h: "full", w: "full" },
    layout: { dir: "col", gap: 0, align: "top-left" },
  };
  delete body.component;

  walk(root, (n) => {
    if (n.component?.props?.url) {
      n.component.props.url.value = '"/ppds/home"';
      n.component.props.url.valueBuilt = '"/ppds/home";\n';
    }
    if (n.component?.props?.label) {
      n.component.props.label.value = '"Kelola Shortcut Menu"';
      n.component.props.label.valueBuilt = '"Kelola Shortcut Menu";\n';
    }
  });

  await prisma.page.update({
    where: { id: PAGE_ID },
    data: {
      content_tree: tree.root ? tree : root,
      updated_at: new Date(),
    },
  });

  console.log("OK: PPDS kelola body = React useState self-contained UI");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
