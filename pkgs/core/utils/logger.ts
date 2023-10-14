import { pino } from "pino";
import { g } from "./global";

export const createLogger = async () => {
  g.log = pino({
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        ignore: "pid,hostname", // --ignore
      },
    },
  });
};
