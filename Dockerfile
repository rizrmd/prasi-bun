# use the official ubuntu image
FROM oven/bun:1.0.18-debian as base
WORKDIR /usr/src/prasi

COPY . .
RUN bun i -g node-gyp-build-optional-packages
RUN bun install
RUN bun run build

EXPOSE 3000
CMD [ "bun run prod" ]
