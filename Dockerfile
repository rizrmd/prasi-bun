FROM oven/bun:1.1.13 as base
WORKDIR /app/prasi/repo

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update
RUN apt-get install build-essential gcc git curl gnupg zip unzip -yq
RUN git config --global --add safe.directory /app/prasi/repo
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -


RUN apt-get update
RUN apt-get install nodejs -yq

RUN npm i -g node-gyp-build-optional-packages node-gyp pnpm
RUN PATH="/usr/lib/node_modules/npm/bin:$PATH"

COPY dockerzip .
RUN unzip -o dockerzip
RUN bun install

COPY . .
RUN bun run build

EXPOSE 4550/tcp

CMD [ "bun", "run", "prod" ]
