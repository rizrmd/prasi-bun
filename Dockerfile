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
COPY pkgs/*/package.json ./pkgs/*/

# Install dependencies with explicit workspace handling
RUN bun install --frozen-lockfile
RUN bun pm trust --all || true

# Copy the rest of the source code
COPY . .

EXPOSE 4550/tcp

CMD [ "bun", "run", "./pkgs/core/index.ts", "prod" ]
