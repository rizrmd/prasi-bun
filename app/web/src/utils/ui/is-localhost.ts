export const isLocalhost = () => {
  return [
    "localhost",
    "127.0.0.1",
    "192.168",
    // "trycloudflare.com",
    "ngrok",
  ].find((e) => location.hostname.includes(e));
};
