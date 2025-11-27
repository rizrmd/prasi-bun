FROM oven/bun:latest AS base
WORKDIR /app/prasi/repo

ENV DEBIAN_FRONTEND=noninteractive
ENV PORT=4550

# Install system dependencies
RUN apt-get update && \
    apt-get install -y wget build-essential gcc git curl gnupg zip unzip && \
    git config --global --add safe.directory /app/prasi/repo && \
    curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get update && \
    apt-get install -y nodejs && \
    npm i -g node-gyp-build-optional-packages node-gyp pnpm && \
    PATH="/usr/lib/node_modules/npm/bin:$PATH" && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create required directories
RUN mkdir -p data lmdb

# Copy dockerzip if it exists, otherwise skip
COPY dockerzip* ./
RUN if [ -f "dockerzip" ]; then \
        unzip -o dockerzip || echo "dockerzip is not a zip file, skipping extraction"; \
    fi

# Copy package.json and bun.lockb first for better caching
COPY package.json bun.lockb ./
COPY app/srv/package.json ./app/srv/
COPY app/web/package.json ./app/web/
COPY app/db/package.json ./app/db/
COPY pkgs/core/package.json ./pkgs/core/
COPY pkgs/web-utils/package.json ./pkgs/web-utils/
COPY pkgs/dbgen/package.json ./pkgs/dbgen/

# Install dependencies
RUN bun install && echo "Package dependencies installed successfully"

# Copy the rest of the source code
COPY . .

# Create necessary runtime directories
RUN mkdir -p data/lmdb && \
    mkdir -p code && \
    chmod +x deploy.sh

EXPOSE 4550/tcp

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:4550/ || exit 1

CMD [ "bun", "run", "./pkgs/core/index.ts", "prod" ]
