import { apiContext } from "service-srv";
import argon from "@node-rs/argon2";
import { session } from "utils/session";

export const _ = {
  url: "/_login",
  async api(username: string, password: string) {
    const { res, req } = apiContext(this);

    const current = session.get(req);

    if (!current) {
      const user = await db.user.findFirst({
        where: { OR: [{ username }, { phone: username }] },
        include: {
          org_user: {
            select: {
              org: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          org: {
            select: { id: true, name: true },
          },
        },
      });
      if (user && user.org_user) {
        user.org = user.org_user.map((e) => e.org);
        delete (user as any).org_user;
      }

      try {
        if (!!user && (await argon.verify(user.password, password))) {
          //@ts-ignore
          delete user.password;
          const sdata = await session.new({ user });

          let setDefaultCookie = true;
          const origin = req.headers.get("origin");
          if (origin) {
            const url = new URL(origin);
            if (url.hostname === "localhost") {
              setDefaultCookie = false;
              res.setHeader("set-cookie", `${session.cookieKey}=${sdata.id};`);
            }
          }

          if (setDefaultCookie) {
            res.setHeader(
              "set-cookie",
              `${session.cookieKey}=${sdata.id}; SameSite=None; Secure; HttpOnly`
            );
          }
          return { status: "ok", session: sdata };
        }
      } catch (e) {
        console.error(e, user, password);
      }
    } else {
      return { status: "ok", session: current };
    }

    return {
      status: "failed",
      reason: "Invalid username / password",
    };
  },
};
