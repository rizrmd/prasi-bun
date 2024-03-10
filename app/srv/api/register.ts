import { apiContext } from "service-srv";
import argon from "@node-rs/argon2";

export const _ = {
  url: "/_register",
  async api(p: { username: string; password: string; email: string }) {
    const { req, res } = apiContext(this);

    const user = await _db.user.findFirst({
      where: {
        username: p.username,
      },
      select: { id: true },
    });

    if (!user) {
      const pwd = await argon.hash(p.password);
      const user = await _db.user.create({
        data: {
          username: p.username,
          email: p.email,
          password: pwd,
          phone: "",
        },
      });
      return {
        status: "success",
        user: {
          id: user.id,
        },
      };
    }

    return {
      status: "failed",
      reason: `\
Register failed!
Username already exists, please choose another username.`,
    };
  },
};
