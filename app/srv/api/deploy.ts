import { dir } from "dir";
import { apiContext } from "service-srv";

export const _ = {
  url: "/deploy/**",
  async api() {
    const { req, res } = apiContext(this);

    const pathname = req.params["*"];
    if (pathname === "index.html" || pathname === "_") {
      return new Response(
        `\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
  <link rel="stylesheet" href="https://prasi.app/index.css">
</head>
<body class="flex-col flex-1 w-full min-h-screen flex opacity-0">
  <div id="root"></div>
  <script src="/deploy/main.js" type="module"></script>
</body> 
</html>`,
        { headers: { "content-type": "text/html" } }
      );
    }
  },
};
