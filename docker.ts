Bun.serve({
  port: 4550,
  fetch(request, server) {
    return new Response("Hello World\n\n" + process.cwd(), {
      status: 200,
    });
  },
});
