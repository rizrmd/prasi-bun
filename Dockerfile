# use the official ubuntu image
FROM ubuntu:latest as base
WORKDIR /usr/src

COPY . .

ARG NODE_VERSION=18

RUN apt-get update
RUN apt-get install -y curl unzip bash

RUN curl -fsSL https://bun.sh/install | bash -s "bun-v1.0.18" 
RUN ln -s $HOME/.bun/bin/bun /usr/local/bin/bun

RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n
RUN n $NODE_VERSION &&
  rm n &&
  npm install -g n
RUN bun install -g pm2

RUN bun --version
RUN bun install
RUN bun run build
RUN cd app/db && bun prisma db pull && bun prisma generate

EXPOSE 3000
CMD [ "pm2-runtime", "bun run prod" ]
