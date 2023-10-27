import { NodeModel, Tree } from "@minoru/react-dnd-treeview";
import { useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { Loading } from "../../../../../utils/ui/loading";
import { Modal } from "../../../../../utils/ui/modal";
import { EDGlobal } from "../../../logic/ed-global";
import { EdFormSite } from "./site-form";
import { EdSiteTree, SiteGroupItem } from "./site-tree";
import { EdSiteHead } from "./site-head";

const conf = { group: null as any };

export const EdPopSite = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal(
    {
      status: "init" as "init" | "loading" | "ready",
      group: (conf.group || []) as NodeModel<SiteGroupItem>[],
    },
    () => {}
  );

  const reload = async () => {
    local.status = "loading";
    local.render();

    const res = await p.sync.site.group();

    const group: NodeModel<SiteGroupItem>[] = [];
    for (const item of res) {
      group.push({
        id: `new-${item.id}`,
        parent: item.id,
        text: "new",
        droppable: false,
      });

      group.push({
        id: item.id,
        parent: "site-root",
        text: item.name,
        data: {
          id: item.id,
          type: "group",
          name: item.name,
          site_len: item.site.length,
          users: item.org_user.map((e) => ({
            id: e.user.id,
            username: e.user.username,
          })),
        },
      });

      for (const site of item.site) {
        group.push({
          id: site.id,
          parent: item.id,
          text: site.name,
          droppable: false,
          data: {
            id: site.id,
            type: "site",
            name: site.name,
            domain: site.domain,
            responsive: site.responsive,
          },
        });
      }
    }
    local.group = group;
    conf.group = group;

    local.status = "ready";
    local.render();
  };
  useEffect(() => {
    if (p.ui.popup.site && local.status !== "loading" && !conf.group) {
      reload();
    }
  }, [p.ui.popup.site]);

  if (!p.ui.popup.site) return null;

  return (
    <>
      {local.status === "loading" && <Loading note="listing-site" />}
      <Modal
        open
        onOpenChange={(open) => {
          if (!open) {
            p.ui.popup.site = null;
            p.render();
          }
        }}
      >
        <div className="absolute inset-[5%] bg-white flex">
          <div className="relative flex flex-1">
            {(local.status === "ready" || local.group.length > 0) && (
              <SitePicker
                group={local.group}
                update={(val) => {
                  local.group = val;
                  local.render();
                }}
                reload={reload}
              />
            )}
          </div>
        </div>

        {p.ui.popup.site_form && (
          <>
            {p.ui.popup.site_form.id === "new" && (
              <EdFormSite
                site={{}}
                group_id={p.ui.popup.site_form.group_id}
                onClose={() => {
                  p.ui.popup.site_form = null;
                  p.render();
                }}
                onSave={() => {
                  p.ui.popup.site_form = null;
                  p.render();
                  reload();
                }}
              />
            )}
            {p.ui.popup.site_form.id !== "new" && (
              <EdFormSite
                site={{
                  id: p.ui.popup.site_form.id,
                  name: p.ui.popup.site_form.name,
                  domain: p.ui.popup.site_form.domain,
                  responsive: p.ui.popup.site_form.responsive,
                }}
                group_id={p.ui.popup.site_form.group_id}
                onClose={() => {
                  p.ui.popup.site_form = null;
                  p.render();
                }}
                onSave={() => {
                  p.ui.popup.site_form = null;
                  p.render();
                  reload();
                }}
              />
            )}
          </>
        )}
      </Modal>
    </>
  );
};

const SitePicker = ({
  group,
  reload,
  update,
}: {
  group: NodeModel<SiteGroupItem>[];
  update: (val: NodeModel<SiteGroupItem>[]) => void;
  reload: (id?: string) => Promise<void>;
}) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const orglen = group.filter((e) => e.parent === "site-root").length;
  return (
    <div className="flex flex-1 flex-col">
      <EdSiteHead
        group={group}
        update={update}
        reload={reload}
        orglen={orglen}
        conf={conf}
      />
      <EdSiteTree
        group={group}
        update={update}
        reload={reload}
        orglen={orglen}
      />
    </div>
  );
};
