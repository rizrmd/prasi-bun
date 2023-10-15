import { g } from "utils/global";

const parseQueryParams = (ctx: any) => {
  const pageHref = ctx.req.url;
  const searchParams = new URLSearchParams(
    pageHref.substring(pageHref.indexOf("?"))
  );
  const result: any = {};
  searchParams.forEach((v, k) => {
    result[k] = v;
  });

  return result as any;
};
export const apiContext = (ctx: any) => {
  ctx.req.params = ctx.params;
  ctx.req.query_parameters = parseQueryParams(ctx);
  return {
    mode: g.mode,
    req: ctx.req as Request & { params: any; query_parameters: any },
    res: {
      ...ctx.res,
      send: (body) => {
        ctx.res = createResponse(ctx.res, body);
      },
      sendStatus: (code: number) => {
        ctx.res._status = code;
      },
      setHeader: (key: string, value: string) => {
        ctx.res.headers.append(key, value);
      },
    } as Response & {
      send: (body?: string | object) => void;
      setHeader: (key: string, value: string) => void;
      sendStatus: (code: number) => void;
    },
  };
};

const replacer = (key: string, value: string) => {
  if (typeof value === "bigint") {
    return `BigInt::${value}`;
  }
  if (typeof value === "string" && value.startsWith("BigInt::")) {
    return BigInt(value.substring(8));
  }
  return value;
};

export const createResponse = (existingRes: any, body: any) => {
  const status =
    typeof existingRes._status === "number" ? existingRes._status : undefined;

  let finalBody = body;
  if (body instanceof Buffer) {
  } else {
    finalBody =
      typeof body === "string" ? body : JSON.stringify(body, replacer);
  }

  let res = new Response(
    finalBody,
    status
      ? {
          status,
        }
      : undefined
  );

  if (typeof body === "object") {
    if (!res.headers.get("content-type")) {
      res.headers.set("content-type", "application/json");
    }
  }

  const cur = existingRes as Response;
  for (const [key, value] of cur.headers.entries()) {
    res.headers.set(key, value);
  }

  return res;
};
