FROM oven/bun:1.0.18-debian as base
WORKDIR /app/prasi/repo

RUN apt-get update
RUN apt-get install git curl gnupg zip unzip -yq
RUN git config --global --add safe.directory /app/prasi/repo
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -

RUN apt-get update
RUN apt-get install nodejs -yq

RUN npm i -g @parcel/watcher node-gyp-build-optional-packages node-gyp pnpm
RUN PATH="/usr/lib/node_modules/npm/bin:$PATH"

COPY dockerzip .
RUN unzip -o dockerzip
RUN bun install

COPY . .
RUN bun run build

EXPOSE 4550/tcp

CMD [ "bun", "run", "prod" ]
