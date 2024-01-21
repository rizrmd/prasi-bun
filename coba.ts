Bun.serve({
  port: 4550,
  fetch(request, server) {
    return new Response("Hello World " + process.env["DATABASE_URL"], {
      status: 200,
    });
  },
});
