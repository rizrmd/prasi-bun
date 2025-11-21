FROM oven/bun:latest AS base
WORKDIR /app/prasi/repo

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update
RUN apt-get install wget build-essential gcc git curl gnupg zip unzip -yq
RUN git config --global --add safe.directory /app/prasi/repo
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -

RUN apt-get update
RUN apt-get install nodejs -yq

RUN npm i -g node-gyp-build-optional-packages node-gyp pnpm
RUN PATH="/usr/lib/node_modules/npm/bin:$PATH"

COPY dockerzip .
RUN unzip -o dockerzip

# Copy package.json and bun.lockb first for better caching
COPY package.json bun.lockb ./
COPY app/srv/package.json ./app/srv/
COPY app/web/package.json ./app/web/
COPY app/db/package.json ./app/db/
COPY pkgs/core/package.json ./pkgs/core/
COPY pkgs/web-utils/package.json ./pkgs/web-utils/
COPY pkgs/dbgen/package.json ./pkgs/dbgen/

# Install dependencies
RUN bun install
# RUN bun pm trust --all || # Disabled due to build failures

# Copy the rest of the source code
COPY . .

EXPOSE 4550/tcp

CMD [ "bun", "run", "./pkgs/core/index.ts", "prod" ]
