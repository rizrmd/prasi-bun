# use the official ubuntu image
FROM ubuntu:latest as base
WORKDIR /usr/src

COPY . .

ARG NODE_VERSION=18

RUN apt-get update
RUN apt-get install -y curl unzip zip bash gnupg

RUN curl -sL https://deb.nodesource.com/setup_20.x  | bash -
RUN apt-get -y install nodejs
RUN npm install -g pm2
RUN npm install -g node-gyp
RUN npm install -g node-gyp-build-optional-packages


RUN curl -fsSL https://bun.sh/install | bash -s "bun-v1.0.18"
RUN ln -s $HOME/.bun/bin/bun /usr/local/bin/bun

RUN bun --version
RUN bun install
RUN bun run build
RUN cd app/db && bun prisma db pull && bun prisma generate

EXPOSE 3000
CMD [ "pm2-runtime", "bun run prod" ]
