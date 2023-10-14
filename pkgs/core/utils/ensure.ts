import { connect } from "bun";
import { g } from "./global";

export const ensureNotRunning = async () => {
  await new Promise<void>(async (resolve) => {
    const checkPort = () => {
      return new Promise<boolean>(async (done) => {
        try {
          const s = await connect({
            hostname: "0.0.0.0",
            port: g.port,
            socket: {
              open(socket) {},
              data(socket, data) {},
              close(socket) {},
              drain(socket) {},
              error(socket, error) {},
            },
          });
          s.end();
          done(false);
        } catch (e) {
          done(true);
        }
      });
    };

    if (!(await checkPort())) {
      g.log.warn(`Port ${g.port} is used, waiting...`);
      setInterval(async () => {
        if (await checkPort()) resolve();
      }, 500);
    } else {
      resolve();
    }
  });
};
