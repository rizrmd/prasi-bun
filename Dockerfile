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
RUN PATH=/usr/lib/node_modules/npm/bin:/Users/riz/.antigravity/antigravity/bin:/Users/riz/bin:/Users/riz/.local/zig-0.15.2:/opt/homebrew/opt/php@8.3/bin:/opt/homebrew/opt/mysql-client/bin:/opt/homebrew/opt/ruby/bin:/opt/homebrew/opt/openjdk@17/bin:/platform-tools:/cmdline-tools/latest/bin:/opt/homebrew/opt/libpq/bin:/Users/riz/bin:/Users/riz/.opencode/bin:/Users/riz/.bun/bin:/Users/riz/.local/share/mise/installs/bun/1.2.23/bin:/Users/riz/.local/share/mise/installs/go/1.25.3/bin:/Users/riz/.local/share/mise/installs/node/24.0.1/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Library/Apple/usr/bin:/Users/riz/.local/bin:/Users/riz/.cargo/bin:/Users/riz/.rokit/bin:/Users/riz/.aftman/bin:/Applications/Ghostty.app/Contents/MacOS:/Users/riz/.orbstack/bin

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
# Skip bun pm trust --all as it's not needed for production builds
RUN echo Package dependencies installed successfully

# Copy the rest of the source code
COPY . .

EXPOSE 4550/tcp

# Use empty entrypoint to bypass problematic docker-entrypoint.sh
ENTRYPOINT []
CMD [/usr/local/bin/bun, run, ./pkgs/core/index.ts, prod]
