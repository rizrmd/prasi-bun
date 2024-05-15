import { validate } from "uuid";
import init from "wasm-gzip";
import { page, useGlobal, useLocal } from "web-utils";
import { EdBase } from "../../nova/ed/ed-base";
import { EDGlobal, PG } from "../../nova/ed/logic/ed-global";
import { edInitSync, loadSession } from "../../nova/ed/logic/ed-sync";
import { EdFormSite } from "../../nova/ed/panel/popup/site/site-form";
import { Loading } from "../../utils/ui/loading";

export default page({
  url: "/ed/:site_id/:page_id",
  component: ({}) => {
    const p = useGlobal(EDGlobal, "EDITOR");
    const local = useLocal({
      new_site: false,
    });

    const w = window as any;
    if (!w.Y) {
      (async () => {
        await init();
        (window as any).Y = await import("yjs");
        (window as any).syncronize = (await import("y-pojo")).syncronize;
        p.render();
      })();
      return <Loading note="init" />;
    }

    w.isEditor = true;

    if (p.status === "no-site") {
      return (
        <div className="flex-1 flex flex-col items-center justify-center">
          {local.new_site ? (
            <EdFormSite
              group_id=""
              site={{}}
              onSave={(data) => {
                if (data) {
                  location.href = `/ed/${data.id}/_`;
                }
              }}
              onClose={() => {}}
              header={
                <div className="border-b border-blue-500 text-xl">
                  Create New Site
                </div>
              }
            />
          ) : (
            <div className="flex flex-col p-10 rounded-lg border shadow-2xl">
              <div className="text-3xl">Welcome to Prasi</div>
              <div className="">
                You are logged in!
                <br />
                <br /> Now ask someone to invite to their site.
                <br /> Or you can{" "}
                <span
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() => {
                    local.new_site = true;
                    local.render();
                  }}
                >
                  create your own site
                </span>
                <br />
                <br />
                Change account?{" "}
                <a
                  href="/logout"
                  className="underline text-blue-500 cursor-pointer"
                >
                  Logout here
                </a>
                .
              </div>
            </div>
          )}
        </div>
      );
    }

    if (validate(params.page_id) && validate(params.site_id)) {
      localStorage.setItem(
        "prasi-last-open",
        JSON.stringify({ page_id: params.page_id, site_id: params.site_id })
      );

      if (!edInitSync(p) && !p.sync) {
        return <Loading note="connecting-ws" />;
      }
    } else {
      if (!validate(params.site_id)) {
        const last_open_str = localStorage.getItem("prasi-last-open");

        try {
          const last_open = JSON.parse(last_open_str || "");
          if (last_open.site_id && last_open.page_id) {
            navigate(`/ed/${last_open.site_id}/${last_open.page_id}`);
          }
        } catch (e) {}
      } else {
        navSitePage(p);
      }
      return <Loading note="finding-page" />;
    }

    return <EdBase />;
  },
});

const navSitePage = async (p: PG) => {
  loadSession(p);
  const e = await _db.page.findFirst({
    where: {
      is_deleted: false,
      is_default_layout: false,
      site: validate(params.site_id)
        ? { id: params.site_id }
        : {
            org: {
              org_user: {
                some: {
                  id_user: p.user.id,
                },
              },
            },
          },
      name: {
        contains: "root",
        mode: "insensitive",
      },
    },
    select: { id: true, id_site: true },
    orderBy: {
      site: {
        name: "asc",
      },
    },
  });

  if (e && e.id && e.id_site) location.href = `/ed/${e.id_site}/${e.id}`;
  else {
    const e = await _db.page.findFirst({
      where: {
        is_deleted: false,
        is_default_layout: false,
        site: validate(params.site_id)
          ? { id: params.site_id }
          : {
              org: {
                org_user: {
                  some: {
                    id_user: p.user.id,
                  },
                },
              },
            },
        name: {
          contains: "home",
          mode: "insensitive",
        },
      },
      select: { id: true, id_site: true },
    });

    if (e && e.id && e.id_site) location.href = `/ed/${e.id_site}/${e.id}`;
    else {
      const e = await _db.page.findFirst({
        where: {
          is_deleted: false,
          is_default_layout: false,
          site: validate(params.site_id)
            ? { id: params.site_id }
            : {
                org: {
                  org_user: {
                    some: {
                      id_user: p.user.id,
                    },
                  },
                },
              },
        },
        select: { id: true, id_site: true },
      });
      if (e) {
        if (e.id && e.id_site) location.href = `/ed/${e.id_site}/${e.id}`;
        else {
          p.status = "no-site";
          p.render();
        }
      } else {
        if (validate(params.site_id)) {
          const page = await _db.page.create({
            data: {
              content_tree: {
                childs: [],
                id: "root",
                type: "root",
              },
              name: "home",
              url: "/",
              id_site: params.site_id,
            },
          });
          location.href = `/ed/${params.site_id}/${page.id}`;
          return;
        } else {
          p.status = "no-site";
          p.render();
        }
      }
    }
  }
};
