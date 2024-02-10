export const prodIndex = (site_id: string) => {
  return {
    head: [] as string[],
    body: [] as string[],
    render() {
      return `\
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport"
    content="width=device-width, initial-scale=1.0, user-scalable=1.0, minimum-scale=1.0, maximum-scale=1.0">
  <link rel="stylesheet" href="/index.css">
  ${this.head.join("\n")}
</head>

<body class="flex-col flex-1 w-full min-h-screen flex opacity-0">
  ${this.body.join("\n")}
  <div id="root"></div>
  <script>
    window._prasi = { basepath: "/prod/${site_id}", site_id: "${site_id}" }
  </script>
  <script src="/prod/${site_id}/main.js" type="module"></script>
</body>

</html>`;
    },
  };
};
