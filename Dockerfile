# use the official ubuntu image
FROM oven/bun:1.0.18-debian as base
WORKDIR /usr/src/app
COPY coba.ts coba.ts

USER bun
EXPOSE 4550/tcp
CMD [ "bun", "run", "coba.ts" ]
