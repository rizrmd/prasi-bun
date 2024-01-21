# use the official ubuntu image
FROM oven/bun:1.0.18-debian as base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/prod
COPY . /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY . .

USER bun
EXPOSE 4550/tcp
CMD [ "bun", "run", "coba.ts" ]
